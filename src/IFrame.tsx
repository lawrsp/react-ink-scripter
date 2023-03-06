import { ReactNode, useRef, Ref, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export interface IFrameProps {
  className?: string;
  styleCss?: string;
  children?: ReactNode;
}

export const IFrame = forwardRef(
  (props: IFrameProps, ref: Ref<HTMLIFrameElement | null>) => {
    const { styleCss, className, children } = props;
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    const attachBody = iframeRef?.current?.contentWindow?.document?.body;
    const attachHead = iframeRef?.current?.contentWindow?.document?.head;

    useImperativeHandle(
      ref,
      () => {
        return iframeRef?.current;
      },
      []
    );

    return (
      <iframe ref={iframeRef} className={className}>
        {attachBody && createPortal(children, attachBody)}
        {attachHead && createPortal(<style>{styleCss}</style>, attachHead)}
      </iframe>
    );
  }
);
