import { ReactNode } from "react";
import useInView from "../hooks/useInView";

interface Props {
  children: ReactNode;
  delay?: number;
}

export default function AnimSection({ children, delay = 0 }: Props) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""}`}
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
