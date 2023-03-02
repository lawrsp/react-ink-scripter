import { ReactInkScripter, ContentType } from "../src";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/InkScripter",
  component: ReactInkScripter,
};

export const Example = () => {
  const value = [
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
      body: [
        [
          { header: true, value: "产品名称" },
          { header: true, value: "规格" },
          { header: true, value: "数量" },
          { header: true, valued: "单价" },
          { header: true, value: "金额" },
        ],
        ["ha1", "hb1", "hc1", "hd1", "he1"],
        [{ span: 2, value: "ha+hb-2" }, "hc2", "hd2", "he2"],
        [{ offset: 1, value: "hb3" }, "hc3", "hd3", "he3"],
        [{ header: true, value: "合计:共3行" }, "", "100", "", "200"],
      ],
    },
    {
      type: "grid",
      value: [
        { type: "field", label: "出货仓库", value: "xxxx", span: 4 },
        { type: "field", label: "送货人员", value: "xxxx", span: 4 },
        { type: "field", label: "大写合计", value: "xxxx", span: 4 },
      ],
    },
    {
      type: "footer",
      content: [
        { type: "text", value: "备注：xxxxxxxxxx", span: 12 },
        { type: "text", value: "提示：xxxxxxxxxx", span: 4 },
        { type: "text", value: "服务电话：xxxxxxxxxx", span: 4 },
        { type: "text", value: "仓库地址：xxxxxxxxxx", span: 4 },
      ],
    },
  ] as ContentType;

  return <ReactInkScripter value={value} />;
};
