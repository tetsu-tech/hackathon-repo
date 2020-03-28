import { GithubUser } from '@/models/githubUser'

export class GithubUserRepository {
  createIssueInstance(data: any): GithubUser {
    const user = new GithubUser()
    user.id = data.id
    user.name = data.login
    user.icon = data.avatar_url
    return user
  }
}
