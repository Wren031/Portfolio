import useInView from "../hooks/useInView";
import { Skill } from "../types";

interface Props {
  skill: Skill;
}

export default function SkillBar({ skill }: Props) {
  const [ref, inView] = useInView(0.3);

  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>

      <div style={{ height: "2px", background: "var(--border)" }}>
        <div
          style={{
            height: "100%",
            width: inView ? `${skill.level}%` : "0%",
            background: "linear-gradient(90deg,var(--cyan),var(--purple))",
            transition: "width 1.3s ease",
          }}
        />
      </div>
    </div>
  );
}