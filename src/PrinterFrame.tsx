import { useState } from "react";
import { createPortal } from "react-dom";
import { ReactInkScripter } from "./ReactInkScripter";

export interface PrinterFrameProps {
  styleCss?: string;
  open?: boolean;
  value?: ContentType;
}

/* const PrintContentWithChildren = ({value?: ContentType, children?: ReactNode}) => {
 *     return <div>
 *     </div>
 * }; */

export const PrinterFrame = (props: PrinterFrameProps) => {
  const { styleCss, value, open } = props;
  const [node, setNode] = useState();
  console.log("node===", node, node?.contentWindow.document);

  return (
    <iframe
      ref={setNode}
      style={{
        display: open ? "block" : "none",
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      {node &&
        node.contentWindow?.document?.body &&
        createPortal(
          <ReactInkScripter value={value} />,
          node.contentWindow?.document?.body
        )}
      {node &&
        node.contentWindow?.document?.head &&
        createPortal(
          <style>{styleCss}</style>,
          node.contentWindow?.document?.head
        )}
    </iframe>
  );
};

export default PrinterFrame;
