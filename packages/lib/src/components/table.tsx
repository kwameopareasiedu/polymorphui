import React, { createContext, forwardRef, Fragment, ReactNode, useContext, useState } from "react";
import { Text } from "@/components/text";
import { cn } from "@/utils";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

import ArrowDownIcon from "../assets/arrow-down.svg";
import SortIcon from "../assets/sort.svg";
import { useWindowSizeInRange } from "@/hooks/use-window-size-in-range";

export enum SortDirection {
  NONE = "none",
  ASC = "asc",
  DESC = "desc",
}

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface TableColumn {
  id: string;
  label: ReactNode;
  visible?: boolean;
  sortable?: boolean;
}

const TableContext = createContext<{
  columns: TableColumn[];
  responsive: boolean;
}>(null as never);

interface TableProps {
  className?: string;
  headClassName?: string;
  sort?: SortConfig;
  responsive?: boolean;
  columns: TableColumn[];
  children: ReactNode;
  loading?: boolean;
  onSort?: (sort: SortConfig) => void;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, headClassName, sort, columns, loading, responsive = true, children, onSort }: TableProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  const visibleColumns = columns.filter((col) => col.visible);
  const sortingEnabled = !!sort && !!onSort;

  const handleCycleSort = (columnId: string) => {
    if (!sortingEnabled) return;

    if (columnId === sort.key) {
      if (sort.direction === SortDirection.NONE) {
        return onSort({ key: columnId, direction: SortDirection.ASC });
      } else if (sort.direction === SortDirection.ASC) {
        return onSort({ key: columnId, direction: SortDirection.DESC });
      } else if (sort.direction === SortDirection.DESC) {
        return onSort({ key: columnId, direction: SortDirection.NONE });
      }
    } else return onSort({ key: columnId, direction: SortDirection.ASC });
  };

  return (
    <TableContext.Provider value={{ columns: visibleColumns, responsive }}>
      <table ref={ref} className={resolveClassName("table", "table w-full", "", className)}>
        <thead
          className={resolveClassName(
            "tableHead",
            "tableHead sticky top-0 z-20 max-sm:hidden",
            "border-b-2",
            headClassName,
          )}>
          <tr>
            {visibleColumns.map((col) => (
              <th key={col.id} className="bg-slate-50 px-4 py-2 text-left font-normal">
                {col.label ? (
                  <div
                    className="flex items-center gap-2 whitespace-nowrap data-[can-sort=true]:hover:cursor-pointer"
                    data-can-sort={sortingEnabled && col.sortable !== false && !!col.label}
                    onClick={sortingEnabled && col.sortable !== false ? () => handleCycleSort(col.id) : undefined}>
                    <Text className="text-xs font-bold uppercase text-slate-500">{col.label}</Text>

                    {sortingEnabled && col.sortable !== false && <SortIcon {...({ className: "size-4" } as object)} />}

                    {sort && sort.key === col.id && sort.direction !== SortDirection.NONE && (
                      <Text className="pointer-events-none text-xs font-bold text-slate-500">
                        {sort?.direction === SortDirection.ASC ? "A-Z" : "Z-A"}
                      </Text>
                    )}
                  </div>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{loading ? <TableLoader /> : children}</tbody>
      </table>
    </TableContext.Provider>
  );
});

const TableRowGroupContext = createContext(null);

interface TableRowGroupProps {
  className?: string;
  rowClassName?: string;
  children?: ReactNode;
  defaultColumn: ReactNode;
  customColumn?: Record<string, (column: TableColumn) => ReactNode>;
  defaultExpanded?: boolean;
  sticky?: boolean;
}

export const TableRowGroup = forwardRef<HTMLTableRowElement, TableRowGroupProps>(function TableRowGroup(
  {
    className,
    rowClassName,
    defaultColumn,
    children,
    customColumn,
    defaultExpanded = true,
    sticky = true,
    ...rest
  }: TableRowGroupProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const tableContext = useContext(TableContext);
  if (!tableContext) return "<TableRowGroup /> must be a child of <Table />";

  const groupRowContext = useContext(TableRowGroupContext);
  const withinGroupRow = !!groupRowContext;

  const { columns, responsive } = tableContext;
  const customColumnCount = customColumn ? Object.keys(customColumn).length : 0;

  return (
    <TableRowGroupContext.Provider value={{} as never}>
      <tr
        ref={ref}
        className={resolveClassName(
          "tableRow",
          "tableRow z-10 data-[sticky=true]:sticky data-[sticky=true]:top-[47px] data-[responsive=true]:max-sm:hidden",
          "[&:not(:last-child)]:border-b-2",
          rowClassName,
        )}
        data-responsive={responsive}
        data-sticky={sticky}>
        <td className="!p-0" colSpan={columns.length - customColumnCount} onClick={() => setExpanded(!expanded)}>
          <div
            className={cn(
              "flex items-center gap-2 bg-slate-100 px-3 py-1 hover:cursor-pointer data-[pad=true]:px-8",
              className,
            )}
            data-pad={withinGroupRow}
            {...rest}>
            <ArrowDownIcon
              {...{
                className: "transition-transform data-[expanded=true]:rotate-180",
                "data-expanded": { expanded },
              }}
            />

            {defaultColumn}
          </div>
        </td>

        {customColumn &&
          Object.keys(customColumn).map((colId) => {
            const columnData = columns.find((col) => col.id === colId)!;

            return (
              <td
                key={colId}
                className="bg-slate-100 px-4 py-1 hover:cursor-pointer data-[pad=true]:first:px-16 data-[pad=true]:last:px-8"
                onClick={() => setExpanded(!expanded)}
                data-pad={withinGroupRow}>
                {customColumn[colId](columnData)}
              </td>
            );
          })}
      </tr>

      {expanded && children}
    </TableRowGroupContext.Provider>
  );
});

interface TableRowProps {
  className?: string;
  data: Record<string, unknown>;
  customColumn?: Record<string, (column: TableColumn) => ReactNode>;
  defaultColumn: (column: TableColumn, value: unknown) => ReactNode;
  mobileHeader?: ReactNode;
  mobileFooter?: ReactNode;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, data, mobileHeader, mobileFooter, customColumn, defaultColumn, ...rest }: TableRowProps,
  ref,
) {
  const tableContext = useContext(TableContext);
  const groupRowContext = useContext(TableRowGroupContext);
  const isMobile = useWindowSizeInRange(0, 640);

  if (!tableContext) return "<TableRow /> must be a descendant of <Table />";

  const withinGroupRow = !!groupRowContext;
  const { columns, responsive } = tableContext;

  return responsive && isMobile ? (
    <tr ref={ref} className={cn("border-transparent [&:not(:last-child)]:border-b-[16px]", className)} {...rest}>
      <td colSpan={columns.length}>
        <div className="space-y-2 rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-sm">
          {mobileHeader ?? null}

          <div className="grid grid-cols-10 gap-2">
            {columns
              .filter((col) => !!col.label)
              .map((column) => (
                <Fragment key={column.id}>
                  <Text className="col-span-4 text-sm font-medium capitalize text-slate-500 data-[price-col=true]:lowercase">
                    {column.label}
                  </Text>

                  <div className="col-span-6 truncate text-sm font-medium capitalize text-slate-500 data-[price-col=true]:lowercase">
                    {customColumn?.[column.id]?.(column) ?? defaultColumn(column, data[column.id])}
                  </div>
                </Fragment>
              ))}
          </div>

          {mobileFooter ?? null}
        </div>
      </td>
    </tr>
  ) : (
    <tr ref={ref} className={cn("[&:not(:last-child)]:border-b-[1px]", className)} {...rest}>
      {columns.map((col) => (
        <td
          key={col.id}
          className="bg-white px-4 py-1 data-[pad=true]:first:px-16 data-[pad=true]:last:px-8"
          data-pad={withinGroupRow}>
          {customColumn?.[col.id]?.(col) ?? defaultColumn(col, data[col.id])}
        </td>
      ))}
    </tr>
  );
});

interface TableLoaderProps {
  mobileCount?: number;
  desktopCount?: number;
}

const TableLoader = ({ mobileCount = 3, desktopCount = 10 }: TableLoaderProps) => {
  const { resolveClassName } = usePolymorphUi();
  const tableContext = useContext(TableContext);
  if (!tableContext) return "<TableLoader /> must be a descendant of <Table />";

  const { columns } = tableContext;

  return (
    <>
      <tr className={resolveClassName("tableLoader", "tableLoader sm:hidden")}>
        <td colSpan={columns.length}>
          <div className="space-y-4">
            {Array.from({ length: mobileCount })
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                  {Array.from({ length: 8 })
                    .fill(null)
                    .map((_, index) => (
                      <div key={index} className="h-2 w-full animate-pulse rounded-full bg-slate-200" />
                    ))}

                  <div className="h-6 w-full animate-pulse rounded-md bg-slate-200" />
                  <div className="h-6 w-full animate-pulse rounded-md bg-slate-200" />
                </div>
              ))}
          </div>
        </td>
      </tr>

      {Array.from({ length: desktopCount })
        .fill(null)
        .map((_, index) => (
          <tr key={index} className={resolveClassName("tableLoader", "tableLoader max-sm:hidden")}>
            {Array.from({ length: columns.length })
              .fill(null)
              .map((_, index) => (
                <td key={index} className="px-2 py-2.5">
                  <div className="h-2.5 w-full animate-pulse rounded-md bg-slate-100" />
                </td>
              ))}
          </tr>
        ))}
    </>
  );
};
