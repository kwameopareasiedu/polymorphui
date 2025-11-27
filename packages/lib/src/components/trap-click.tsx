import { Children, cloneElement, forwardRef, ReactElement } from "react";

interface TrapClickProps {
  children: ReactElement;
}

export const TrapClick = forwardRef<HTMLElement, TrapClickProps>(function TrapClick({ children }: TrapClickProps, ref) {
  const [child] = Children.toArray(children) as [ReactElement];

  return cloneElement(child, {
    ...child.props,
    ref: ref,
    onClick: (event) => {
      event.preventDefault();
      event.stopPropagation();
      child?.props?.onClick?.(event);
    },
  });
});
