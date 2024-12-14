"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu as HamburgerIcon, X as CloseIcon } from "lucide-react";

const MenuHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuData = [
        { id: 1, name: "Menu", path: `/menu/?id=675cdd072d28ff5599733aa2` },
        { id: 2, name: "Order", path: "/menu/order" },
        { id: 3, name: "Bill", path: "/menu/bill" },
    ];

    return (
        <div className="p-5 shadow-sm border-b font-medium flex justify-between items-center relative ">
            {/* Logo - Visible only on small screens */}
            <div className="h-10">
                <Link href={"/"}>
                    <span className="text-xl font-bold lg:hidden md:hidden">
                        QuickDine
                    </span>
                </Link>
            </div>

            {/* Hamburger Icon */}
            <div>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-gray-700 lg:hidden md:hidden"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <CloseIcon className="w-6 h-6" />
                    ) : (
                        <HamburgerIcon className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Hamburger Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md z-50">
                    <div className="flex flex-col gap-4 p-4">
                        {menuData.map((menu) => (
                            <Link
                                key={menu.id}
                                href={menu.path}
                                onClick={() => setIsMenuOpen(false)} // Close menu on click
                                className="text-gray-700 hover:text-blue-600"
                            >
                                {menu.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuHeader;
