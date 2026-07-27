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
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}