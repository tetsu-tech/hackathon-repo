export abstract class BaseEntity<T> {
  id: string

  requireValue(v: any) {
    return !!v || '必須項目です'
  }

  get hasId(): boolean {
    return Boolean(this.id)
  }
}
