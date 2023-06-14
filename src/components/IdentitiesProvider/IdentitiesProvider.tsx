import { createContext, FC, PropsWithChildren, useContext } from 'react'
import { Identity } from '@Redux/identities/types'

export type IdentitiesProviderProps = {
  identities: Identity[]
}

const IdentitiesContext = createContext<Identity[]>([])

const IdentitiesProvider: FC<PropsWithChildren<IdentitiesProviderProps>> = ({
  identities,
  children,
}) => (
  <IdentitiesContext.Provider value={identities}>
    {children}
  </IdentitiesContext.Provider>
)

export default IdentitiesProvider

export const useIdentitiesContext = (): Identity[] =>
  useContext(IdentitiesContext)
