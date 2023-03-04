import * as React from "react";
import { ReactInkScripter, ContentType, PrinterFrame } from "../src";
import "./ReactInkScripter.stories.css";
import defaultCss from "./ReactInkScripter.stories.css?inline";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/InkScripter",
  component: ReactInkScripter,
};

const defaultValue: ContentType = [
  { type: "title", value: "销售单据" },
  {
    type: "grid",
    content: [
      { type: "field", label: "购买单位", value: "xxxxx", span: 4 },
      { type: "field", label: "销售日期", value: "xxxx", span: 4 },
      { type: "field", label: "单据编号", value: "xxxx", span: 4 },
      { type: "field", label: "购买方联系人", value: "xxxx", span: 4 },
      { type: "field", label: "购买方手机", value: "xxxx", span: 4 },
      { type: "field", label: "销售人员", value: "xxxx", span: 4 },
    ],
  },
  {
    type: "table",
    head: [
      { header: true, value: "产品名称" },
      { header: true, value: "规格" },
      { header: true, value: "数量" },
      { header: true, value: "单价" },
      { header: true, value: "金额" },
    ],
    body: [
      ["ha1", "hb1", "hc1", "hd1", "he1"],
      [
        { colSpan: 1, value: "ha+hb-2" },
        "hc2",
        "hd2",
        { colSpan: 2, rowSpan: 2, value: "hd2+he2+hd3+he3" },
      ],
      ["hb3", "hc3", "hd3"],
    ],
    foot: [
      { colSpan: 1, header: true, value: "合计:共3行" },
      "",
      "100",
      "",
      "200",
    ],
  },
  {
    type: "grid",
    content: [
      { type: "field", label: "出货仓库", value: "xxxx", span: 4 },
      { type: "field", label: "送货人员", value: "xxxx", span: 4 },
      { type: "field", label: "大写合计", value: "xxxx", span: 4 },
    ],
  },
  {
    type: "footer",
    content: [
      { type: "text", value: "备注：xxxxxxxxxxxxxxxxxxxxxxxxx", span: 12 },
      { type: "text", value: "提示：xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
      { type: "text", value: "服务电话：xxxxxxxxxx" },
      { type: "text", value: "仓库地址：xxxxxxxxxx" },
    ],
  },
];

export const Example = () => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div>
      <textarea
        spellCheck={false}
        style={{ width: "100%", height: "400px" }}
        value={JSON.stringify(value, null, 2)}
        onChange={(ev) => setValue(JSON.parse(ev.target.value))}
      />

      <div style={{ width: "100%", border: "1px solid black" }}>
        <ReactInkScripter value={value} />
      </div>
    </div>
  );
};

export const Print = () => {
  const [css, setCss] = React.useState(defaultCss);
  const [open, setOpen] = React.useState(false);

  const handleClickPrint = () => {
    setOpen(true);
  };

  return (
    <div>
      <button onClick={handleClickPrint}> 打印 </button>
      <div>
        <div>custom styles:</div>
        <textarea
          spellCheck={false}
          style={{ width: "100%", height: "400px" }}
          value={css}
          onChange={(ev) => setCss(ev.target.value)}
        />
        <PrinterFrame styleCss={css} value={defaultValue} open={open} />
      </div>
    </div>
  );
};
