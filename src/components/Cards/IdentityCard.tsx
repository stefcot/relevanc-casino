import React, { FC } from 'react'

import type { Identity } from '@Redux/identities/types'

import { useAppDispatch, useAppSelector } from '@Redux/hooks'
import { getAllIdentities } from '@Redux/identities/selectors'
import { removeIdentities } from '@Redux/identities/actions'
import DeleteButton from '@Components/DeleteButton/DeleteButton'

export type CardProps = {
  className?: string
  identity: Identity
}

const IdentityCard: FC<CardProps> = ({ identity, className }) => {
  const identities = useAppSelector<Identity[]>(getAllIdentities)
  const dispatch = useAppDispatch()

  const handleDeleteClick = (id: string) =>
    dispatch(
      removeIdentities(identities, {
        type: 'identities/removeIdentity',
        payload: id,
      })
    )

  return (
    <div className={className}>
      <span>{identity.id}</span>
      <span>{identity.userName}</span>
      <span>{identity.birthDate}</span>
      <span>{identity.email}</span>
      <DeleteButton handleDeleteClick={handleDeleteClick} id={identity.id} />
    </div>
  )
}

export default IdentityCard
