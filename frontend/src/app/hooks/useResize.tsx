import { useCallback, useEffect, useState } from 'react';

interface UseResizeProps {
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
}

interface UseResizeReturn {
  width: number;
  enableResize: () => void;
}

const useResize = ({ initialWidth, minWidth, maxWidth }: UseResizeProps): UseResizeReturn => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(initialWidth || 240);

  const enableResize = useCallback(() => {
    setIsResizing(true);
  }, [setIsResizing]);

  const disableResize = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX; // You might want to add some offset here from props
        if (newWidth >= (minWidth || 180) && newWidth < (maxWidth || 350)) {
          setWidth(newWidth);
        }
      }
    },
    [minWidth, maxWidth, isResizing, setWidth],
  );

  useEffect(() => {
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', disableResize);

    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', disableResize);
    };
  }, [disableResize, resize]);

  return { width, enableResize };
};

export default useResize;
