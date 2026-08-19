interface RequestLike {
  query?: Record<string, string | string[] | undefined>;
}

interface ResponseLike {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
}

const query = `
  query Contributions($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export default async function handler(request: RequestLike, response: ResponseLike) {
  const token = process.env.GITHUB_TOKEN;
  const username = typeof request.query?.username === "string" ? request.query.username : "Wren031";
  const from = typeof request.query?.from === "string" ? request.query.from : "2026-01-01T00:00:00Z";
  const to = typeof request.query?.to === "string" ? request.query.to : "2026-12-31T23:59:59Z";

  if (!token) {
    return response.status(503).json({ message: "GitHub activity is not configured yet." });
  }

  try {
    const githubResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "wren-portfolio",
      },
      body: JSON.stringify({ query, variables: { username, from, to } }),
    });
    const payload = await githubResponse.json();

    if (!githubResponse.ok || payload.errors?.length) {
      return response.status(502).json({ message: "GitHub did not return contribution data." });
    }

    return response.status(200).json(payload.data);
  } catch {
    return response.status(502).json({ message: "Unable to reach GitHub right now." });
  }
}
