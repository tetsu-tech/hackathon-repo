import {
  TemplateItemResponse,
  TemplateItemRepository
} from '@/repositories/templateItemRepository'
import { api } from '@/plugins/api'
import { Template } from '@/models/template'

export interface TemplateResponse {
  _id: string
  title: string
  issue_items: TemplateItemResponse
}

export class TemplateRepository {
  static createTemplateInstance(data: any): Template {
    const template = new Template()
    template.id = data._id
    template.title = data.title
    template.templateItems = data.issue_items.map(
      (item: TemplateItemResponse) =>
        TemplateItemRepository.createTemplateInstance(item)
    )
    return template
  }

  async find(): Promise<Template[]> {
    const { data } = await api.get('/templates')
    return data.map((d: any) => TemplateRepository.createTemplateInstance(d))
  }

  async get(): Promise<Template> {
    const { data } = await api.get('/templates')
    return TemplateRepository.createTemplateInstance(data)
  }
}
