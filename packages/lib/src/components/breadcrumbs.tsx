import React, {
  ComponentPropsWithRef,
  createContext,
  ElementType,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { VariantNameType } from "@/config/variant";

interface BreadcrumbsContextProps {
  separator: ReactNode;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextProps>(null as never);

interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
  variant?: VariantNameType | VariantNameType[];
  separator?: ReactNode;
}

export const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(function Breadcrumbs(
  { variant, separator = "/", className, children, ...rest }: BreadcrumbsProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  const _className = resolveClassName("breadcrumbs", variant, "breadcrumbs flex items-center gap-2", className);

  return (
    <BreadcrumbsContext.Provider value={{ separator }}>
      <div ref={ref} className={_className} {...rest}>
        {children}
      </div>
    </BreadcrumbsContext.Provider>
  );
});

interface BreadcrumbItemProps<C extends ElementType> {
  variant?: VariantNameType | VariantNameType[];
  as?: C;
}

type PolymorphicProps<C extends ElementType, OwnProps> = PropsWithChildren<OwnProps> &
  Omit<ComponentPropsWithRef<C>, keyof OwnProps>;

type BreadcrumbItemComponent = <C extends ElementType = "a">(
  props: PolymorphicProps<C, BreadcrumbItemProps<C>> & { ref?: ComponentPropsWithRef<C>["ref"] },
) => ReactElement;

export const BreadcrumbItem = forwardRef(function BreadcrumbItem<C extends ElementType>(
  { as, variant, className, children, ...rest }: PolymorphicProps<C, BreadcrumbItemProps<C>>,
  ref?: ComponentPropsWithRef<C>["ref"],
) {
  const Root = as || "a";
  const { resolveClassName } = usePolymorphUi();
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  if (!breadcrumbsContext) throw "<BreadcrumbItem /> must be a descendant of <Breadcrumbs />";

  const _className = resolveClassName("breadcrumbItem", variant, "breadcrumbItem text-sm", className);

  const separatorClassName = resolveClassName(
    "breadcrumbSeparator",
    variant,
    "breadcrumbSeparator text-xs last:hidden",
    className,
  );

  return (
    <>
      <Root ref={ref} className={_className} {...rest}>
        {children}
      </Root>

      {breadcrumbsContext.separator && <span className={separatorClassName}>{breadcrumbsContext.separator}</span>}
    </>
  );
}) as unknown as BreadcrumbItemComponent;