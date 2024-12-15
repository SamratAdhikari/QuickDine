"use client";

import ChatBot from "./_components/ChatBot/ChatBot";
import MenuHeader from "./_components/MenuHeader";
import SideNav from "./_components/SideNav";

const MenuLayout = ({ children }) => {
    return (
        <div>
            <div className="fixed md:w-64 hidden md:block lg:block">
                <SideNav />
            </div>
            <div className="md:ml-64 md:block lg:block">
                <MenuHeader className="h-32 bg-red-500 z-10" />
                {children}
            </div>
        </div>
    );
};

export default MenuLayout;
