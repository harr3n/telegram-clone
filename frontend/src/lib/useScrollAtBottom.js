import { useState, useEffect, useRef } from "react";

const useScrollAtBottom = () => {
  const [scrollAtBottom, setScrollAtBottom] = useState(false);
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!scrollRef || !scrollRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrollAtBottom(true);
        } else {
          setScrollAtBottom(false);
        }
      },
      {
        treshold: 0.1
      }
    );

    observer.observe(scrollRef.current)

    return () => observer.unobserve(scrollRef.current)
  }, [scrollRef]);

  return {
    scrollAtBottom,
    scrollRef
  };
};

export default useScrollAtBottom;
