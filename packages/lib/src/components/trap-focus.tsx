import React, { forwardRef, HTMLAttributes, useEffect, useRef } from "react";
import { combineRefs } from "@/utils";

type TrapFocusProps = HTMLAttributes<HTMLDivElement>;

export const TrapFocus = forwardRef<HTMLDivElement, TrapFocusProps>(function TrapFocus(
  { children, ...rest }: TrapFocusProps,
  ref,
) {
  const focusIndex = useRef(0);
  const trapFocusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusableElements = trapFocusRef.current?.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
    );

    const onKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if (focusableElements) {
        const direction =
          e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)
            ? 1
            : e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)
              ? -1
              : 0;

        let nextIndex = focusIndex.current + direction;
        if (nextIndex === focusableElements.length) nextIndex = 0;
        else if (nextIndex === -1) nextIndex = focusableElements.length - 1;

        (focusableElements.item(nextIndex) as HTMLElement).focus();
        focusIndex.current = nextIndex;
      }

      rest.onKeyDown?.(e as never);
    };

    focusIndex.current = -1;
    trapFocusRef.current?.focus();
    trapFocusRef.current?.addEventListener("keydown", onKeyDown, true);

    return () => {
      trapFocusRef.current?.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return (
    <div ref={combineRefs(ref, trapFocusRef)} {...rest} tabIndex={0}>
      {children}
    </div>
  );
});
