import React, { cloneElement, ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { combineRefs } from "@/components/utils";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";

type OpenEventType = "triggerEnter" | "triggerClick";

type CloseEventType = "triggerLeave" | "triggerClick" | "outsideClick";

export interface PopupProps {
  openEvent: OpenEventType | OpenEventType[] | null;
  closeEvent: CloseEventType | CloseEventType[] | null;
  children: [ReactNode, ReactNode];
  offset?: [number, number];
  placement?: Placement;
  openDelayMs?: number;
  closeDelayMs?: number;
  open?: boolean;
  onChange?: (opened: boolean) => void;
}

export const Popup = ({
  openEvent,
  closeEvent,
  children,
  offset,
  placement = "auto-start",
  openDelayMs = 250,
  closeDelayMs = 250,
  open: externalOpen,
  onChange,
}: PopupProps) => {
  const openTimer = useRef<NodeJS.Timeout>();
  const closeTimer = useRef<NodeJS.Timeout>();
  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
  const [floatingRef, setFloatingRef] = useState<HTMLElement | null>(null);
  const [internalOpen, setInternalOpen] = useState(externalOpen ?? false);

  const { styles: floatingStyles, attributes: floatingAttributes } = usePopper(triggerRef, floatingRef, {
    modifiers: [{ name: "offset", options: { offset } }],
    placement: placement,
    strategy: "fixed",
  });

  const isOpen = useMemo(() => {
    return externalOpen ?? internalOpen;
  }, [internalOpen, externalOpen]);

  const handleSetOpen = useCallback(
    (open: boolean) => {
      if (externalOpen !== undefined) onChange?.(open);
      else setInternalOpen(open);
    },
    [externalOpen],
  );

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

        if (!isOpen && openEvents.includes("triggerClick")) {
          handleSetOpen(true);
        } else if (isOpen && closeEvents.includes("triggerClick")) {
          handleSetOpen(false);
        }
      },
      onMouseEnter: (e: never) => {
        triggerChild.props?.onMouseEnter?.(e);

        if (openEvents.includes("triggerEnter")) {
          clearTimeout(openTimer.current);
          clearTimeout(closeTimer.current);
          openTimer.current = setTimeout(() => {
            handleSetOpen(true);
          }, openDelayMs);
        }
      },
      onMouseLeave: (e: never) => {
        triggerChild.props?.onMouseLeave?.(e);

        if (closeEvents.includes("triggerLeave")) {
          clearTimeout(openTimer.current);
          clearTimeout(closeTimer.current);
          closeTimer.current = setTimeout(() => {
            handleSetOpen(false);
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
            handleSetOpen(false);
          }, closeDelayMs);
        }
      },
      ...floatingAttributes,
    });

    return [clonedTriggerChild, clonedFloatingChild];
  }, [children, openEvents, closeEvents, floatingStyles, floatingAttributes, isOpen]);

  useEffect(() => {
    const onWindowClick = (e: MouseEvent) => {
      if (
        closeEvents.includes("outsideClick") &&
        !triggerRef?.contains(e.target as never) &&
        !floatingRef?.contains(e.target as never)
      ) {
        handleSetOpen(false);
      }
    };

    window.addEventListener("click", onWindowClick);

    return () => {
      window.removeEventListener("click", onWindowClick);
    };
  }, [triggerRef, floatingRef, closeEvents]);

  return (
    <>
      {triggerChild}
      {isOpen && createPortal(floatingChild, document.body)}
    </>
  );
};
