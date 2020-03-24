import { Issue } from '@/models/issue'
import { api } from '@/plugins/api'

export class IssueRepository {
  private toCreateParams(issue: Issue) {
    return {
      title: issue.title,
      body: issue.body
    }
  }

  async create(issue: Issue): Promise<void> {
    await api.post('/issues', this.toCreateParams(issue))
  }
}
