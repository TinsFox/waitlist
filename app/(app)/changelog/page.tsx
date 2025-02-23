import { Metadata } from 'next';
import { getGitLogs } from '@/app/lib/git';
import { format } from 'date-fns';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog | Your App Name',
  description: 'Latest updates and improvements to our platform.',
};

export default function ChangelogPage() {
  const commits = getGitLogs();

  // 按月份分组提交
  const commitsByMonth = commits.reduce((acc, commit) => {
    const monthKey = format(new Date(commit.date), 'MMMM yyyy');
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(commit);
    return acc;
  }, {} as Record<string, typeof commits>);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight">Changelog</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            The latest updates and improvements to our platform.
          </p>
        </div>

        {/* Changelog entries */}
        <div className="space-y-16">
          {Object.entries(commitsByMonth).map(([month, monthCommits]) => (
            <div key={month} className="relative border-l border-gray-200 dark:border-gray-800 pl-8 before:absolute before:-left-[5px] before:top-[24px] before:h-2.5 before:w-2.5 before:rounded-full before:bg-blue-500">
              <time className="mb-2 block text-sm text-gray-500">{month}</time>
              <div className="space-y-4">
                {monthCommits.map((commit) => (
                  <div key={commit.hash} className="group">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {commit.message}
                    </h2>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <Link href={`https://github.com/your-repo/commit/${commit.hash}`} className="font-mono text-xs hover:text-blue-500 hover:underline">{commit.hash.slice(0, 7)}</Link>
                      <span className="mx-2">•</span>
                      <span>{format(new Date(commit.date), 'MMM dd, yyyy')}</span>
                      <span className="mx-2">•</span>
                      <span>{commit.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
