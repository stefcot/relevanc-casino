import { createSelector } from '@reduxjs/toolkit'
import { IdentityState } from '@Redux/identities/types'
import { format } from 'date-fns'

export const getIdentityState = (state: RootState): IdentityState => state

export const getUnsortedIdentities = createSelector(
  getIdentityState,
  (state: IdentityState) => state.identities
)
export const getIdentitiesSortedByName = createSelector(
  getIdentityState,
  (state: IdentityState) =>
    state.identities.slice().sort((a, b) => {
      if (a.username < b.username) {
        return -1
      }
      if (a.username > b.username) {
        return 1
      }
      return 0
    })
)

export const getIdentitiesSortedByBirthday = createSelector(
  getIdentityState,
  (state: IdentityState) =>
    state.identities.slice().sort((a, b) => {
      const aDate = Number(format(new Date(a.birthdate), 'T'))
      const bDate = Number(format(new Date(b.birthdate), 'T'))
      return bDate - aDate
    })
)

export const getListMode = createSelector(
  getIdentityState,
  (state: IdentityState) => state.listMode
)

export const getPendingFetches = createSelector(
  getIdentityState,
  (state: IdentityState) => state.pendingFetches
)
