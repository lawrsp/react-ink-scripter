import { useMemo } from 'react';
import { type PageConfig } from './usePagePrint';

export type useFrameStyleProps = {
  page: PageConfig;
  style?: string;
};

export const useFrameStyle = ({ page, style }: useFrameStyleProps) => {
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

  return pageStyle;
};
