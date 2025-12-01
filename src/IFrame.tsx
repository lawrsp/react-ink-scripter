import { useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface IFrameProps {
  className?: string;
  styleCss?: string;
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
}

export const IFrame = forwardRef<HTMLIFrameElement | undefined, IFrameProps>(
  (props, ref) => {
    const { styleCss, className, children, width, height } = props;
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const [frameWidth, frameHeight] = useMemo(() => {
      return [width, height];
    }, [width, height]);

    const attachBody = iframeRef?.current?.contentWindow?.document?.body;
    const attachHead = iframeRef?.current?.contentWindow?.document?.head;

    console.log(attachBody, attachHead, iframeRef.current);

    useImperativeHandle(
      ref,
      () => {
        return iframeRef?.current || undefined;
      },
      []
    );

    return (
      <iframe
        ref={iframeRef}
        className={className}
        width={frameWidth}
        height={frameHeight}
      >
        {attachBody && createPortal(children, attachBody)}
        {attachHead && createPortal(<style>{styleCss}</style>, attachHead)}
      </iframe>
    );
  }
);
