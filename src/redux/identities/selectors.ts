import { createSelector } from '@reduxjs/toolkit'
import { IdentityState } from '@Redux/identities/types'

export const getIdentityState = (state: RootState): IdentityState => state

export const getIdentities = createSelector(
  getIdentityState,
  (state: IdentityState) => state.list.filter((m) => m.color)
)

export const getAllIdentities = createSelector(
  getIdentityState,
  (state: IdentityState) => state.list
)
