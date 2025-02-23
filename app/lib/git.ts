import { execSync } from 'child_process';

export interface GitCommit {
  hash: string;
  date: string;
  message: string;
  author: string;
}

export function getGitLogs(): GitCommit[] {
  try {
    const gitLog = execSync(
      'git log --pretty=format:"%H|%ad|%an|%s" --date=iso'
    ).toString();

    return gitLog
      .split('\n')
      .map((line) => {
        const [hash, date, author, message] = line.split('|');
        return {
          hash,
          date: new Date(date).toISOString(),
          author,
          message,
        };
      })
      .filter((commit) => {
        // 可以在这里添加过滤条件，比如只显示包含特定前缀的提交
        return !commit.message.includes('Merge') &&
          !commit.message.toLowerCase().includes('wip');
      });
  } catch (error) {
    console.error('Error reading git logs:', error);
    return [];
  }
}