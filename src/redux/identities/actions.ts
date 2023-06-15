import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { Identity } from '@Redux/identities/types'
import axios from 'axios'

const identityFetcher = () =>
  axios.get('https://exercise-1-backend-dvdomulgfq-ew.a.run.app/user')

export const getIdentities = createAction(
  'identities/getIdentities',
  (identities: Identity[]) => ({
    payload: {
      identities,
    },
  })
)

export const setListMode = createAction(
  'identities/setListMode',
  (listMode: boolean) => ({
    payload: {
      listMode,
    },
  })
)

export const fetchIdentities = (calls: number) =>
  createAsyncThunk('identities/fetchIdentities', async (_, thunkAPI) => {
    const times = new Array(calls).fill(
      'https://exercise-1-backend-dvdomulgfq-ew.a.run.app/user'
    )

    const responses = await Promise.all(times.map((url) => axios.get(url)))

    const identities = responses.map((response) => {
      const identity = response.data
      identity.id = Math.floor(Math.random() * 100)
      return identity
    })

    thunkAPI.dispatch(getIdentities(identities))
  })

export const fetchIdentity = createAsyncThunk(
  'identities/fetchIdentity',
  async (_, thunkAPI) => {
    const response = await identityFetcher()
    const identity = response.data
    identity.id = Date.now().toString()
    thunkAPI.dispatch(getIdentities([identity]))
    return response
  }
)

export const removeIdentity = createAction(
  'identities/removeIdentity',
  (id: string) => ({
    payload: id,
  })
)
