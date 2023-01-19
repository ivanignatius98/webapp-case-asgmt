import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function Dropdown({ children, dropdownItemData }) {
  return (
    <Menu as="div" className="relative inline-block text-left z-11">
      {({ open }) => (
        <>
          {/* {JSON.stringify(open)} */}
          <Menu.Button as={Fragment}>
            {children}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute py-1 right-0 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ">
              {dropdownItemData.map((items, groupIndex) => (
                <div className='py-2' key={groupIndex}>
                  {items.map(({ onClick, content }, i) => (
                    <Menu.Item key={i}>
                      {({ active }) => (
                        <button className={`${active ? 'bg-gray-100 dark:bg-gray-600 dark:text-white' : ''} flex w-full items-center px-2 py-3 text-sm`}
                          onClick={() => { onClick() }}
                        >
                          {typeof content == "string" ?
                            <div className='pl-3'>
                              {content}
                            </div> :
                            <>
                              <div className="pl-2 pr-4">
                                {content.icon}
                              </div>
                              {content.text}
                            </>
                          }
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu >
  )
}
