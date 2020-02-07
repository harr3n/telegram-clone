import { useState, useEffect, useRef } from "react";

const useScrollAtBottom = () => {
  const [scrollAtBottom, setScrollAtBottom] = useState(false);
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!scrollRef || !scrollRef.current) return;
    const current = scrollRef.current;

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

    observer.observe(current)

    return () => observer.unobserve(current)
  }, [scrollRef]);

  return {
    scrollAtBottom,
    scrollRef
  };
};

export default useScrollAtBottom;
