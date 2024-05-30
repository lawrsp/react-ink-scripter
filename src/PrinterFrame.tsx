import { useRef, useImperativeHandle, forwardRef } from 'react';
import type { Ref, ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react';

import { createPortal } from 'react-dom';
import clsx from 'clsx';

export interface PrinterActions {
  print: () => void;
}

export interface PrinterFrameProps {
  styleCss?: string;
  open?: boolean;
  className?: string;
  children?: ReactNode;
  actionRef?: Ref<PrinterActions>;
  src?: string;
  containerId?: string;
  width?: string | number;
  height?: string | number;
}

export const PrinterFrame: ForwardRefExoticComponent<
  PrinterFrameProps & RefAttributes<any>
> = forwardRef((props: PrinterFrameProps, ref: Ref<any>) => {
  const {
    styleCss,
    open,
    className,
    children,
    actionRef,
    src,
    containerId,
    width,
    height,
  } = props;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useImperativeHandle(
    actionRef,
    () => {
      return {
        print() {
          const cw = iframeRef?.current?.contentWindow;
          if (cw) {
            cw.focus();
            cw.print();
          }
        },
      };
    },
    []
  );

  useImperativeHandle(ref, () => {
    return iframeRef?.current;
  });

  const attachNode = containerId
    ? iframeRef?.current?.contentWindow?.document?.getElementById(containerId)
    : iframeRef?.current?.contentWindow?.document?.body;

  const attachStyle = iframeRef?.current?.contentWindow?.document?.head;

  return (
    <iframe
      ref={iframeRef}
      className={clsx('inks-iframe-root', !!open && 'inks-iframe-root-open', className)}
      src={src}
      width={width}
      height={height}
    >
      {!!attachStyle &&
        createPortal(
          <style>
            {`
@media print {
  .hidden-print {
     display: none !important;
  }
}
          `}
            {styleCss}
          </style>,
          attachStyle
        )}
      {!!attachNode && createPortal(children, attachNode)}
    </iframe>
  );
});

export default PrinterFrame;
