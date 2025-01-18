import { ComponentPropsWithRef, ElementType, PropsWithChildren } from "react";

export type PolymorphicProps<C extends ElementType, OwnProps> = PropsWithChildren<OwnProps> &
  Omit<ComponentPropsWithRef<C>, keyof OwnProps>;
