// Vercel serverless function: GitHub contribution calendar for the homepage heatmap.
// Needs GITHUB_TOKEN in the Vercel project's environment variables (no scopes required).
const LOGIN = "dominionnnnnnn";
const LEVEL = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    res.status(500).json({ error: "GITHUB_TOKEN is not set" });
    return;
  }
  try {
    const r = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json", "User-Agent": "portfolio-heatmap" },
      body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
    });
    const json = await r.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!r.ok || !cal) throw new Error(json?.errors?.[0]?.message || `GitHub responded ${r.status}`);

    const days = cal.weeks.flatMap((w) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVEL[d.contributionLevel] ?? 0 }))
    );
    // Cache at the edge for 6 hours, serve stale for a day while refreshing.
    res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=86400");
    res.status(200).json({ login: LOGIN, total: cal.totalContributions, days, updated: new Date().toISOString() });
  } catch (e) {
    res.status(502).json({ error: String(e.message || e) });
  }
}
