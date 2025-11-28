import React, { ReactNode } from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";

interface DetailsTableProps {
  header?: ReactNode;
  className?: string;
  loading?: boolean;
  data: [label: ReactNode, value: ReactNode, visible: boolean][];
  footer?: ReactNode;
}

export const DetailsTable = ({ header, className, loading, data, footer }: DetailsTableProps) => {
  const { resolveClassName } = usePolymorphUi();

  return (
    <table className={resolveClassName("detailsTable", "details-table w-full", "", className)}>
      <tbody className="[&_tr:not(:last-child)]:border-b-[1px]">
        {loading ? (
          Array.from({ length: data.filter(([, , visible]) => visible).length })
            .fill(null)
            .map((_, index) => (
              <tr
                key={index}
                className={resolveClassName("detailsTableLoader", "detailsTableLoader", "[&_td]:px-4 [&_td]:py-2")}>
                <td className="w-36">
                  <div className="h-2.5 w-full animate-pulse rounded-md bg-slate-100" />
                </td>
                <td>
                  <div className="h-2.5 w-full animate-pulse rounded-md bg-slate-100" />
                </td>
              </tr>
            ))
        ) : (
          <>
            {header && (
              <tr className={resolveClassName("detailsTableHeader", "detailsTableHeader")}>
                <td colSpan={2}>{header}</td>
              </tr>
            )}

            {data
              .filter(([, , visible]) => visible)
              .map(([label, value], index) => (
                <tr
                  key={index}
                  className={resolveClassName("detailsTableRow", "detailsTableRow", "[&_td]:px-4 [&_td]:py-1")}>
                  <td className="w-36 text-xs font-bold uppercase text-slate-500">{label}</td>
                  <td>{value}</td>
                </tr>
              ))}

            {footer && (
              <tr className={resolveClassName("detailsTableFooter", "detailsTableFooter")}>
                <td colSpan={2}>{footer}</td>
              </tr>
            )}
          </>
        )}
      </tbody>
    </table>
  );
};
