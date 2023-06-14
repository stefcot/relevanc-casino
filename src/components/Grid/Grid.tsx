import React, { FC } from 'react'
import { Identity } from '@Redux/identities/types'
import IdentityCard from '@Components/Cards/IdentityCard'

export type GridProps = {
  identities: Identity[]
}

const Grid: FC<GridProps> = ({ identities }) => (
  <div>
    {identities.map((identity) => (
      <IdentityCard key={identity.id} identity={identity} />
    ))}
  </div>
)

export default Grid
