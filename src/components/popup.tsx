import React, { cloneElement, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { combineRefs } from "@/components/utils";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";

type OpenEventType = "triggerEnter" | "triggerClick";

type CloseEventType = "triggerLeave" | "triggerClick" | "outsideClick";

export interface PopupProps {
  controller?: PopupController | PopupController[];
  openEvent: OpenEventType | OpenEventType[] | null;
  closeEvent: CloseEventType | CloseEventType[] | null;
  children: [ReactNode, ReactNode];
  offset?: [number, number];
  placement?: Placement;
  openDelayMs?: number;
  closeDelayMs?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Popup = ({
  controller,
  openEvent,
  closeEvent,
  children,
  offset,
  placement = "auto-start",
  openDelayMs = 250,
  closeDelayMs = 250,
  onOpen,
  onClose,
}: PopupProps) => {
  const openTimer = useRef<NodeJS.Timeout>();
  const closeTimer = useRef<NodeJS.Timeout>();
  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
  const [floatingRef, setFloatingRef] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const { styles: floatingStyles, attributes: floatingAttributes } = usePopper(triggerRef, floatingRef, {
    modifiers: [{ name: "offset", options: { offset } }],
    placement: placement,
    strategy: "fixed",
  });

  const [openEvents, closeEvents] = useMemo(() => {
    const openEvents = Array.isArray(openEvent) ? openEvent : [openEvent];
    const closeEvents = Array.isArray(closeEvent) ? closeEvent : [closeEvent];
    return [openEvents, closeEvents];
  }, [openEvent, closeEvent]);

  const [triggerChild, floatingChild] = useMemo(() => {
    const [triggerChild, floatingChild] = children as [ReactElement, ReactElement];

    const clonedTriggerChild = cloneElement(triggerChild, {
      ref: (el: HTMLElement) => {
        const triggerRef = (triggerChild as any).ref;
        combineRefs(triggerRef)(el);
        setTriggerRef(el);
      },
      onClick: (e: never) => {
        triggerChild.props?.onClick?.(e);

        setOpen((showFloating) => {
          if (!showFloating && openEvents.includes("triggerClick")) return true;
          else if (showFloating && closeEvents.includes("triggerClick")) return false;
          else return showFloating;
        });
      },
      onMouseEnter: (e: never) => {
        triggerChild.props?.onMouseEnter?.(e);

        if (openEvents.includes("triggerEnter")) {
          clearTimeout(openTimer.current);
          clearTimeout(closeTimer.current);
          openTimer.current = setTimeout(() => {
            setOpen(true);
          }, openDelayMs);
        }
      },
      onMouseLeave: (e: never) => {
        triggerChild.props?.onMouseLeave?.(e);

        if (closeEvents.includes("triggerLeave")) {
          clearTimeout(openTimer.current);
          clearTimeout(closeTimer.current);
          closeTimer.current = setTimeout(() => {
            setOpen(false);
          }, closeDelayMs);
        }
      },
    });

    const clonedFloatingChild = cloneElement(floatingChild, {
      ref: (el: HTMLElement) => {
        const floatingRef = (floatingChild as any).ref;
        combineRefs(floatingRef)(el);
        setFloatingRef(el);
      },
      style: {
        ...floatingChild.props.style,
        ...floatingStyles.popper,
      },
      onMouseEnter: (e: never) => {
        floatingChild.props?.onMouseEnter?.(e);

        if (openEvents.includes("triggerEnter")) {
          clearTimeout(openTimer.current);
          clearTimeout(closeTimer.current);
        }
      },
      onMouseLeave: (e: never) => {
        floatingChild.props?.onMouseLeave?.(e);

        if (closeEvents.includes("triggerLeave")) {
          clearTimeout(openTimer.current);
          clearTimeout(closeTimer.current);
          closeTimer.current = setTimeout(() => {
            setOpen(false);
          }, closeDelayMs);
        }
      },
      ...floatingAttributes,
    });

    return [clonedTriggerChild, clonedFloatingChild];
  }, [children, openEvents, closeEvents, floatingStyles, floatingAttributes]);

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

  return (
    <>
      {triggerChild}
      {open && createPortal(floatingChild, document.body)}
    </>
  );
};

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
