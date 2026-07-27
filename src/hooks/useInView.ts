import { useState, useEffect, useRef } from "react";

type UseInViewReturn = [React.RefObject<HTMLDivElement>, boolean];

export default function useInView(
  threshold: number = 0.15
): UseInViewReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as UseInViewReturn;
}