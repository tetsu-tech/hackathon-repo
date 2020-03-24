import { TemplateItem } from '@/models/templateItem'

export interface TemplateItemResponse {
  _id: string
  order: string
  name: string
  description: string
}

export class TemplateItemRepository {
  createTemplateInstance(data: TemplateItemResponse): TemplateItem {
    const templateItem = new TemplateItem()
    templateItem.id = data._id
    templateItem.order = Number(data.order)
    templateItem.name = data.name
    templateItem.description = data.description
    return templateItem
  }

  toCreateParams(templateItem: TemplateItem) {
    return {
      order: templateItem.order,
      name: templateItem.name,
      description: templateItem.description
    }
  }
}
