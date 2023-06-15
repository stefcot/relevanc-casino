import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react'
import { Identity } from '@Redux/identities/types'
import { useAppSelector } from '@Redux/hooks'
import {
  getUnsortedIdentities,
  getIdentitiesSortedByBirthday,
  getIdentitiesSortedByName,
} from '@Redux/identities/selectors'

export type IdentitiesProviderProps = {
  sortMode?: string
}

const IdentitiesContext = createContext<Identity[]>([])

const IdentitiesProvider: FC<PropsWithChildren<IdentitiesProviderProps>> = ({
  children,
  sortMode,
}) => {
  const unsortedIdentities = useAppSelector<Identity[]>(getUnsortedIdentities)
  const identitiesSortedByName = useAppSelector<Identity[]>(
    getIdentitiesSortedByName
  )
  const identitiesSortedByBirthday = useAppSelector<Identity[]>(
    getIdentitiesSortedByBirthday
  )

  const identities = useMemo(() => {
    switch (sortMode) {
      case 'name':
        return identitiesSortedByName
      case 'birthday':
        return identitiesSortedByBirthday
      default:
        return unsortedIdentities
    }
  }, [
    sortMode,
    unsortedIdentities,
    identitiesSortedByName,
    identitiesSortedByBirthday,
  ])

  return (
    <IdentitiesContext.Provider value={identities}>
      {children}
    </IdentitiesContext.Provider>
  )
}

export default IdentitiesProvider

export const useIdentitiesContext = (): Identity[] =>
  useContext(IdentitiesContext)
