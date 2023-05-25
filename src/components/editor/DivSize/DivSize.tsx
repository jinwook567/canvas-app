import React, { useEffect, useRef, useState } from 'react';
import { debounceTime, Observable } from 'rxjs';

type Props = {
  style?: React.CSSProperties;
  children: (size: { width: number; height: number }) => React.ReactNode;
};

function DivSize({ style, children }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const isInitial = useRef(true);

  const resizeObserver = (element: Element) =>
    new Observable<ResizeObserverEntry>(subscriber => {
      const observer = new ResizeObserver(entries => {
        entries.forEach(entry => subscriber.next(entry));
      });

      observer.observe(element);
      return () => {
        observer.unobserve(element);
      };
    });

  useEffect(() => {
    const { current } = divRef;
    if (!current) return () => {};

    const observable = resizeObserver(current);

    const subscription = observable
      .pipe(debounceTime(isInitial.current ? 0 : 300))
      .subscribe(entry => {
        isInitial.current = false;
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div ref={divRef} style={style}>
      {children(size)}
    </div>
  );
}

export default DivSize;
