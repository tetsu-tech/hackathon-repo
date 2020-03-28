import {
  TemplateItemResponse,
  TemplateItemRepository
} from '@/repositories/templateItemRepository'
import { api } from '@/plugins/api'
import { Template } from '@/models/template'

const BASE_API = '/templates'

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
    const { data } = await api.get(BASE_API)
    return data.map((d: any) => this.createTemplateInstance(d))
  }

  async get(id: string): Promise<Template> {
    const { data } = await api.get(`${BASE_API}/${id}`)
    return this.createTemplateInstance(data[0])
  }

  private toCreateParams(template: Template) {
    return {
      title: template.title,
      issue_items: template.templateItems.map((item) =>
        this.templateItemRepository.toCreateParams(item)
      )
    }
  }

  async create(template: Template): Promise<Template> {
    const { data } = await api.post(BASE_API, this.toCreateParams(template))
    return this.createTemplateInstance(data)
  }
}
