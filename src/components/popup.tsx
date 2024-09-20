import React, {
  cloneElement,
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { resolveClassName } from "@/components/utils";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";

export interface PopupProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: string | string[] | null;
  controller?: PopupController;
  children: [ReactNode, ReactNode];
  offset?: [number, number];
  placement?: Placement;
  trigger?: "hover" | "click";
  hoverDelayMs?: number;
  dismissible?: boolean;
  usePortal?: boolean;
}

export const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (
    {
      variant = "default",
      className,
      offset,
      controller,
      placement = "auto-start",
      trigger = "hover",
      hoverDelayMs = 250,
      dismissible = false,
      usePortal = true,
      children,
      style,
      ...rest
    }: PopupProps,
    ref,
  ) => {
    const hoverTimer = useRef<NodeJS.Timeout>();
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [floating, setFloating] = useState<HTMLElement | null>(null);
    const [showFloating, setShowFloating] = useState(false);

    const { styles, attributes } = usePopper(anchor, floating, {
      modifiers: [{ name: "offset", options: { offset } }],
      placement: placement,
      strategy: "fixed",
    });

    const [anchorElement, floatingElement] = useMemo(() => {
      const [anchorElement, floatingElement] = children as [ReactElement, ReactElement];

      const clonedAnchorElement = cloneElement(anchorElement, {
        ref: (el: HTMLElement) => {
          const originalRef = anchorElement.props.ref;
          if (originalRef?.current) originalRef.current = el;
          else if (originalRef?.call) originalRef(el);
          setAnchor(el);
        },
        onClick: (e: never) => {
          anchorElement.props?.onClick?.(e);
          if (trigger === "click") {
            setShowFloating((showFloating) => !showFloating);
          }
        },
        onMouseEnter: (e: never) => {
          anchorElement.props?.onMouseEnter?.(e);
          if (trigger === "hover") {
            hoverTimer.current = setTimeout(() => {
              setShowFloating(true);
            }, hoverDelayMs);
          }
        },
        onMouseLeave: (e: never) => {
          anchorElement.props?.onMouseLeave?.(e);
          if (trigger === "hover") {
            clearTimeout(hoverTimer.current);
            setShowFloating(false);
          }
        },
      });

      return [clonedAnchorElement, floatingElement];
    }, [children, trigger]);

    useEffect(() => {
      const closeCallback = () => setShowFloating(false);
      const openCallback = () => setShowFloating(true);

      controller?.__registerCloseCallback(closeCallback);
      controller?.__registerOpenCallback(openCallback);

      return () => {
        controller?.__unregisterCloseCallback(closeCallback);
        controller?.__unregisterOpenCallback(openCallback);
      };
    }, [controller]);

    useEffect(() => {
      const onWindowClick = (e: MouseEvent) => {
        if (
          dismissible &&
          trigger === "click" &&
          !anchor?.contains(e.target as never) &&
          !floating?.contains(e.target as never)
        ) {
          setShowFloating(false);
        }
      };

      window.addEventListener("click", onWindowClick);

      return () => {
        window.removeEventListener("click", onWindowClick);
      };
    }, [anchor, floating, trigger, dismissible]);

    const _className = resolveClassName(
      "popup",
      variant,
      "popup",
      "bg-blue-100 rounded text-sm text-gray-600 px-2",
      className,
    );

    const wrappedFloatingElement = (
      <div
        ref={(el) => {
          if (typeof ref === "function") ref(el);
          else if (ref && (ref as MutableRefObject<HTMLDivElement>)?.current) ref.current = el;
          setFloating(el);
        }}
        className={_className}
        style={{ ...style, ...styles.popper }}
        {...rest}
        {...attributes.popup}>
        {floatingElement}
      </div>
    );

    return (
      <>
        {anchorElement}
        {showFloating
          ? usePortal
            ? createPortal(wrappedFloatingElement, document.body)
            : wrappedFloatingElement
          : null}
      </>
    );
  },
);

export class PopupController {
  private readonly __closeCallbacks: (() => void)[];
  private readonly __openCallbacks: (() => void)[];

  constructor() {
    this.__closeCallbacks = [];
    this.__openCallbacks = [];
  }

  __registerCloseCallback = (cb: () => void) => {
    if (!this.__closeCallbacks.includes(cb)) this.__closeCallbacks.push(cb);
  };

  __unregisterCloseCallback = (cb: () => void) => {
    if (this.__closeCallbacks.includes(cb)) {
      const idx = this.__closeCallbacks.indexOf(cb);
      this.__closeCallbacks.splice(idx, 1);
    }
  };

  __registerOpenCallback = (cb: () => void) => {
    if (!this.__openCallbacks.includes(cb)) this.__openCallbacks.push(cb);
  };

  __unregisterOpenCallback = (cb: () => void) => {
    if (this.__openCallbacks.includes(cb)) {
      const idx = this.__openCallbacks.indexOf(cb);
      this.__openCallbacks.splice(idx, 1);
    }
  };

  close = () => {
    for (const cb of this.__closeCallbacks) cb();
  };

  open = () => {
    for (const cb of this.__openCallbacks) cb();
  };
}
