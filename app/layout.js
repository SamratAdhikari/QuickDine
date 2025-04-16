import "@radix-ui/themes/styles.css";
import Head from "next/head";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { OrderProvider } from "./context/OrderContext";
import { UserProvider } from "./context/UserContext";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "QuickDine",
    description: "Say no to food Queues!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning data-theme="cupcake">
            <head>
                {/* Set the favicon in the head */}
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    {/* You can also add other meta tags here */}
                </Head>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Theme>
                    <UserProvider>
                        <OrderProvider>{children}</OrderProvider>
                    </UserProvider>
                </Theme>
            </body>
        </html>
    );
}
