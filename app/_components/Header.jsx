"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <div className="p-5 flex justify-between items-center border shadow-md bg-white">
            <div className="flex items-center">
                <Link href={"/"}>
                    <span className="text-3xl text-blue-950 font-extrabold flex justify-center items-center">
                        FastFood
                    </span>
                </Link>
            </div>

            <Link href={"/menu"}>
                <Button
                    variant="outlined"
                    className="hover:bg-blue-950 py-2 text-white font-normal bg-primary capitalize px-6"
                >
                    Order Now
                </Button>
            </Link>
        </div>
    );
};

export default Header;
