import { Action, createReducer, Draft } from '@reduxjs/toolkit'
import { fetchIdentities } from '@Redux/identities/actions'
import type { Identity, IdentityState } from '@Redux/identities/types'

const initialState: IdentityState = {
  list: [],
  status: 'loading',
}

const identitiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchIdentities.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchIdentities.fulfilled, (state: Draft<IdentityState>) => {
      state.status = 'success'
    })
    .addCase(fetchIdentities.rejected, (state: Draft<IdentityState>) => {
      state.status = 'failed'
    })
    .addCase(
      'identities/getIdentities',
      (
        state: Draft<IdentityState>,
        action: Action<'identities/getIdentities'> & {
          payload: { list: Identity[] }
        }
      ) => {
        state.list = [...state.list, ...action.payload.list]
      }
    )
    .addCase(
      'identities/removeIdentity',
      (
        state: Draft<IdentityState>,
        action: Action<'identities/removeIdentity'> & { payload: string }
      ) => {
        state.list = state.list.filter((m) => m.id !== action.payload)
      }
    )
})

export default identitiesReducer
