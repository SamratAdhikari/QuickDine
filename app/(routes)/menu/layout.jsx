"use client";

import MenuHeader from "./_components/MenuHeader";
import SideNav from "./_components/SideNav";

const MenuLayout = ({ children }) => {
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
