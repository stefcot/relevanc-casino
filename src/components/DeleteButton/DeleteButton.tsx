import React, { FC } from 'react'
import { ReactComponent as BinIcon } from '@Svg/bin.svg'

export type DeleteButtonProps = {
  handleDeleteClick: (id: string) => void
  id: string
}

const DeleteButton: FC<DeleteButtonProps> = ({ handleDeleteClick, id }) => (
  <button
    aria-label="Remove identity"
    onClick={() => handleDeleteClick(id)}
    type="button"
  >
    <BinIcon className="w-[32px] fill-amber-50" />
  </button>
)

export default DeleteButton
