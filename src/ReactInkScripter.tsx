import clsx from "clsx";
import { ClassValue } from "clsx";

export type ContentTitleItem = {
  id?: string;
  type: "title";
  value: string;
};

export type ContentFieldItem = {
  id?: string;
  type: "field";
  label: string;
  value: string;
  span?: number;
};
export type ContentTextItem = {
  id?: string;
  type: "text";
  value: string;
  span?: number;
};

export type ContentContainerItem = {
  id?: string;
  type: "grid" | "footer";
  content: (ContentFieldItem | ContentTextItem)[];
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
  head?: ContentTableCellItem[];
  body?: ContentTableCellItem[][];
  foot?: ContentTableCellItem[];
};

export type ContentType = (
  | ContentTitleItem
  | ContentContainerItem
  | ContentTableItem
  | ContentTextItem
  | ContentFieldItem
)[];

export type ReactInkScripterProps = {
  value?: ContentType;
};

export type TypeWithClassName<T> = T & {
  className?: ClassValue;
};

const Title = ({ value, id }: ContentTitleItem) => {
  return (
    <div id={id} className="ink-scripter-title">
      {value}
    </div>
  );
};

const Container = ({
  id,
  content = [],
  className,
}: Partial<ContentContainerItem> & { className?: string }) => {
  console.log("content =====", content);
  return (
    <div id={id} className={clsx("ink-scripter-grid", className)}>
      {content.map((item, idx) => {
        switch (item.type) {
          case "field":
            return (
              <Field key={idx} className="ink-scripter-grid-item" {...item} />
            );
          case "text":
            return (
              <Text key={idx} className="ink-scripter-grid-item" {...item} />
            );
        }
      })}
    </div>
  );
};

const Grid = (props: ContentContainerItem) => {
  return <Container {...props} />;
};

const Footer = (props: ContentContainerItem) => {
  return <Container {...props} className="ink-scripter-footer" />;
};

const TableCell = ({ item }: { item: ContentTableCellItem }) => {
  if (typeof item === "string") {
    return <td className="ink-scripter-cell">{item}</td>;
  }

  const { id, header, colSpan, rowSpan, value } = item;
  if (header) {
    return (
      <th
        id={id}
        className="ink-scripter-cell"
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {value}
      </th>
    );
  }

  return (
    <td
      id={id}
      className="ink-scripter-cell"
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {value}
    </td>
  );
};

const TableRow = ({ cells }: { cells: ContentTableCellItem[] }) => {
  if (!cells.length) {
    return null;
  }
  return (
    <tr className="ink-scripter-table-row">
      {cells.map((v, idx) => (
        <TableCell item={v} key={idx} />
      ))}
    </tr>
  );
};

const TableHead = (props: { cells?: ContentTableCellItem[] }) => {
  const { cells, id } = props;
  if (!cells || !cells.length) {
    return null;
  }

  return (
    <thead className="ink-scripter-table-head">
      {cells.map((v, idx) => (
        <TableCell key={idx} item={v} />
      ))}
    </thead>
  );
};

const TableFoot = (props: { cells?: ContentTableCellItem[] }) => {
  const { cells } = props;
  if (!cells || !cells.length) {
    return null;
  }

  return (
    <tfoot className="ink-scripter-table-foot">
      {cells.map((v, idx) => (
        <TableCell key={idx} item={v} />
      ))}{" "}
    </tfoot>
  );
};

const TableBody = (props: { rows?: ContentTableCellItem[][] }) => {
  const { rows } = props;
  if (!rows || !rows.length) {
    return null;
  }

  return (
    <tbody className="ink-scripter-table-body">
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
    <table id={id} className="ink-scripter-table">
      <TableHead cells={head} />
      <TableBody rows={body} />
      <TableFoot cells={foot} />
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
        "ink-scripter-text",
        span && "ink-scripter-grid",
        span && `ink-scripter-span-${span}`,
        className
      )}
    >
      {value}
    </div>
  );
};

const Field = ({
  id,
  value,
  label,
  span,
  className,
}: TypeWithClassName<ContentFieldItem>) => {
  return (
    <div
      id={id}
      className={clsx(
        "ink-scripter-field",
        span && "ink-scripter-grid",
        span && `ink-scripter-span-${span}`,
        className
      )}
    >
      <label className="ink-scripter-field-label">{label}:</label>
      <div className="ink-scripter-field-value">{value}</div>
    </div>
  );
};

export const ReactInkScripter = (props: ReactInkScripterProps) => {
  const { value = [] } = props;
  return (
    <div className="ink-scripter-root">
      {value.map((item, index) => {
        switch (item.type) {
          case "title":
            return <Title key={index} {...item} />;
          case "footer":
            return <Footer key={index} {...item} />;
          case "grid":
            return <Grid key={index} {...item} />;
          case "table":
            return <Table key={index} {...item} />;
          case "text":
            return <Text key={index} {...item} />;
          case "field":
            return <Field key={index} {...item} />;
        }
      })}
    </div>
  );
};

export default ReactInkScripter;
