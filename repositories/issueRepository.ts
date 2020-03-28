import { GithubUserRepository } from './githubUserRepository'
import { LabelRepository } from './labelRepository'
import { Issue } from '@/models/issue'
import { api } from '@/plugins/api'

export class IssueRepository {
  githubUserRepository: GithubUserRepository
  labelRepository: LabelRepository

  constructor() {
    this.githubUserRepository = new GithubUserRepository()
    this.labelRepository = new LabelRepository()
  }

  createIssueInstance(data: any): Issue {
    const issue = new Issue()
    issue.id = data.id
    issue.title = data.title
    issue.body = data.body
    issue.state = data.state
    issue.assigns = data.assignees.map((a: any) =>
      this.githubUserRepository.createIssueInstance(a)
    )
    issue.labels = data.labels.map((l: any) =>
      this.labelRepository.createIssueInstance(l)
    )
    issue.createdAt = new Date(data.created_at)
    return issue
  }

  private toCreateParams(issue: Issue) {
    return {
      title: issue.title,
      body: issue.body
    }
  }

  async find(): Promise<Issue[]> {
    const { data } = await api.get('/issues')
    console.log(data)
    return data.map((d: any) => this.createIssueInstance(d))
  }

  async get(id: string): Promise<Issue> {
    const { data } = await api.get('/issues/' + id)
    return this.createIssueInstance(data)
  }

  async create(issue: Issue): Promise<void> {
    await api.post('/issues', this.toCreateParams(issue))
  }
}
