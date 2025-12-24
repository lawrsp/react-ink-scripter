import * as React from 'react';
import * as ReactDom from 'react-dom';
import { InkScripter, ContentType, PrinterFrame, PrinterActions, IFrame } from '../src';

import defaultCss from './InkScripter.css?inline';
import './PrinterFrame.css';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/InkScripter',
  component: InkScripter,
  tags: ['autodocs'], // 👈 Add this tag
};

export default meta;

const defaultValue: ContentType = [
  { type: 'text', id: 'title', value: '销售单据' },
  {
    type: 'grid',
    content: [
      { type: 'pair', label: '购买单位', value: 'xxxxx', span: 8 },
      { type: 'pair', label: '销售日期', value: 'xxxx', span: 8 },
      { type: 'pair', label: '单据编号', value: 'xxxx', span: 8 },
      { type: 'pair', label: '购买方联系人', value: 'xxxx', span: 8 },
      { type: 'pair', label: '购买方手机', value: 'xxxx', span: 8 },
      { type: 'pair', label: '销售人员', value: 'xxxx', span: 8 },
    ],
  },
  {
    type: 'table',
    head: [
      [
        { header: true, value: '序号', className: 'table-col-index' },
        { header: true, value: '产品名称' },
        { header: true, value: '规格' },
        { header: true, value: '数量' },
        { header: true, value: '单价' },
        { header: true, value: '金额' },
      ],
    ],
    body: [
      [{ value: '1', className: 'table-col-index' }, 'ha1', 'hb1', 'hc1', 'hd1', 'he1'],
      [
        '2',
        { colSpan: 1, value: 'ha+hb-2' },
        'hc2',
        'hd2',
        { colSpan: 2, rowSpan: 2, value: 'hd2+he2+hd3+he3' },
      ],
      ['3', 'hb3', 'hc3', 'hd3'],
    ],
    foot: [['', { colSpan: 1, header: true, value: '合计:共3行' }, '', '100', '', '200']],
  },
  {
    type: 'grid',
    content: [
      { type: 'pair', label: '出货仓库', value: 'xxxx', span: 8 },
      { type: 'pair', label: '送货人员', value: 'xxxx', span: 8 },
      { type: 'pair', label: '大写合计', value: 'xxxx', span: 8 },
    ],
  },
  {
    type: 'grid',
    id: 'footer',
    content: [
      { type: 'text', value: '备注：xxxxxxxxxxxxxxxxxxxxxxxxx', span: 24 },
      {
        type: 'box',
        className: 'color-blue',
        span: 24,
        content: [
          { type: 'text', value: '提示：xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
          { type: 'text', value: '服务电话：xxxxxxxxxx' },
          { type: 'text', value: '仓库地址：xxxxxxxxxx' },
        ],
      },
    ],
  },
];

export const Example = () => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div>
      {ReactDom.createPortal(
        <style>
          {defaultCss}
          {'.table-col-index { color: red; width: 40px;}'}
          {'.color-blue { color: blue; }'}
        </style>,
        document.head
      )}
      <div style={{ width: '100%', border: '1px solid black' }}>
        <InkScripter value={value} />
      </div>
      <textarea
        spellCheck={false}
        style={{ width: '100%', height: '400px', marginTop: 16 }}
        value={JSON.stringify(value, null, 2)}
        onChange={(ev) => setValue(JSON.parse(ev.target.value))}
      />
    </div>
  );
};

export const Print = () => {
  const [css, setCss] = React.useState(defaultCss);
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<PrinterActions>();

  const handleOpenPrint = () => {
    setOpen(true);
  };
  const handleClosePrint = () => {
    setOpen(false);
  };

  const handleClickPrint = () => {
    ref?.current.print();
  };

  return (
    <div>
      <button onClick={handleOpenPrint}> 打印 </button>
      <div>
        <div>custom styles:</div>
        <textarea
          spellCheck={false}
          style={{ width: '100%', height: '400px' }}
          value={css}
          onChange={(ev) => setCss(ev.target.value)}
        />
      </div>
      <PrinterFrame styleCss={css} open={open} actionRef={ref}>
        <div className="hidden-print">
          <button onClick={handleClickPrint}>打印</button>
          <button onClick={handleClosePrint}>关闭</button>
        </div>
        <InkScripter value={defaultValue} />
      </PrinterFrame>
    </div>
  );
};

export const AutoHeightFrame = () => {
  const [node, setNode] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const [height, setHeight] = React.useState<number | undefined>();

  React.useEffect(() => {
    const rect = node?.getBoundingClientRect();
    if (rect) {
      setHeight(rect.height + 16);
    } else {
      setHeight(16);
    }
  }, [node]);

  return (
    <div>
      <button onClick={() => setOpen((old) => !old)}>toggle open</button>
      <IFrame styleCss={defaultCss} width="100%" height={height}>
        {open && <InkScripter value={defaultValue} ref={setNode} />}
      </IFrame>
    </div>
  );
};
