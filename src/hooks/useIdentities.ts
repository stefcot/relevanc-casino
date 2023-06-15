import { useAppSelector } from '@Redux/hooks'
import { Identity } from '@Redux/identities/types'
import { getAllIdentities } from '@Redux/identities/selectors'
import { useCallback, useMemo } from 'react'
import { format } from 'date-fns'

const useIdentities = (sortMode?: string): Identity[] => {
  const identities = useAppSelector<Identity[]>(getAllIdentities)

  const sortIdentitiesByBirthDate = useCallback(
    () =>
      identities.slice().sort((a, b) => {
        const aDate = Number(format(new Date(a.birthdate), 'T'))
        const bDate = Number(format(new Date(b.birthdate), 'T'))
        return bDate - aDate
      }),
    [identities]
  )

  const sortIdentitiesByName = useCallback(
    () =>
      identities.slice().sort((a, b) => {
        if (a.username < b.username) {
          return -1
        }
        if (a.username > b.username) {
          return 1
        }
        return 0
      }),
    [identities]
  )

  return useMemo(() => {
    switch (sortMode) {
      case 'name':
        return [...sortIdentitiesByName()]
      case 'birthday':
        return [...sortIdentitiesByBirthDate()]
      default:
        return [...identities]
    }
  }, [sortMode, identities])
}

export default useIdentities
