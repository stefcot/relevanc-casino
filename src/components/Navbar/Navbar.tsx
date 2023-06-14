import { FC, PropsWithChildren } from 'react'
import clsx from 'clsx'

const Navbar: FC<PropsWithChildren> = ({ children }) => (
  <nav
    className={clsx(
      'flex w-full flex-col space-y-2 md:flex-row md:space-y-0 items-center mb-6 md:mb-12'
    )}
  >
    {children}
  </nav>
)

export default Navbar
