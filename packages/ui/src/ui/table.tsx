// AlignUI Table v0.0.0

import type * as React from "react";

import * as Divider from "@/ui/divider";
import { cn } from "@/utils/cn";

const Table = ({
  className,
  ref: forwardedRef,
  ...rest
}: React.TableHTMLAttributes<HTMLTableElement> & {
  ref?: React.Ref<HTMLTableElement | null>;
}) => (
  <div className={cn("w-full overflow-x-auto", className)}>
    <table className="w-full" ref={forwardedRef} {...rest} />
  </div>
);
Table.displayName = "Table";

const TableHeader = ({
  ref: forwardedRef,
  ...rest
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement | null>;
}) => <thead ref={forwardedRef} {...rest} />;
TableHeader.displayName = "TableHeader";

const TableHead = ({
  className,
  ref: forwardedRef,
  ...rest
}: React.ThHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.Ref<HTMLTableCellElement | null>;
}) => (
  <th
    className={cn(
      "bg-bg-weak-50 px-3 py-2 text-left text-paragraph-sm text-text-sub-600 first:rounded-l-lg last:rounded-r-lg",
      className
    )}
    ref={forwardedRef}
    {...rest}
  />
);
TableHead.displayName = "TableHead";

const TableBody = ({
  spacing = 8,
  ref: forwardedRef,
  ...rest
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  spacing?: number;
} & { ref?: React.Ref<HTMLTableSectionElement | null> }) => {
  return (
    <>
      {/* to have space between thead and tbody */}
      <tbody
        aria-hidden="true"
        className="table-row"
        style={{
          height: spacing,
        }}
      />

      <tbody ref={forwardedRef} {...rest} />
    </>
  );
};
TableBody.displayName = "TableBody";

const TableRow = ({
  className,
  ref: forwardedRef,
  ...rest
}: React.HTMLAttributes<HTMLTableRowElement> & {
  ref?: React.Ref<HTMLTableRowElement | null>;
}) => (
  <tr className={cn("group/row", className)} ref={forwardedRef} {...rest} />
);
TableRow.displayName = "TableRow";

function TableRowDivider({
  className,
  dividerClassName,
  ...rest
}: React.ComponentPropsWithoutRef<typeof Divider.Root> & {
  dividerClassName?: string;
}) {
  return (
    <tr className={className}>
      <td className="py-1" colSpan={999}>
        <Divider.Root
          className={dividerClassName}
          variant="line-spacing"
          {...rest}
        />
      </td>
    </tr>
  );
}
TableRowDivider.displayName = "TableRowDivider";

const TableCell = ({
  className,
  ref: forwardedRef,
  ...rest
}: React.TdHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.Ref<HTMLTableCellElement | null>;
}) => (
  <td
    className={cn(
      "h-16 px-3 transition duration-200 ease-out first:rounded-l-xl last:rounded-r-xl group-hover/row:bg-bg-weak-50",
      className
    )}
    ref={forwardedRef}
    {...rest}
  />
);
TableCell.displayName = "TableCell";

const TableCaption = ({
  className,
  ref: forwardedRef,
  ...rest
}: React.HTMLAttributes<HTMLTableCaptionElement> & {
  ref?: React.Ref<HTMLTableCaptionElement | null>;
}) => (
  <caption
    className={cn("mt-4 text-paragraph-sm text-text-sub-600", className)}
    ref={forwardedRef}
    {...rest}
  />
);
TableCaption.displayName = "TableCaption";

export {
  Table as Root,
  TableHeader as Header,
  TableBody as Body,
  TableHead as Head,
  TableRow as Row,
  TableRowDivider as RowDivider,
  TableCell as Cell,
  TableCaption as Caption,
};
