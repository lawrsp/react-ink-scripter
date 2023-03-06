import { ReactNode, useRef, Ref, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export interface PrinterActions {
  print: () => void;
}

export interface PrinterFrameProps {
  styleCss?: string;
  open?: boolean;
  className?: string;
  children?: ReactNode;
  actionRef?: Ref<PrinterActions>;
}

export const PrinterFrame = (props: PrinterFrameProps) => {
  const { styleCss, open, className, children, actionRef } = props;
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

  const attachBody = iframeRef?.current?.contentWindow?.document?.body;
  const attachHead = iframeRef?.current?.contentWindow?.document?.head;

  return (
    <iframe
      ref={iframeRef}
      className={clsx(
        "inks-iframe-root",
        !!open && "inks-iframe-root-open",
        className
      )}
    >
      {!!attachBody && createPortal(children, attachBody)}
      {!!attachHead &&
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
          attachHead
        )}
    </iframe>
  );
};

export default PrinterFrame;
