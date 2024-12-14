"use client";

import { useUser } from "../../../context/UserContext";
import { LayoutGrid, ShoppingCart, ReceiptText, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SideNav = ({ param }) => {
    const pathname = usePathname(); // Get the current pathname
    const searchParams = useSearchParams(); // Get the current query parameters
    const id = searchParams.get("id"); // Extract the 'id' query parameter
    const { contextUser, setUserData } = useUser();

    useEffect(() => {
        if (param) {
            const jsonUser = JSON.parse({ param });
            if (JSON.stringify(contextUser) !== JSON.stringify(jsonUser)) {
                setUserData(jsonUser);
            }
        }
    }, [param, contextUser, setUserData]);

    const menuData = [
        {
            id: 1,
            name: "Menu",
            icon: LayoutGrid,
            path: `/menu/?id=675cdd072d28ff5599733aa2`,
        },
        {
            id: 2,
            name: "Order",
            icon: ShoppingCart,
            path: "/menu/order",
        },
        {
            id: 3,
            name: "Bill",
            icon: ReceiptText,
            path: "/menu/bill",
        },
    ];

    return (
        <div className="h-screen p-5 shadow-md border w-full">
            <div className="flex items-center">
                <Link href={"/"}>
                    <span className="text-3xl text-blue-950 font-extrabold">
                        QuickDine
                    </span>
                </Link>
            </div>
            <div className="mt-16">
                {menuData.map((menu) => {
                    // Check if the current pathname and query parameter match the menu path exactly
                    const isActive =
                        pathname === menu.path ||
                        (pathname === "/menu" &&
                            menu.path === `/menu/?id=${id}`);

                    return (
                        <Link href={menu.path} key={menu.id}>
                            <h2
                                className={`flex gap-2 items-center text-gray-500 font-semibold p-5 mb-2 cursor-pointer rounded-xl hover:text-primary hover:bg-blue-100 
                            ${isActive ? "text-primary bg-blue-100" : ""}`}
                            >
                                <menu.icon />
                                {menu.name}
                            </h2>
                        </Link>
                    );
                })}
            </div>

            <div className="fixed bottom-10 flex gap-2 justify-center ml-10 items-center font-semibold bg-gray-200 rounded-xl py-2 px-4 ">
                <span className="w-8 h-8 rounded-full bg-slate-300 flex justify-center items-center">
                    <User className="w-7 h-7" />
                </span>
                <h1>{contextUser?.primary_id ?? "Table 01"}</h1>
            </div>
        </div>
    );
};

export default SideNav;
