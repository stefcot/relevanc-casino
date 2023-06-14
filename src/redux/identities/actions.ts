import { createAction, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { Identity } from '@Redux/identities/types'
import axios from 'axios'

export const getIdentities = createAction(
  'identities/getIdentities',
  (identities: Identity[]) => ({
    payload: {
      list: identities,
    },
  })
)

export const fetchIdentities = createAsyncThunk(
  'identities/fetchMovies',
  async (_, thunkAPI) => {
    const response = await axios.get(
      'https://exercise-1-backend-dvdomulgfq-ew.a.run.app/user'
    )
    const identity = response.data
    identity.id = Date.now()
    thunkAPI.dispatch(getIdentities([identity]))
    return response
  }
)

export const removeIdentities = createAction(
  'identities/removeIdentity',
  (state: Identity[], action: PayloadAction<string>) => {
    const { payload } = action
    return { payload }
  }
)

export const resetIdentities = createAction(
  'identities/resetIdentities',
  (state: Identity[]) => ({
    payload: {
      ...state,
      list: state.map((m: Identity) => {
        const mutable = { ...m }
        mutable.color = true
        return mutable
      }),
    },
  })
)
