import { Label } from '@/models/label'

export class LabelRepository {
  createIssueInstance(data: any): Label {
    const label = new Label()
    label.id = data.id
    label.name = data.name
    label.color = '#' + data.color
    label.description = data.description
    return label
  }
}
