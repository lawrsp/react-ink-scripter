import { useState, useLayoutEffect, useCallback, useMemo } from 'react';

export type PageConfig = {
  width: number;
  height: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
};

export const getPageHeight = (height: number, page: Partial<PageConfig>) => {
  const { marginTop = 0, marginBottom = 0 } = page;

  return height + marginTop + marginBottom;
};

export const pix2mm = (pix: number) => Math.round(pix * 0.2645833333);
export type usePagePrintProps = {
  open?: boolean;
  pageConfig: Partial<PageConfig>;
  style?: string;
};

export const usePagePrint = <T extends Element>({
  open,
  pageConfig,
  style,
}: usePagePrintProps) => {
  const [page, setPage] = useState<PageConfig>({
    width: pageConfig.width || 0,
    height: pageConfig.height || 0,
    marginLeft: pageConfig.marginLeft || 0,
    marginRight: pageConfig.marginRight || 0,
    marginTop: pageConfig.marginTop || 0,
    marginBottom: pageConfig.marginBottom || 0,
  });

  const [pageNode, setPageNode] = useState<T>();

  const setPageNodeRef = useCallback((node: T) => {
    setPageNode(node);
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }
    const rect = pageNode?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    // height === 0 means auto
    const { width, height } = pageConfig;
    const { height: elmHeight, width: elmWidth } = rect;
    const pageWidth = width || pix2mm(elmWidth);
    const pageHeight = height ? height : getPageHeight(pix2mm(elmHeight), pageConfig);

    setPage((old: PageConfig) => ({
      ...old,
      width: pageWidth,
      height: pageHeight,
    }));
  }, [pageNode, open, pageConfig]);

  const getPageContent = useCallback(() => {
    return pageNode?.innerHTML || '';
  }, [pageNode]);

  const pageStyle = useMemo(() => {
    const { width, height, marginLeft, marginRight, marginTop } = page;

    const extraStyle = `
html {
margin: 0;
padding: 0;
width: ${width}mm;
height: ${height}mm
}

body {
width: ${width}mm;
margin: 0;
padding: 0;
box-sizing: border-box;
padding-left: ${marginLeft}mm;
padding-right: ${marginRight}mm;
padding-top: ${marginTop}mm;
}
`;

    return style + '\n' + extraStyle;
  }, [page, style, page]);

  return { setPageNodeRef, page, getPageContent, pageNode, pageStyle };
};

export default usePagePrint;
