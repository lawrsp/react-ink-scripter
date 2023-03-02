import clsx from "clsx";

export type ContentTitleItem = {
  type: "title";
  value: string;
};

export type ContentFieldItem = {
  type: "field";
  label: string;
  value: string;
  span?: number;
};
export type ContentTextItem = {
  type: "text";
  value: string;
  span?: number;
};

export type ContentContainerItem = {
  type: "grid" | "footer";
  content: (ContentFieldItem | ContentTextItem)[];
};

export type ContentTableCellItem =
  | {
      header?: boolean;
      span?: number;
      offset?: number;
      value: string;
    }
  | string;

export type ContentTableItem = {
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

const Title = ({ value }: ContentTitleItem) => {
  return <div>{value}</div>;
};

const Container = ({
  content = [],
  className,
}: Partial<ContentContainerItem> & { className?: string }) => {
  console.log("content =====", content);
  return (
    <div className={clsx("ink-scripter-container", className)}>
      {content.map((item, idx) => {
        switch (item.type) {
          case "field":
            return <Field key={idx} {...item} />;
          case "text":
            return <Text key={idx} {...item} />;
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
    return <td>{item}</td>;
  }

  const { header, span, offset, value } = item;
  if (header) {
    return <th>{value}</th>;
  }

  return <td>{value}</td>;
};

const TableRow = ({ cells }: { cells: ContentTableCellItem[] }) => {
  if (!cells.length) {
    return null;
  }
  return (
    <tr>
      {cells.map((v, idx) => (
        <TableCell item={v} key={idx} />
      ))}
    </tr>
  );
};

const TableHead = (props: { cells?: ContentTableCellItem[] }) => {
  const { cells } = props;
  if (!cells || !cells.length) {
    return null;
  }

  return (
    <thead>
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
    <tfoot>
      {cells.map((v, idx) => (
        <TableCell key={idx} item={v} />
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
    <tbody>
      {rows.map((v, idx) => (
        <TableRow key={idx} cells={v} />
      ))}
    </tbody>
  );
};

const Table = (props: ContentTableItem) => {
  const { head, body, foot } = props;
  if (!head?.length && !body?.length && !foot?.length) {
    return null;
  }
  return (
    <table className="ink-scripter-table">
      <TableHead cells={head} />
      <TableBody rows={body} />
      <TableFoot cells={foot} />
    </table>
  );
};

const Text = ({ value, span }: ContentTextItem) => {
  return <div className="ink-scripter-text">{value}</div>;
};

const Field = ({ value, label }: ContentFieldItem) => {
  return (
    <div className="ink-scripter-filed">
      <label>{label}:</label>
      <span>{value}</span>
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
