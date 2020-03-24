import { BaseEntity } from './baseEntity'

export class Issue extends BaseEntity<Issue> {
  title: string
  body: string
}
