import React, {
  ComponentPropsWithRef,
  createContext,
  ElementType,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { PolymorphicProps } from "@/types";

interface BreadcrumbsContextProps {
  separator: ReactNode;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextProps>(null as never);

interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
  separator?: ReactNode;
}

export const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(function Breadcrumbs(
  { separator = "/", className, children, ...rest }: BreadcrumbsProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  return (
    <BreadcrumbsContext.Provider value={{ separator }}>
      <nav
        ref={ref}
        className={resolveClassName("breadcrumbs", "breadcrumbs flex items-center gap-2", className)}
        {...rest}>
        {children}
      </nav>
    </BreadcrumbsContext.Provider>
  );
});

interface BreadcrumbItemProps<C extends ElementType> {
  as?: C;
}

type BreadcrumbItemComponent = <C extends ElementType = "a">(
  props: PolymorphicProps<C, BreadcrumbItemProps<C>> & { ref?: ComponentPropsWithRef<C>["ref"] },
) => ReactElement;

export const BreadcrumbItem = forwardRef(function BreadcrumbItem<C extends ElementType>(
  { as, className, children, ...rest }: PolymorphicProps<C, BreadcrumbItemProps<C>>,
  ref?: ComponentPropsWithRef<C>["ref"],
) {
  const Root = as || "a";
  const { resolveClassName } = usePolymorphUi();
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  if (!breadcrumbsContext) throw "<BreadcrumbItem /> must be a descendant of <Breadcrumbs />";

  return (
    <>
      <Root
        ref={ref}
        className={resolveClassName(
          "breadcrumbItem",
          "breadcrumbItem text-sm [&[href]]:text-primary-500 [&[href]]:hover:underline",
          className,
        )}
        {...rest}>
        {children}
      </Root>

      {breadcrumbsContext.separator && (
        <span className={resolveClassName("breadcrumbSeparator", "breadcrumbSeparator text-xs last:hidden", className)}>
          {breadcrumbsContext.separator}
        </span>
      )}
    </>
  );
}) as unknown as BreadcrumbItemComponent;
