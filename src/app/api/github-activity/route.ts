import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME;
    if (!username) {
      throw new Error('GitHub username is not set in environment variables');
    }

    const query = `
      query($username: String!) {
        user(login: $username) {
          name
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
            restrictedContributionsCount
          }
          repositories(
            first: 10
            ownerAffiliations: OWNER
            privacy: PUBLIC
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            nodes {
              name
              description
              url
              stargazerCount
              forkCount
              isArchived
              primaryLanguage {
                name
                color
              }
              updatedAt
            }
          }
        }
      }
    `;

    const response: any = await octokit.graphql(query, { username });
    const calendar = response.user.contributionsCollection.contributionCalendar;
    const restrictedCount =
      response.user.contributionsCollection.restrictedContributionsCount;

    const contributions = calendar.weeks.flatMap(
      (week: { contributionDays: any[] }) =>
        week.contributionDays.map((day: any) => ({
          date: day.date,
          count: day.contributionCount
        }))
    );

    const repos = response.user.repositories.nodes.map((repo: any) => ({
      name: repo.name,
      description: repo.description ?? null,
      url: repo.url,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      isArchived: repo.isArchived,
      language: repo.primaryLanguage
        ? { name: repo.primaryLanguage.name, color: repo.primaryLanguage.color }
        : null,
      updatedAt: repo.updatedAt
    }));

    return NextResponse.json({
      contributions,
      totalContributions: calendar.totalContributions,
      restrictedContributions: restrictedCount,
      name: response.user.name,
      repos
    });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
