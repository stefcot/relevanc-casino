export type Identity = {
  id: string
  username: string
  email: string
  birthdate: string
  color: boolean
}

export type IdentityState = {
  identities: Identity[]
  disabled: 'loading' | 'failed' | 'success'
  listMode: boolean
}
