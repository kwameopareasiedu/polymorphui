import React, {
  ButtonHTMLAttributes,
  ComponentPropsWithRef,
  createContext,
  ElementType,
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import { combineRefs } from "@/utils";
import { createPortal } from "react-dom";
import CloseIcon from "../assets/close.svg";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { VariantNameType } from "@/config/variant";
import { PolymorphicProps } from "@/types";

interface DialogContextProps {
  onClose: () => void;
}

const DialogContext = createContext<DialogContextProps>(null as never);

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: VariantNameType | VariantNameType[];
  children?: ReactNode;
  onClose: () => void;
  dismissible?: boolean;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { variant, className, children, onClose, onClick, dismissible, ...rest }: DialogProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const dialogRef = useRef<HTMLDivElement>(null);
  const documentOverflowRef = useRef("");

  const _className = resolveClassName(
    "dialog",
    variant,
    "dialog fixed top-0 left-0 w-screen h-screen z-[99] grid place-items-center p-6",
    "bg-black/75",
    className,
  );

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissible) onClose();
    };

    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [dismissible, onClose]);

  useEffect(() => {
    documentOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = documentOverflowRef.current;
    };
  }, []);

  const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === dialogRef.current && dismissible) onClose();
    onClick?.(e);
  };

  return createPortal(
    <DialogContext.Provider value={{ onClose }}>
      <div ref={combineRefs(ref, dialogRef)} className={_className} onClick={handleOnClick} {...rest}>
        {children}
      </div>
    </DialogContext.Provider>,
    document.body,
  );
});

interface DialogContentProps<C extends ElementType> extends HTMLAttributes<HTMLDivElement> {
  variant?: VariantNameType | VariantNameType[];
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  as?: C;
}

type DialogContentComponent = <C extends ElementType = "div">(
  props: PolymorphicProps<C, DialogContentProps<C>> & { ref?: ComponentPropsWithRef<C>["ref"] },
) => ReactElement;

export const DialogContent = forwardRef(function DialogContent<C extends ElementType>(
  { as, variant, size = "md", className, children, ...rest }: DialogContentProps<C>,
  ref: ComponentPropsWithRef<C>["ref"],
) {
  const Root = as ?? "div";
  const { resolveClassName } = usePolymorphUi();
  const dialogRef = useRef<HTMLDivElement>(null);

  const _className = resolveClassName(
    "dialogContent",
    variant,
    "dialogContent relative w-full max-h-full overflow-auto focus:outline-0",
    "bg-white p-10 rounded-lg data-[size=xs]:max-w-[320px] data-[size=sm]:max-w-[480px] " +
      "data-[size=md]:max-w-[576px] data-[size=lg]:max-w-[768px] data-[size=xl]:max-w-[992px] " +
      "data-[size=xxl]:max-w-[1200px] data-[size=full]:max-w-full",
    className,
  );

  useEffect(() => {
    const handleOnKeyDown = (e: KeyboardEvent) => {
      const dialogElement = dialogRef.current;

      if (dialogElement) {
        if (e.key === "Tab") {
          const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
          const focusableElements = dialogElement.querySelectorAll(focusableSelectors);
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleOnKeyDown);

    dialogRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleOnKeyDown);
    };
  }, []);

  return (
    <Root ref={combineRefs(ref, dialogRef)} className={_className} data-size={size} {...rest} tabIndex={0}>
      {children}
    </Root>
  );
}) as unknown as DialogContentComponent;

export interface DialogCloseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: VariantNameType | VariantNameType[];
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(
  { variant, className, onClick, ...rest }: DialogCloseProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const dialogContext = useContext(DialogContext);

  if (!dialogContext) throw "error: <DialogClose /> must be a descendant of a <Dialog />";

  const _className = resolveClassName(
    "dialogClose",
    variant,
    "dialogClose absolute w-8 h-8 top-4 right-4",
    "inline-grid place-items-center p-2 rounded-full transition-colors hover:bg-gray-100",
    className,
  );

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    dialogContext.onClose();
    onClick?.(e);
  };

  return (
    <button ref={ref} type="button" className={_className} onClick={handleOnClick} {...rest}>
      <CloseIcon />
    </button>
  );
});
