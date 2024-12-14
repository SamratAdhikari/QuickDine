"use client";

import MenuHeader from "./_components/MenuHeader";
import SideNav from "./_components/SideNav";
import { useSearchParams } from "next/navigation";

const MenuLayout = ({ children }) => {
    //   const searchParams = useSearchParams();
    //   const value = searchParams.get("user");
    // //   console.log("value:", value);

    return (
        <div>
            <div className="fixed md:w-64 hidden md:block">
                <SideNav />
            </div>
            <div className="md:ml-64">
                <MenuHeader />
                {children}
            </div>
        </div>
    );
};

export default MenuLayout;
