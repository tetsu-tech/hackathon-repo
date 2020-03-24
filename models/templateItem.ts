import { BaseEntity } from './baseEntity'

export class TemplateItem extends BaseEntity<TemplateItem> {
  name: string = ''
  description: string = ''
}
