import useInView from "../hooks/useInView";
import { Skill } from "../types";

interface Props {
  skill: Skill;
}

export default function SkillBar({ skill }: Props) {
  const [ref, inView] = useInView(0.3);

  return (
    <div ref={ref} className="skill-meter">
      <div className="skill-meter-label">
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>

      <div className="skill-meter-track">
        <div
          className="skill-meter-fill"
          style={{
            width: inView ? `${skill.level}%` : "0%",
          }}
        />
      </div>
    </div>
  );
}
