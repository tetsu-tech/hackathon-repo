import { BaseEntity } from './baseEntity'

export class Label extends BaseEntity<Label> {
  name: string = ''
  color: string = ''
  description: string = ''
}
