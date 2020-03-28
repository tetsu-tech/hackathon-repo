import { BaseEntity } from './baseEntity'
import { GithubUser } from './githubUser'
import { Label } from './label'

export class Issue extends BaseEntity<Issue> {
  title: string = ''
  body: string = ''
  state: 'open' | 'closed' = 'open'
  assigns: GithubUser[] = []
  labels: Label[] = []

  get canCreate(): boolean {
    return Boolean(this.title && this.body)
  }

  get existAssign(): boolean {
    return Boolean(this.assigns.length)
  }

  get isOpen(): boolean {
    return this.state === 'open'
  }

  get firstAssign(): GithubUser {
    if (!this.existAssign) {
      return new GithubUser()
    }
    return this.assigns[0]
  }
}
