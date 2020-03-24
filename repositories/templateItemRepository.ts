import { TemplateItem } from '@/models/templateItem'

export interface TemplateItemResponse {
  _id: string
  order: string
  name: string
  description: string
}

export class TemplateItemRepository {
  static createTemplateInstance(data: TemplateItemResponse): TemplateItem {
    const templateItem = new TemplateItem()
    templateItem.id = data._id
    templateItem.order = Number(data.order)
    templateItem.name = data.name
    templateItem.description = data.description
    return templateItem
  }
}
