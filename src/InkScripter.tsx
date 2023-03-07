import clsx from "clsx";
import { ClassValue } from "clsx";

export type ContentTextItem = {
  id?: string;
  type: "text";
  value: string;
  span?: number;
};

export type ContentPairItem = {
  id?: string;
  type: "pair";
  label: string;
  value: string;
  span?: number;
};

export type ContentGridItem = {
  id?: string;
  type: "grid";
  content: (ContentPairItem | ContentTextItem)[];
};

export type ContentTableCellItem =
  | {
      id?: string;
      header?: boolean;
      rowSpan?: number;
      colSpan?: number;
      value: string;
    }
  | string;

export type ContentTableItem = {
  id?: string;
  type: "table";
  head?: ContentTableCellItem[][];
  body?: ContentTableCellItem[][];
  foot?: ContentTableCellItem[][];
};

export type ContentItemType =
  | ContentGridItem
  | ContentTableItem
  | ContentTextItem
  | ContentPairItem;

export type ContentType = ContentItemType[];

export type ReactInkScripterProps = {
  value?: ContentType;
  className?: string;
};

export type TypeWithClassName<T> = T & {
  className?: ClassValue;
};

const Container = ({
  id,
  content = [],
  className,
}: Partial<ContentGridItem> & { className?: string }) => {
  console.log("content =====", content);
  return (
    <div id={id} className={clsx("inks-grid", className)}>
      {content.map((item, idx) => {
        switch (item.type) {
          case "pair":
            return <Pair key={idx} className="inks-grid-item" {...item} />;
          case "text":
            return <Text key={idx} className="inks-grid-item" {...item} />;
        }
      })}
    </div>
  );
};

const Grid = (props: ContentGridItem) => {
  return <Container {...props} />;
};

const TableCell = ({ item }: { item: ContentTableCellItem }) => {
  if (typeof item === "string") {
    return <td className="inks-cell">{item}</td>;
  }

  const { id, header, colSpan, rowSpan, value } = item;
  if (header) {
    return (
      <th id={id} className="inks-cell" colSpan={colSpan} rowSpan={rowSpan}>
        {value}
      </th>
    );
  }

  return (
    <td id={id} className="inks-cell" colSpan={colSpan} rowSpan={rowSpan}>
      {value}
    </td>
  );
};

const TableRow = ({ cells }: { cells: ContentTableCellItem[] }) => {
  if (!cells.length) {
    return null;
  }
  return (
    <tr className="inks-table-row">
      {cells.map((v, idx) => (
        <TableCell item={v} key={idx} />
      ))}
    </tr>
  );
};

const TableHead = (props: { rows?: ContentTableCellItem[][] }) => {
  const { rows } = props;
  if (!rows || !rows.length) {
    return null;
  }

  return (
    <thead className="inks-table-head">
      {rows.map((v, idx) => (
        <TableRow key={idx} cells={v} />
      ))}
    </thead>
  );
};

const TableFoot = (props: { rows?: ContentTableCellItem[][] }) => {
  const { rows } = props;
  if (!rows || !rows.length) {
    return null;
  }

  return (
    <tfoot className="inks-table-foot">
      {rows.map((v, idx) => (
        <TableRow key={idx} cells={v} />
      ))}
    </tfoot>
  );
};

const TableBody = (props: { rows?: ContentTableCellItem[][] }) => {
  const { rows } = props;
  if (!rows || !rows.length) {
    return null;
  }

  return (
    <tbody className="inks-table-body">
      {rows.map((v, idx) => (
        <TableRow key={idx} cells={v} />
      ))}
    </tbody>
  );
};

const Table = (props: ContentTableItem) => {
  const { id, head, body, foot } = props;
  if (!head?.length && !body?.length && !foot?.length) {
    return null;
  }
  return (
    <table id={id} className="inks-table">
      <TableHead rows={head} />
      <TableBody rows={body} />
      <TableFoot rows={foot} />
    </table>
  );
};

const Text = ({
  id,
  value,
  span,
  className,
}: TypeWithClassName<ContentTextItem>) => {
  return (
    <div
      id={id}
      className={clsx(
        "inks-text",
        span && "inks-grid",
        span && `inks-span-${span}`,
        className
      )}
    >
      {value}
    </div>
  );
};

const Pair = ({
  id,
  value,
  label,
  span,
  className,
}: TypeWithClassName<ContentPairItem>) => {
  return (
    <div
      id={id}
      className={clsx(
        "inks-pair",
        span && "inks-grid",
        span && `inks-span-${span}`,
        className
      )}
    >
      <label className="inks-pair-label">{label}:</label>
      <div className="inks-pair-value">{value}</div>
    </div>
  );
};

export const InkScripter = (props: ReactInkScripterProps) => {
  const { value = [], className } = props;
  return (
    <div className={clsx("inks-root", className)}>
      {value.map((item, index) => {
        switch (item.type) {
          case "grid":
            return <Grid key={index} {...item} />;
          case "table":
            return <Table key={index} {...item} />;
          case "text":
            return <Text key={index} {...item} />;
          case "pair":
            return <Pair key={index} {...item} />;
        }
      })}
    </div>
  );
};

export default InkScripter;
