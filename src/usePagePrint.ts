import { useState, useLayoutEffect, useCallback } from 'react';

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
};

export const usePagePrint = <T extends Element>({
  open,
  pageConfig,
}: usePagePrintProps) => {
  const [page, setPage] = useState<PageConfig>({
    width: pageConfig.width || 0,
    height: pageConfig.height || 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
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

  return { setPageNodeRef, page };
};

export default usePagePrint;
