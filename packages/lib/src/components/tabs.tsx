import React, {
  ButtonHTMLAttributes,
  createContext,
  forwardRef,
  Fragment,
  HTMLAttributes,
  JSXElementConstructor,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

const TabsContext = createContext<{
  activeValue?: string;
  orientation: "vertical" | "horizontal";
  onSelect: (tabValue: string) => void;
}>(null as never);

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  as?: "div" | JSXElementConstructor<any>;
  value?: string;
  defaultValue?: string;
  orientation?: "vertical" | "horizontal";
  onChange?: (tabValue: string) => void;
}

export const Tabs = ({
  as = "div",
  value,
  defaultValue,
  children,
  className,
  orientation = "horizontal",
  onChange,
  ...rest
}: TabsProps) => {
  const { resolveClassName } = usePolymorphUi();
  const [ready, setReady] = useState(false);
  const [activeValue, setActiveValue] = useState(value ?? defaultValue);

  const Root = (as ?? Fragment) as any;

  const handleOnChange = (tabValue: string) => {
    setActiveValue(tabValue);
    onChange?.(tabValue);
  };

  useEffect(() => {
    if (ready) {
      setActiveValue(value);
    } else setReady(true);
  }, [value]);

  return (
    <TabsContext.Provider value={{ activeValue, orientation, onSelect: handleOnChange }}>
      {Root !== Fragment ? (
        <Root className={resolveClassName("tabs", "tabs", undefined, className)} {...rest}>
          {children}
        </Root>
      ) : (
        children
      )}
    </TabsContext.Provider>
  );
};

export type TabItemsProps = HTMLAttributes<HTMLDivElement>;

export const TabItems = forwardRef<HTMLDivElement, TabItemsProps>(function TabItems(
  { className, children, ...rest }: TabItemsProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const tabsContext = useContext(TabsContext);
  if (!tabsContext) throw "<TabItems /> must be a child of <Tabs />";

  return (
    <div
      ref={ref}
      className={resolveClassName(
        "tabItems",
        "tabItems",
        "bg-gray-100 data-[orientation=vertical]:flex data-[orientation=vertical]:flex-col",
        className,
      )}
      {...rest}
      data-orientation={tabsContext.orientation}>
      {children}
    </div>
  );
});

export interface TabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(function TabItem(
  { className, children, value, onClick, ...rest }: TabItemProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const tabsContext = useContext(TabsContext);
  if (!tabsContext) throw "<TabItem /> must be a descendant of <Tabs />";

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    tabsContext.onSelect(value);
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      className={resolveClassName(
        "tabItem",
        "tabItem",
        "px-4 py-2 border-b-2 hover:border-primary-400 transition-colors focus:outline-0 focus:border-primary-400 " +
          "data-[active=true]:font-medium data-[active=true]:text-white data-[active=true]:bg-primary-500 data-[active=true]:border-primary-400 " +
          "data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r-2",
        className,
      )}
      onClick={handleOnClick}
      {...rest}
      data-active={tabsContext.activeValue === value}
      data-orientation={tabsContext.orientation}>
      {children}
    </button>
  );
});

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { className, children, value, ...rest }: TabPanelProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const tabsContext = useContext(TabsContext);
  if (!tabsContext) throw "<TabPanel /> must be a descendant of <Tabs />";

  if (tabsContext.activeValue === value) {
    return (
      <div
        ref={ref}
        className={resolveClassName("tabPanel", "tabPanel", undefined, className)}
        {...rest}
        data-active={tabsContext.activeValue === value}>
        {children}
      </div>
    );
  } else return null;
});
