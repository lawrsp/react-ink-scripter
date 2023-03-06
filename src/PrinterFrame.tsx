import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import "./PrinterFrame.css";

export interface PrinterFrameProps {
  styleCss?: string;
  open?: boolean;
  className?: string;
  children?: ReactNode;
}

export const PrinterFrame = (props: PrinterFrameProps) => {
  const { styleCss, open, className, children } = props;
  const [node, setNode] = useState<HTMLIFrameElement | null>();

  return (
    <iframe
      ref={setNode}
      className={clsx(
        "inks-iframe-root",
        !!open && "inks-iframe-root-open",
        className
      )}
    >
      {node?.contentWindow?.document?.body &&
        createPortal(children, node?.contentWindow?.document?.body)}
      {node?.contentWindow?.document?.head &&
        createPortal(
          <style>
            {`@media print {
              .hidden-print {
               display: none !important;
              }
             }`}
            {styleCss}
          </style>,
          node?.contentWindow?.document?.head
        )}
    </iframe>
  );
};

/* export const PrinterFrame = (props: PrinterFrameProps) => {
 *   return createPortal(<PrinterFrameRoot {...props} />, document.body);
 * }; */

export default PrinterFrame;
