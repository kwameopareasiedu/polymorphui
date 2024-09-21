import React, {
  cloneElement,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { combineRefs, resolveClassName } from "@/components/utils";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";

type OpenEventType = "triggerEnter" | "triggerClick";

type CloseEventType = "triggerLeave" | "triggerClick" | "outsideClick";

export interface PopupProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: string | string[] | null;
  controller?: PopupController | PopupController[];
  openEvent: OpenEventType | OpenEventType[] | null;
  closeEvent: CloseEventType | CloseEventType[] | null;
  children: [ReactNode, ReactNode];
  offset?: [number, number];
  placement?: Placement;
  openDelayMs?: number;
  closeDelayMs?: number;
  usePortal?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (
    {
      variant = "default",
      className,
      offset,
      controller,
      placement = "auto-start",
      openEvent,
      closeEvent,
      openDelayMs = 250,
      closeDelayMs = 250,
      usePortal = true,
      children,
      onOpen,
      onClose,
      onMouseEnter,
      onMouseLeave,
      style,
      ...rest
    }: PopupProps,
    ref,
  ) => {
    const openTimer = useRef<NodeJS.Timeout>();
    const closeTimer = useRef<NodeJS.Timeout>();
    const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
    const [floatingRef, setFloatingRef] = useState<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);

    const { styles, attributes } = usePopper(triggerRef, floatingRef, {
      modifiers: [{ name: "offset", options: { offset } }],
      placement: placement,
      strategy: "fixed",
    });

    const [openEvents, closeEvents] = useMemo(() => {
      const openEvents = Array.isArray(openEvent) ? openEvent : [openEvent];
      const closeEvents = Array.isArray(closeEvent) ? closeEvent : [closeEvent];
      return [openEvents, closeEvents];
    }, [openEvent, closeEvent]);

    const [triggerElement, floatingElement] = useMemo(() => {
      const [triggerElement, floatingElement] = children as [ReactElement, ReactElement];

      const clonedTriggerElement = cloneElement(triggerElement, {
        ref: (el: HTMLElement) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const triggerRef = (triggerElement as any).ref;
          combineRefs(triggerRef)(el);
          setTriggerRef(el);
        },
        onClick: (e: never) => {
          triggerElement.props?.onClick?.(e);
          setOpen((showFloating) => {
            if (!showFloating && openEvents.includes("triggerClick")) return true;
            else if (showFloating && closeEvents.includes("triggerClick")) return false;
            else return showFloating;
          });
        },
        onMouseEnter: (e: never) => {
          triggerElement.props?.onMouseEnter?.(e);
          if (openEvents.includes("triggerEnter")) {
            clearTimeout(openTimer.current);
            clearTimeout(closeTimer.current);
            openTimer.current = setTimeout(() => {
              setOpen(true);
            }, openDelayMs);
          }
        },
        onMouseLeave: (e: never) => {
          triggerElement.props?.onMouseLeave?.(e);
          if (closeEvents.includes("triggerLeave")) {
            clearTimeout(openTimer.current);
            clearTimeout(closeTimer.current);
            closeTimer.current = setTimeout(() => {
              setOpen(false);
            }, closeDelayMs);
          }
        },
      });

      return [clonedTriggerElement, floatingElement];
    }, [children, openEvents, closeEvents]);

    useEffect(() => {
      const closeCallback = () => setOpen(false);
      const openCallback = () => setOpen(true);

      if (Array.isArray(controller)) {
        controller?.forEach((c) => c.__registerCloseCallback(closeCallback));
        controller?.forEach((c) => c.__registerOpenCallback(openCallback));
      } else {
        controller?.__registerCloseCallback(closeCallback);
        controller?.__registerOpenCallback(openCallback);
      }

      return () => {
        if (Array.isArray(controller)) {
          controller?.forEach((c) => c.__unregisterCloseCallback(closeCallback));
          controller?.forEach((c) => c.__unregisterOpenCallback(openCallback));
        } else {
          controller?.__unregisterCloseCallback(closeCallback);
          controller?.__unregisterOpenCallback(openCallback);
        }
      };
    }, [controller]);

    useEffect(() => {
      const onWindowClick = (e: MouseEvent) => {
        if (
          closeEvents.includes("outsideClick") &&
          !triggerRef?.contains(e.target as never) &&
          !floatingRef?.contains(e.target as never)
        ) {
          setOpen(false);
        }
      };

      window.addEventListener("click", onWindowClick);

      return () => {
        window.removeEventListener("click", onWindowClick);
      };
    }, [triggerRef, floatingRef, closeEvents]);

    useEffect(() => {
      if (triggerRef) {
        if (open) onOpen?.();
        else onClose?.();
      }
    }, [open]);

    const _className = resolveClassName(
      "popup",
      variant,
      "popup",
      "bg-white border-[0.5px] border-gray-300 rounded-sm text-sm text-gray-600 px-2",
      className,
    );

    const floatingRoot = (
      <div
        ref={(el) => {
          combineRefs(ref)(el);
          setFloatingRef(el);
        }}
        className={_className}
        style={{ ...style, ...styles.popper }}
        {...rest}
        {...attributes.popup}
        onMouseEnter={(e: never) => {
          onMouseEnter?.(e);
          if (openEvents.includes("triggerEnter")) {
            clearTimeout(openTimer.current);
            clearTimeout(closeTimer.current);
          }
        }}
        onMouseLeave={(e: never) => {
          onMouseLeave?.(e);
          if (closeEvents.includes("triggerLeave")) {
            clearTimeout(openTimer.current);
            clearTimeout(closeTimer.current);
            closeTimer.current = setTimeout(() => {
              setOpen(false);
            }, closeDelayMs);
          }
        }}>
        {floatingElement}
      </div>
    );

    return (
      <>
        {triggerElement}
        {open ? (usePortal ? createPortal(floatingRoot, document.body) : floatingRoot) : null}
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
