import React, { FC, useState, PropsWithChildren, useEffect } from 'react'
import clsx from 'clsx'

import {
  fetchIdentities,
  fetchIdentity,
  setListMode,
} from '@Redux/identities/actions'
import { useAppDispatch, useAppSelector } from '@Redux/hooks'

import { ReactComponent as SunIcon } from '@Svg/sun.svg'
import { ReactComponent as MoonIcon } from '@Svg/moon.svg'

import Switch from '@Components/Switch'
import Navbar from '@Components/Navbar'
import Button from '@Components/Button'

import { getListMode, getPendingFetches } from '@Redux/identities/selectors'

import SortDropdown from '@Components/SortDropdown'

import IdentitiesProvider from '@Components/IdentitiesProvider'
import useIdentities from '@Hooks/useIdentities'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()
  const listMode = useAppSelector<boolean>(getListMode)
  const pendingFetches = useAppSelector<string[]>(getPendingFetches)
  const [darkMode, setDarkMode] = useState(true)
  const [sortMode, setSortMode] = useState<string | undefined>(undefined)
  const identities = useIdentities(sortMode)

  const onMenuItemClick = (id: string) => {
    setSortMode(id)
  }

  useEffect(() => {
    setDarkMode(localStorage.getItem('casino:dark-mode') === 'true')
  }, [darkMode])

  const toggleDarkMode = () => {
    localStorage.setItem('casino:dark-mode', (!darkMode).toString())
    setDarkMode(localStorage.getItem('casino:dark-mode') === 'true')
  }

  const onToggleListMode = () => {
    dispatch(setListMode(!listMode))
  }

  return (
    <div
      className={clsx({
        dark: darkMode,
        light: !darkMode,
      })}
    >
      <div className="absolute h-screen w-screen overflow-scroll bg-gradient-to-t from-orange-200 to-orange-100 dark:bg-gradient-to-t dark:from-sky-900 dark:to-sky-800 sans">
        <main className="bg-white dark:bg-slate-800 bg-white flex flex-col items-start min-h-screen px-10 py-6 sm:p-14 md:p-16 lg:p-24 sm:m-10 sm:mb-0 sm:rounded-tl-[32px] sm:rounded-tr-[32px] sm:!rounded-bl-0 sm:!rounded-br-0">
          <Navbar className="!flex-col-reverse md:!flex-row">
            <div className="flex space-x-2 mr-auto">
              <Button
                disabled={pendingFetches.includes('addingOneItem')}
                loading={pendingFetches.includes('addingOneItem')}
                onClick={() => {
                  dispatch(fetchIdentity())
                }}
              >
                Add Identity
              </Button>
              <Button
                disabled={pendingFetches.includes('addingFiveItem')}
                loading={pendingFetches.includes('addingFiveItem')}
                onClick={() => {
                  dispatch(fetchIdentities(5)())
                }}
              >
                Add 5 Identities
              </Button>
            </div>
            <div className="flex space-x-3 justify-between md:justify-normal mr-auto md:mr-0 w-full md:w-auto pb-5 !mb-5 border border-b-slate-200 dark:border-b-slate-600 border-t-0 border-x-0 md:pb-0 md:!mb-0 md:border-0 md:border-b-0">
              <SortDropdown onChange={onMenuItemClick} />
              <div className="flex space-x-3 ml-auto">
                <Switch
                  label={{ on: 'List', off: 'Grid' }}
                  on={listMode}
                  onClick={onToggleListMode}
                  thumbColorOff="bg-blue-400"
                  thumbColorOn="bg-slate-500"
                />
                <Switch
                  on={darkMode}
                  onClick={toggleDarkMode}
                  iconOff={SunIcon}
                  iconOn={MoonIcon}
                  thumbColorOff="!bg-blue-400"
                  thumbColorOn="dark:!bg-slate-600"
                />
              </div>
            </div>
          </Navbar>
          <IdentitiesProvider identities={identities}>
            {children}
          </IdentitiesProvider>
        </main>
      </div>
    </div>
  )
}

export default Layout
