import React, { FC } from 'react'
import clsx from 'clsx'
import { format } from 'date-fns'

import type { Identity } from '@Redux/identities/types'

import { useAppDispatch } from '@Redux/hooks'
import { removeIdentity } from '@Redux/identities/actions'

import DeleteButton from '@Components/DeleteButton'
import { useIdentitiesContext } from '@Components/IdentitiesProvider/IdentitiesProvider'

export type CardProps = {
  className?: string
  identity: Identity
}

const IdentityCard: FC<CardProps> = ({ identity, className }) => {
  const identities = useIdentitiesContext()
  const dispatch = useAppDispatch()

  const handleDeleteClick = (id: string) =>
    dispatch(
      removeIdentity(identities, {
        type: 'identities/removeIdentity',
        payload: id,
      })
    )

  return (
    <div
      className={clsx('rounded-lg p-4 flex flex-col', className)}
      style={{ backgroundColor: `#${identity.color}` }}
    >
      <h3 className="font-medium text-xl text-white truncate">
        {identity.username}
      </h3>
      <span className="text-sm text-white truncate">
        {format(new Date(identity.birthdate), 'yyyy/MM/dd')}
      </span>
      <span className="text-sm text-white mb-2 truncate">{identity.email}</span>
      <footer className="flex justify-end">
        <DeleteButton
          className="!p-2 !rounded-md !md:h-auto !bg-white"
          handleDeleteClick={handleDeleteClick}
          id={identity.id}
        />
      </footer>
    </div>
  )
}

export default IdentityCard
