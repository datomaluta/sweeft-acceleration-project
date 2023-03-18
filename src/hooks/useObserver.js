import { useCallback, useRef } from "react";

const useObserver = (isLoading, hasMore, updateFn) => {
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          updateFn();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore, updateFn]
  );

  return { lastElementRef };
};

export default useObserver;
