import { BaseEntity } from './baseEntity'
import { TemplateItem } from './templateItem'

export class Template extends BaseEntity<Template> {
  title: string = ''
  templateItems: TemplateItem[] = []

  private setTemplateItemOrder() {
    this.templateItems.forEach((item, i) => {
      item.order = i + 1
    })
  }

  addTemplateItem() {
    this.templateItems.push(new TemplateItem())
    this.setTemplateItemOrder()
  }

  private get canCreateAllTemplateItem(): boolean {
    return this.templateItems.every((item) => item.canCreate)
  }

  get canCreate(): boolean {
    return Boolean(
      this.title && this.templateItems.length && this.canCreateAllTemplateItem
    )
  }
}
