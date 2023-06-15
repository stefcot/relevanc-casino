import React, { FC } from 'react'

import IdentityCard from '@Components/IdentityCard'
import { useIdentitiesContext } from '@Components/IdentitiesProvider/IdentitiesProvider'
import { useAppSelector } from '@Redux/hooks'
import { getListMode } from '@Redux/identities/selectors'
import clsx from 'clsx'

const Identities: FC = () => {
  const identities = useIdentitiesContext()
  const listMode = useAppSelector(getListMode)

  return (
    <div
      className={clsx(
        'flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px] w-full',
        { '!flex !flex-col': listMode }
      )}
    >
      {identities.map((identity) => (
        <IdentityCard
          key={identity.id}
          identity={identity}
          listMode={listMode}
        />
      ))}
    </div>
  )
}

export default Identities
