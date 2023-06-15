import React, { FC, PropsWithChildren } from 'react'
import clsx from 'clsx'

export type ButtonProps = {
  className?: string
  inverted?: boolean
  onClick: () => void
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  inverted,
  onClick,
}) => (
  <button
    className={clsx(
      'flex items-center bg-orange-300 dark:bg-sky-900 focus:outline-none focus:shadow-outline hover:shadow-outline text-white font-medium text-[14px] md:text-[14px] h-[32px] md:h-[48px] rounded-[6px] md:rounded-[8px] px-[20px]',
      {
        '!bg-orange-300 !text-orange-200 dark:!text-sky-900 dark:!bg-white':
          inverted,
      },
      className
    )}
    onClick={onClick}
    type="button"
  >
    <span className="truncate">{children}</span>
  </button>
)

export default Button
