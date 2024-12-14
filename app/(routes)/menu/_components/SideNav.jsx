"use client";

import { useUser } from "../../../context/UserContext";
import { LayoutGrid, ShoppingCart, ReceiptText, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SideNav = ({ user }) => {
  const path = usePathname();
  const { contextUser, setUserData } = useUser();

  // UseEffect to synchronize user data
  useEffect(() => {
    if (user) {
      const jsonUser = JSON.parse(user);
      if (JSON.stringify(contextUser) !== JSON.stringify(jsonUser)) {
        setUserData(jsonUser);
      }
    }
  }, [user, contextUser, setUserData]);

  const menuData = [
    { id: 1, name: "Menu", icon: LayoutGrid, path: "/menu" },
    { id: 2, name: "Order", icon: ShoppingCart, path: "/menu/order" },
    { id: 3, name: "Bill", icon: ReceiptText, path: "/menu/bill" },
  ];

<<<<<<< HEAD
  return (
    <div className="h-screen p-5 shadow-md border w-full hidden lg:block">
      <div className="flex items-center">
        <Link href={"/"}>
          <span className="text-3xl text-blue-950 font-extrabold">
            QuickDine
          </span>
        </Link>
      </div>
      <div className="mt-16">
        {menuData.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-semibold p-5 mb-2 cursor-pointer rounded-xl hover:text-primary hover:bg-blue-100 
                ${path === menu.path ? "text-primary bg-blue-100" : ""}`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 flex gap-2 justify-center ml-10 items-center font-semibold bg-gray-200 rounded-xl py-2 px-4 ">
        <span className="w-8 h-8 rounded-full bg-slate-300 flex justify-center items-center">
          <User className="w-7 h-7" />
        </span>
        <h1>{contextUser.primary_id}</h1>
      </div>
    </div>
  );
=======
    const menuData = [
        {
            id: 1,
            name: "Menu",
            icon: LayoutGrid,
            path: "/menu",
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
                        FastFood
                    </span>
                </Link>
            </div>
            <div className="mt-16">
                {menuData.map((menu, index) => (
                    <Link href={menu.path} key={menu.id}>
                        <h2
                            className={`flex gap-2 items-center text-gray-500 font-semibold p-5 mb-2 cursor-pointer rounded-xl hover:text-primary hover:bg-blue-100 
                        ${path == menu.path && "text-primary bg-blue-100"}`}
                        >
                            <menu.icon />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>

            <div className="fixed bottom-10 flex gap-2 justify-center ml-10 items-center font-semibold bg-gray-200 rounded-xl py-2 px-4 ">
                <span className="w-8 h-8 rounded-full bg-slate-300 flex justify-center items-center">
                    <User className="w-7 h-7" />
                </span>
                <h1>{contextUser?.primary_id ?? "Default"}</h1>
            </div>
        </div>
    );
>>>>>>> 86beb7b07154017184556a99da1c5226c9608c2c
};

export default SideNav;
