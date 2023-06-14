import React, { FC } from 'react'

import type { Identity } from '@Redux/identities/types'

import { useAppSelector, useAppDispatch } from '@Redux/hooks'
import { getAllIdentities } from '@Redux/identities/selectors'
import { fetchIdentities } from '@Redux/identities/actions'

import Grid from '@Components/Grid/Grid'

const Identities: FC = () => {
  const identities = useAppSelector<Identity[]>(getAllIdentities)
  const dispatch = useAppDispatch()

  return (
    <div>
      <button
        onClick={() => {
          dispatch(fetchIdentities())
        }}
        type="button"
      >
        Add truc
      </button>
      <Grid identities={identities} />
    </div>
  )
}

export default Identities
