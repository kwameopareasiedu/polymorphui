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

interface TabsContextProps {
  activeValue?: string;
  orientation: "vertical" | "horizontal";
  onSelect: (tabValue: string) => void;
}

const TabsContext = createContext<TabsContextProps>(null as never);

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  variant?: string | string[];
  as?: "div" | JSXElementConstructor<any>;
  value?: string;
  defaultValue?: string;
  orientation?: "vertical" | "horizontal";
  onChange?: (tabValue: string) => void;
}

export const Tabs = ({
  variant = "default",
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

  const Root = (as ?? Fragment) as any;
  const _className = resolveClassName("tabs", variant, "tabs", undefined, className);

  const [ready, setReady] = useState(false);
  const [activeValue, setActiveValue] = useState(value ?? defaultValue);

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
        <Root className={_className} {...rest}>
          {children}
        </Root>
      ) : (
        children
      )}
    </TabsContext.Provider>
  );
};

export interface TabItemsProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string | string[];
}

export const TabItems = forwardRef<HTMLDivElement, TabItemsProps>(function TabItems(
  { variant = "default", className, children, ...rest }: TabItemsProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const tabsContext = useContext(TabsContext);

  if (!tabsContext) throw "<TabItems /> must be a child of <Tabs />";

  const _className = resolveClassName(
    "tabItems",
    variant,
    "tabItems",
    "bg-gray-100 data-[orientation=vertical]:flex data-[orientation=vertical]:flex-col",
    className,
  );

  return (
    <div ref={ref} className={_className} {...rest} data-orientation={tabsContext.orientation}>
      {children}
    </div>
  );
});

export interface TabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string | string[];
  value: string;
}

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(function TabItem(
  { variant = "default", className, children, value, onClick, ...rest }: TabItemProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const tabsContext = useContext(TabsContext);

  if (!tabsContext) throw "<TabItem /> must be a descendant of <Tabs />";

  const _className = resolveClassName(
    "tabItem",
    variant,
    "tabItem",
    "px-4 py-2 border-b-2 hover:border-blue-400 transition-colors focus:outline-0 focus:border-blue-400 " +
      "data-[active=true]:font-medium data-[active=true]:text-white data-[active=true]:bg-blue-500 data-[active=true]:border-blue-400 " +
      "data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r-2",
    className,
  );

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    tabsContext.onSelect(value);
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      className={_className}
      onClick={handleOnClick}
      {...rest}
      data-active={tabsContext.activeValue === value}
      data-orientation={tabsContext.orientation}>
      {children}
    </button>
  );
});

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string | string[];
  value: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { variant = "default", className, children, value, ...rest }: TabPanelProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const tabsContext = useContext(TabsContext);

  if (!tabsContext) throw "<TabPanel /> must be a descendant of <Tabs />";

  const _className = resolveClassName("tabPanel", variant, "tabPanel", undefined, className);

  if (tabsContext.activeValue === value) {
    return (
      <div ref={ref} className={_className} {...rest} data-active={tabsContext.activeValue === value}>
        {children}
      </div>
    );
  } else return null;
});
