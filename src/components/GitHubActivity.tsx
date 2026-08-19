import { useEffect, useMemo, useState } from "react";
import AnimSection from "./AnimSection";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ActivityResponse {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: ContributionWeek[];
      };
    };
  };
}

const YEARS = [2026, 2025, 2024];
const USERNAME = "Wren031";

function getDateRange(year: number) {
  return {
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  };
}

function level(count: number, maximum: number) {
  if (!count) return 0;
  if (count >= maximum * 0.75) return 4;
  if (count >= maximum * 0.5) return 3;
  if (count >= maximum * 0.25) return 2;
  return 1;
}

export default function GitHubActivity() {
  const [year, setYear] = useState(2026);
  const [activity, setActivity] = useState<ActivityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { from, to } = getDateRange(year);

    setLoading(true);
    setError("");

    fetch(`/api/github-activity?username=${USERNAME}&from=${from}&to=${to}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.message || "GitHub activity is not configured yet.");
        }
        return response.json() as Promise<ActivityResponse>;
      })
      .then(setActivity)
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setActivity(null);
        setError(requestError instanceof Error ? requestError.message : "Unable to load GitHub activity.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [year]);

  const calendar = activity?.user.contributionsCollection.contributionCalendar;
  const days = useMemo(() => calendar?.weeks.flatMap((week) => week.contributionDays) || [], [calendar]);
  const maximum = Math.max(...days.map((day) => day.contributionCount), 1);

  return (
    <section id="github-activity">
      <div className="si">
        <AnimSection>
          <div className="section-label">github_activity</div>
          <div className="activity-heading">
            <div>
              <h2>Consistent work, visible over time.</h2>
              <p className="section-sub">A live view of my public GitHub contributions and coding rhythm.</p>
            </div>
            <a className="activity-profile-link" href="https://github.com/Wren031" target="_blank" rel="noreferrer noopener">
              View GitHub profile
            </a>
          </div>
        </AnimSection>

        <AnimSection delay={0.1}>
          <div className="activity-panel">
            <div className="activity-toolbar">
              <div className="activity-total">
                <strong>{loading ? "..." : calendar?.totalContributions ?? "--"}</strong>
                <span>contributions in {year}</span>
              </div>
              <div className="activity-years" aria-label="Choose contribution year">
                {YEARS.map((option) => (
                  <button type="button" key={option} className={option === year ? "active" : ""} onClick={() => setYear(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {error ? (
              <div className="activity-fallback">
                <strong>Live activity unavailable</strong>
                <span>{error} Add a server-side <code>GITHUB_TOKEN</code> to enable the calendar.</span>
              </div>
            ) : (
              <div className={`activity-calendar ${loading ? "loading" : ""}`} aria-label={`${year} GitHub contribution calendar`}>
                {calendar?.weeks.map((week, weekIndex) => (
                  <div className="activity-week" key={`week-${weekIndex}`}>
                    {week.contributionDays.map((day) => (
                      <span
                        className={`activity-day level-${level(day.contributionCount, maximum)}`}
                        key={day.date}
                        title={`${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${day.date}`}
                        aria-label={`${day.contributionCount} contributions on ${day.date}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}

            <div className="activity-legend">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((item) => <i className={`activity-day level-${item}`} key={item} />)}
              <span>More</span>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}
