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
  when?: "hover" | "click";
  hoverDelayMs?: number;
  autoClose?: boolean;
}

export const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (
    {
      variant = "default",
      className,
      offset,
      controller,
      placement = "auto-start",
      when = "hover",
      hoverDelayMs = 250,
      autoClose = false,
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
    });

    const [anchorElement, floatingElement] = useMemo(() => {
      const [anchorElement, floatingElement] = children as [ReactElement, ReactElement];

      const augmentedAnchorElement = cloneElement(anchorElement, {
        ref: (el: HTMLElement) => {
          const originalRef = anchorElement.props.ref;
          if (originalRef?.current) originalRef.current = el;
          else if (originalRef?.call) originalRef(el);
          setAnchor(el);
        },
        onClick: (e: never) => {
          anchorElement.props?.onClick?.(e);
          handleAnchorClick();
        },
        onMouseEnter: (e: never) => {
          anchorElement.props?.onMouseEnter?.(e);
          handleAnchorMouseEnter();
        },
        onMouseLeave: (e: never) => {
          anchorElement.props?.onMouseLeave?.(e);
          handleAnchorMouseLeave();
        },
      });

      return [augmentedAnchorElement, floatingElement];
    }, [children]);

    const handleAnchorClick = () => {
      if (when !== "click") return;
      setShowFloating((showFloating) => !showFloating);
    };

    const handleAnchorMouseEnter = () => {
      if (when !== "hover") return;
      hoverTimer.current = setTimeout(() => setShowFloating(true), hoverDelayMs);
    };

    const handleAnchorMouseLeave = () => {
      if (when !== "hover") return;
      clearTimeout(hoverTimer.current);
      setShowFloating(false);
    };

    useEffect(() => {
      if (controller) {
        controller.__internalClose = () => {
          setShowFloating(false);
        };
      }
    }, [controller]);

    useEffect(() => {
      const onWindowClick = (e: MouseEvent) => {
        if (
          autoClose &&
          when === "click" &&
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
    }, [anchor, floating, when, autoClose]);

    const _className = resolveClassName(
      "popup",
      variant,
      "popup",
      "bg-blue-100 rounded text-sm text-gray-600 px-2",
      className,
    );

    return (
      <>
        {anchorElement}

        {showFloating &&
          createPortal(
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
            </div>,
            document.body,
          )}
      </>
    );
  },
);

export class PopupController {
  __internalClose?: () => void;

  close = () => {
    this.__internalClose?.();
  };
}
