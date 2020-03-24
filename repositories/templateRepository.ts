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
  templateItemRepository: TemplateItemRepository

  constructor() {
    this.templateItemRepository = new TemplateItemRepository()
  }

  createTemplateInstance(data: any): Template {
    const template = new Template()
    template.id = data._id
    template.title = data.title
    template.templateItems = data.issue_items.map(
      (item: TemplateItemResponse) =>
        this.templateItemRepository.createTemplateInstance(item)
    )
    return template
  }

  async find(): Promise<Template[]> {
    const { data } = await api.get('/templates')
    return data.map((d: any) => this.createTemplateInstance(d))
  }

  async get(): Promise<Template> {
    const { data } = await api.get('/templates')
    return this.createTemplateInstance(data)
  }

  private toCreateParams(template: Template) {
    return {
      title: template.title,
      issue_items: template.templateItems.map((item) =>
        this.templateItemRepository.toCreateParams(item)
      )
    }
  }

  async create(template: Template) {
    await api.post('/issues', this.toCreateParams(template))
  }
}
