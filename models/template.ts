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
    if (!this.canAddTemplateItem) {
      return
    }
    this.templateItems.push(new TemplateItem())
    this.setTemplateItemOrder()
  }

  get canAddTemplateItem(): boolean {
    return Boolean(this.templateItems.length <= 10)
  }

  get canDeleteTemplateItem(): boolean {
    return Boolean(this.templateItems.length)
  }

  deleteTemplateItem() {
    if (!this.canDeleteTemplateItem) {
      return
    }
    this.templateItems.pop()
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
