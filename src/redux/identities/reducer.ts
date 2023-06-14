import { Action, createReducer, Draft } from '@reduxjs/toolkit'
import { fetchIdentity } from '@Redux/identities/actions'
import type { Identity, IdentityState } from '@Redux/identities/types'

const initialState: IdentityState = {
  identities: [],
  status: 'loading',
  listMode: false,
}

const identitiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchIdentity.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchIdentity.fulfilled, (state: Draft<IdentityState>) => {
      state.status = 'success'
    })
    .addCase(fetchIdentity.rejected, (state: Draft<IdentityState>) => {
      state.status = 'failed'
    })
    .addCase(
      'identities/setListMode',
      (
        state: Draft<IdentityState>,
        action: Action<'identities/setListMode'> & {
          payload: { listMode: boolean }
        }
      ) => {
        state.listMode = action.payload.listMode
      }
    )
    .addCase(
      'identities/getIdentities',
      (
        state: Draft<IdentityState>,
        action: Action<'identities/getIdentities'> & {
          payload: { identities: Identity[] }
        }
      ) => {
        state.identities = [...state.identities, ...action.payload.identities]
      }
    )
    .addCase(
      'identities/removeIdentity',
      (
        state: Draft<IdentityState>,
        action: Action<'identities/removeIdentity'> & { payload: string }
      ) => {
        state.identities = state.identities.filter(
          (m) => m.id !== action.payload
        )
      }
    )
})

export default identitiesReducer
