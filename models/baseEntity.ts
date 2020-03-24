export abstract class BaseEntity<T> {
  id: number
  createdAt: Date
  updatedAt: Date
  loading: boolean = false

  requireValue(v: any) {
    return !!v || '必須項目です'
  }

  get hasId(): boolean {
    return Boolean(this.id)
  }

  equals(entity: BaseEntity<T>): boolean {
    return this.id === entity.id
  }
}
