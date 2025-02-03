import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for token on component mount and token changes
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            // Decode the JWT to get user info
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUserInfo({
                    email: payload.email,
                    role: payload.role,
                    userId: payload.userId,
                    name: payload.name
                });
            } catch (error) {
                console.error('Error decoding token:', error);
                handleLogout();
            }
        } else {
            setIsLoggedIn(false);
            setUserInfo(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserInfo(null);
        navigate('/login');
    };

    return (
        <nav className="bg-[#114B5F]">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex shrink-0 items-center">
                            <Link to="/">
                                <h1 className='text-center text-2xl font-bold tracking-tight text-[#E4FDE1]'>KONSULT</h1>
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            {isLoggedIn && userInfo ? (
                                <>
                                    <button className="relative rounded-full bg-[#0D3A4A] p-1 text-[#E4FDE1] hover:text-white focus:ring-2 focus:ring-white">
                                        <BellIcon aria-hidden="true" className="size-6" />
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <span className="text-[#E4FDE1] font-medium">
                                            {userInfo.name} {/* Display name here */}
                                            {console.log(userInfo)}
                                        </span>
                                        <span className="text-[#E4FDE1] text-sm px-2 py-1 bg-[#0D3A4A] rounded-full">
                                            {userInfo.role}
                                        </span>
                                    </div>

                                    <Menu as="div" className="relative">
                                        <div>
                                            <MenuButton className="relative flex rounded-full bg-[#114B5F] text-sm focus:ring-2 focus:ring-white">
                                                <img
                                                    alt="User"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    className="size-8 rounded-full"
                                                />
                                            </MenuButton>
                                        </div>
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                                            <MenuItem>
                                                {({ active }) => (
                                                    <Link
                                                        to="/profile"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ active }) => (
                                                    <Link
                                                        to="/settings"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Settings
                                                    </Link>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleLogout}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Logout
                                                    </button>
                                                )}
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                </>
                            ) : (
                                <div className="flex gap-2">
                                    <Link to="/login">
                                        <button className="bg-[#E4FDE1] text-[#114B5F] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#C2E0C6]">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/signup">
                                        <button className="bg-[#E4FDE1] text-[#114B5F] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#C2E0C6]">
                                            Signup
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}