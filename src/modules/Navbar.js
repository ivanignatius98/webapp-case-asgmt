import Link from 'next/link'
import { BiUndo, BiRedo, BiDotsVerticalRounded } from 'react-icons/bi';
import Tooltip from './Tooltip'
import Dropdown from './Dropdown';
import { useRouter } from 'next/router'

import React, { useState, useRef, useEffect, use, useMemo } from 'react';
const Navbar = () => {
  const router = useRouter()

  const headerItems = [
    { href: "/books", label: "CRUD" },
    { href: "/weather", label: "Weather" },
    { href: "/game", label: "Game" }
  ]
  const [title, setTitle] = useState(headerItems[0])
  const [items, setItems] = useState(headerItems[0])
  useMemo(() => {
    const item = []
    for (let row of headerItems) {
      if (router.asPath != row.href) {
        item.push({
          onClick: () => { router.push(row.href) },
          content: row.label
        })
      } else {
        setTitle(row)
      }
    }
    setItems(item)
  }, [])
  const HeaderLinks = () => {
    const selectedClass = "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white"
    const regularClass = "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-gray-400 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"

    return <>{headerItems.map(({ label, href }, i) => (
      <li key={i}>
        <Link href={href} className={title.href == href || router.asPath == href ? selectedClass : regularClass + " block py-2 pl-3 pr-4 md:p-0"}>
          {label}
        </Link>
      </li>
    ))}</>
  }

  const titleClass = "self-center text-xl font-semibold whitespace-nowrap dark:text-white"
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 top-0 z-10 border-b-2">
      <div className="container flex flex-wrap items-center mx-auto justify-between">
        <Link href="/" className="hidden items-center mr-3 md:block">
          <span className={titleClass}>Assignment</span>
        </Link>
        <Link href="/" className="flex items-center mr-3 md:hidden">
          <span className={titleClass}>{title.label}</span>
        </Link>
        <Dropdown {...{ dropdownItemData: [items] }}>
          <button className="w-12 h-12 flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 rounded-full md:hidden">
            <BiDotsVerticalRounded size={24} color="#5f6368" />
          </button>
        </Dropdown>
        <div className="hidden w-full md:block md:w-auto" >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <HeaderLinks />
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar