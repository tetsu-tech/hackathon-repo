import { BaseEntity } from './baseEntity'

export class TemplateItem extends BaseEntity<TemplateItem> {
  order: number = 0
  name: string = ''
  description: string = ''

  get canCreate(): boolean {
    return Boolean(this.order && this.name && this.description)
  }
}
