import { Issue } from '@/models/issue'
import { api } from '@/plugins/api'

export class IssueRepository {
  createIssueInstance(data: any): Issue {
    const issue = new Issue()
    issue.id = data._id
    issue.title = data.title
    issue.body = data.body
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
