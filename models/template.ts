import { BaseEntity } from './baseEntity'
import { TemplateItem } from './templateItem'

export class Template extends BaseEntity<Template> {
  title: string = ''
  templateItems: TemplateItem[] = []
}
