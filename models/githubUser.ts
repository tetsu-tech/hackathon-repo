import { BaseEntity } from './baseEntity'

export class GithubUser extends BaseEntity<GithubUser> {
  name: string = ''
  icon: string = ''
}
