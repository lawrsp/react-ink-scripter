import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export interface PrinterFrameProps {
  styleCss?: string;
  open?: boolean;
  className?: string;
  children?: ReactNode;
}

export const PrinterFrame = (props: PrinterFrameProps) => {
  const { styleCss, open, className, children } = props;
  const [node, setNode] = useState<HTMLIFrameElement | null>();

  const attachBody = node?.contentWindow?.document?.body;
  const attachHead = node?.contentWindow?.document?.head;

  return (
    <iframe
      ref={setNode}
      className={clsx(
        "inks-iframe-root",
        !!open && "inks-iframe-root-open",
        className
      )}
    >
      {attachBody && createPortal(children, attachBody)}
      {attachHead &&
        createPortal(
          <style>
            {`@media print {
              .hidden-print {
               display: none !important;
              }
             }`}
            {styleCss}
          </style>,
          attachHead
        )}
    </iframe>
  );
};

/* export const PrinterFrame = (props: PrinterFrameProps) => {
 *   return createPortal(<PrinterFrameRoot {...props} />, document.body);
 * }; */

export default PrinterFrame;
