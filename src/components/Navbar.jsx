import { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";


const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Disclosure as="nav" className="bg-[#114B5F]">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-[#E4FDE1] hover:bg-[#0D3A4A] focus:ring-2 focus:ring-white focus:ring-inset">
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Link to="/"> <h1 className='text-center text-2xl font-bold tracking-tight text-[#E4FDE1]'>KONSULT</h1> </Link>
                        </div>
                        {/* <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-[#0D3A4A] text-white' : 'text-[#E4FDE1] hover:bg-[#0D3A4A] hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div> */}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {isLoggedIn ? (
                            <>
                                <button className="relative rounded-full bg-[#0D3A4A] p-1 text-[#E4FDE1] hover:text-white focus:ring-2 focus:ring-white">
                                    <BellIcon aria-hidden="true" className="size-6" />
                                </button>
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-[#114B5F] text-sm focus:ring-2 focus:ring-white">
                                            <img alt="User" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="size-8 rounded-full" />
                                        </MenuButton>
                                    </div>
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                                        <MenuItem>
                                            {({ active }) => (
                                                <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>Your Profile</a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ active }) => (
                                                <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>Settings</a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ active }) => (
                                                <button onClick={() => setIsLoggedIn(false)} className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}>Sign out</button>
                                            )}
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </>
                        ) : (
                            <Link to="/login">
                                <button
                                    onClick={() => setIsLoggedIn(true)}
                                    className="bg-[#E4FDE1] text-[#114B5F] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#C2E0C6]"
                                >
                                    Login / Signup
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                                item.current ? 'bg-[#0D3A4A] text-white' : 'text-[#E4FDE1] hover:bg-[#0D3A4A] hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
