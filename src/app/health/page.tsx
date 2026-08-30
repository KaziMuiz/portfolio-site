type GitHubUser = {
  login: string;
  public_repos: number;
  followers: number;
  created_at: string;
};

async function getGitHubStatus(): Promise<GitHubUser | null> {
  try {
    const res = await fetch("https://api.github.com/users/KaziMuiz", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function HealthPage() {
  const data = await getGitHubStatus();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Health Check</h1>
      <p className="text-gray-400 mb-6 text-sm">
        This page fetches live data server-side to confirm the deployment can
        reach an external API.
      </p>

      {data ? (
        <div className="border border-gray-800 rounded-lg p-4 space-y-1 text-sm">
          <p className="text-green-400 font-medium mb-2">✓ API reachable</p>
          <p>GitHub user: {data.login}</p>
          <p>Public repos: {data.public_repos}</p>
          <p>Followers: {data.followers}</p>
          <p>Account created: {new Date(data.created_at).toDateString()}</p>
        </div>
      ) : (
        <p className="text-red-400 text-sm">✗ Could not reach GitHub API.</p>
      )}
    </div>
  );
}
