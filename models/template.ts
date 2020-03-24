import { BaseEntity } from './baseEntity'
import { TemplateItem } from './templateItem'

export class Template extends BaseEntity<Template> {
  title: string = ''
  templateItems: TemplateItem[] = []

  static createMock() {
    const t = new Template()
    t.title = '機能用テンプレート'
    return t
  }

  private setTemplateItemOrder() {
    this.templateItems.forEach((item, i) => {
      item.order = i + 1
    })
  }

  addTemplateItem(templateItem: TemplateItem) {
    this.templateItems.push(templateItem)
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
