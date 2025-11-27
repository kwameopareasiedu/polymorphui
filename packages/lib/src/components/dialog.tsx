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
import { PolymorphicProps } from "@/types";
import { TrapFocus } from "@/components/trap-focus";

const DialogContext = createContext<{
  onClose: () => void;
}>(null as never);

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?: ReactNode;
  onClose: () => void;
  dismissible?: boolean;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { className, children, onClose, onClick, dismissible, ...rest }: DialogProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const dialogRef = useRef<HTMLDivElement>(null);
  const documentOverflowRef = useRef("");

  const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === dialogRef.current && dismissible) onClose();
    onClick?.(e);
  };

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

  return createPortal(
    <DialogContext.Provider value={{ onClose }}>
      <TrapFocus
        ref={combineRefs(ref, dialogRef)}
        className={resolveClassName(
          "dialog",
          "dialog fixed top-0 left-0 w-screen h-screen z-[99] grid place-items-center p-6",
          "bg-black/75",
          className,
        )}
        onClick={handleOnClick}
        {...rest}>
        {children}
      </TrapFocus>
    </DialogContext.Provider>,
    document.body,
  );
});

interface DialogContentProps<C extends ElementType> extends HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  as?: C;
}

type DialogContentComponent = <C extends ElementType = "div">(
  props: PolymorphicProps<C, DialogContentProps<C>> & { ref?: ComponentPropsWithRef<C>["ref"] },
) => ReactElement;

export const DialogContent = forwardRef(function DialogContent<C extends ElementType>(
  { as, size = "md", className, children, ...rest }: DialogContentProps<C>,
  ref: ComponentPropsWithRef<C>["ref"],
) {
  const Root = as ?? "div";
  const { resolveClassName } = usePolymorphUi();

  return (
    <Root
      ref={ref}
      className={resolveClassName(
        "dialogContent",
        "dialogContent relative w-full max-h-full overflow-auto focus:outline-0",
        "bg-white p-10 rounded-lg data-[size=xs]:max-w-[320px] data-[size=sm]:max-w-[480px] " +
          "data-[size=md]:max-w-[576px] data-[size=lg]:max-w-[768px] data-[size=xl]:max-w-[992px] " +
          "data-[size=xxl]:max-w-[1200px] data-[size=full]:max-w-full",
        className,
      )}
      {...rest}
      data-size={size}>
      {children}
    </Root>
  );
}) as unknown as DialogContentComponent;

export type DialogCloseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(
  { className, onClick, ...rest }: DialogCloseProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const dialogContext = useContext(DialogContext);

  if (!dialogContext) throw "error: <DialogClose /> must be a descendant of a <Dialog />";

  const _className = resolveClassName(
    "dialogClose",
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
