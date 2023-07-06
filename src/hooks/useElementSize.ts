import { useEffect, useRef, useState } from 'react';
import { debounceTime, Observable } from 'rxjs';

function useElementSize<T extends Element>() {
  const ref = useRef<T>(null);
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
    const { current } = ref;
    if (!current) return;

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

  return { size, ref };
}

export default useElementSize;
