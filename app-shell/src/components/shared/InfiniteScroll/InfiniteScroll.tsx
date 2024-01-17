import {
  ElementRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';

import { InfinityListProps } from './types';

export interface InfiniteScrollRef {
  focus(): void;
  scrollIntoView(): void;
}

const InfiniteScroll = forwardRef<InfiniteScrollRef, InfinityListProps>(function (props, ref) {
  const containerRef = useRef<ElementRef<'div'>>(null);
  const { dataLength: _temp, hasMore, loader, next, children, ...restProps } = props;
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        containerRef.current?.focus();
      },
      scrollIntoView() {
        containerRef.current?.scrollIntoView();
      }
    }),
    []
  );

  const loadMoreItems = useCallback(() => {
    if (!hasMore || isLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      next().then(() => {
        setIsLoading(false);
      });
    }
  }, [hasMore, isLoading, next]);

  useEffect(() => {
    // Create an IntersectionObserver to detect when the user scrolls to the bottom
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          loadMoreItems();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the target is visible
      }
    );

    // Observe the container element
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isLoading, loadMoreItems]);

  return (
    <>
      <div {...restProps}>
        {children}
        <div ref={containerRef} />
      </div>
      {isLoading ? loader : null}
    </>
  );
});

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
