import { BaseEntity } from './baseEntity'

export class Issue extends BaseEntity<Issue> {
  title: string = ''
  body: string = ''

  get canCreate(): boolean {
    return Boolean(this.title && this.body)
  }
}
