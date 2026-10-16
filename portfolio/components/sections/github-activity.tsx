import { formatMonth, github, profile } from '@/lib/content'
import { GithubFeed } from './github-feed'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** "2026-10-15" (or a full ISO timestamp) -> "15 October 2026". */
export function longDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return MONTHS[m - 1] ? `${d} ${MONTHS[m - 1]} ${y}` : iso.slice(0, 10)
}

/** "Sonica-B" from the profile link. */
const OWNER = profile.links.github.replace(/\/+$/, '').split('/').pop() ?? ''
const ROWS = 5

/** "Python, 2 stars, pushed Feb 2026" from the snapshot; zero stars go unsaid. */
function repoLine(stats: { language: string | null; stars: number; pushedAt: string }): string {
  const stars = stats.stars > 0 ? `${stats.stars} ${stats.stars === 1 ? 'star' : 'stars'}` : null
  return [stats.language, stars, `pushed ${formatMonth(stats.pushedAt.slice(0, 7))}`].filter(Boolean).join(', ')
}

/**
 * Right panel of the Now row: the build-time GitHub snapshot (repos, followers, the five most
 * recently pushed repositories), server-rendered, with the live event feed under it. The profile
 * README repository (owner/owner) is skipped: it is not a project.
 */
export function GithubActivity() {
  const repos = Object.entries(github.repos)
    .filter(([name]) => name.toLowerCase() !== `${OWNER}/${OWNER}`.toLowerCase())
    .sort((a, b) => (a[1].pushedAt < b[1].pushedAt ? 1 : a[1].pushedAt > b[1].pushedAt ? -1 : 0))
    .slice(0, ROWS)
  const { publicRepos, followers } = github.user

  return (
    <article aria-labelledby="github-title" className="panel p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="github-title" className="text-title">
          <a href={profile.links.github} target="_blank" rel="me noopener noreferrer" className="transition-colors hover:text-accent">
            On GitHub
          </a>
        </h2>
        <p className="text-status">
          {publicRepos} public repos, {followers} followers
        </p>
      </div>

      <ul className="mt-3">
        {repos.map(([name, stats]) => (
          <li key={name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2">
            <a
              href={`https://github.com/${name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 truncate text-ink transition-colors hover:text-accent"
            >
              {name.split('/')[1] ?? name}
            </a>
            <span className="text-status shrink-0">{repoLine(stats)}</span>
          </li>
        ))}
      </ul>

      <GithubFeed user={OWNER} max={ROWS} />

      <p className="text-status mt-3">Snapshot {longDate(github.fetchedAt)}.</p>
    </article>
  )
}
