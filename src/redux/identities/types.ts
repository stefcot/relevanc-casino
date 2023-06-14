export type Identity = {
  id: string
  userName: string
  email: string
  birthDate: number
  color: boolean
}

export type IdentityState = {
  list: Identity[]
  status: 'loading' | 'failed' | 'success'
}
