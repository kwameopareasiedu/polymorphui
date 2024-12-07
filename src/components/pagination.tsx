import React, { ButtonHTMLAttributes, forwardRef, HTMLAttributes, useMemo } from "react";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { VariantNameType } from "@/config/variant";
import { cn } from "@/utils";

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: VariantNameType | VariantNameType[];
  page: number;
  pageSize: number;
  totalCount: number;
  visibleWidth?: number;
  onPageChange?: (page: number) => void;
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  { variant, className, page, pageSize, totalCount, visibleWidth = 3, onPageChange, ...rest }: PaginationProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  const [pageCount, minPage, maxPage] = useMemo(() => {
    const pageCount = Math.ceil(totalCount / pageSize);
    const halfVisibleWidth = Math.max(0, ~~((visibleWidth + 1) / 2) - 1);
    let minPage = page - halfVisibleWidth;
    let maxPage = page + halfVisibleWidth;

    if (minPage <= 0) {
      const shift = 1 + Math.abs(minPage);
      minPage += shift;
      maxPage += shift;
    }

    maxPage = Math.max(1, Math.min(maxPage, pageCount));
    return [pageCount, minPage, maxPage] as const;
  }, [page, pageSize, totalCount, visibleWidth]);

  const _className = resolveClassName(
    "pagination",
    variant,
    "pagination",
    "inline-block w-auto flex items-center flex-wrap gap-2",
    className,
  );

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) onPageChange?.(newPage);
  };

  return (
    <div ref={ref} className={_className} {...rest}>
      {minPage > 1 && (
        <PageButton current={page === 1} onClick={() => handlePageChange(1)}>
          1
        </PageButton>
      )}

      {minPage > 2 && <Ellipsis />}

      {Array(maxPage - minPage + 1)
        .fill(null)
        .map((_, idx) => {
          const buttonPage = minPage + idx;

          return (
            <PageButton key={idx} current={page === buttonPage} onClick={() => handlePageChange(buttonPage)}>
              {buttonPage}
            </PageButton>
          );
        })}

      {maxPage < pageCount - 1 && <Ellipsis />}

      {maxPage < pageCount && (
        <PageButton current={page === pageCount} onClick={() => handlePageChange(pageCount)}>
          {pageCount}
        </PageButton>
      )}
    </div>
  );
});

interface PageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantNameType | VariantNameType[];
  current: boolean;
}

const PageButton = forwardRef<HTMLButtonElement, PageButtonProps>(function TabPanel(
  { variant, className, children, current, ...rest }: PageButtonProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  const _className = resolveClassName(
    "paginationButton",
    variant,
    "paginationButton",
    cn(
      "w-8 h-8 grid place-items-center rounded-full text-sm font-medium leading-[0]",
      "data-[current=false]:bg-white/50 data-[current=false]:text-blue-500",
      "data-[current=true]:bg-blue-500 data-[current=true]:text-white",
    ),
    className,
  );

  return (
    <button ref={ref} type="button" className={_className} data-current={current} {...rest}>
      {children}
    </button>
  );
});

const Ellipsis = () => <span className="text-xs font-medium text-gray-500">...</span>;
