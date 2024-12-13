"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <div className="p-5 flex justify-between items-center border shadow-md bg-white">
            <div className="flex items-center">
                <Link href={"/"}>
                    <span className="text-3xl text-red-500 font-extrabold">
                        FoodHelper
                    </span>
                </Link>
            </div>

            <Link href={"/menu"}>
                <Button className="bg-red-500">Order Now</Button>
            </Link>
        </div>
    );
};

export default Header;
