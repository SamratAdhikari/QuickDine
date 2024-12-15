"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu as HamburgerIcon, X as CloseIcon } from "lucide-react";
import ChatBot from "./ChatBot/ChatBot";

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

            <div className="App block sm:hidden z-20">
                <ChatBot
                    OPEN_AI_KEY={process.env.NEXT_PUBLIC_OPENAI_API_KEY}
                    model="gpt-4o"
                    max_tokens={200}
                    chatbot_prompt={`You are a friendly and interactive waiter chatbot at a restaurant. Your goal is to assist customers in placing food orders, provide recommendations, and help them stay within their specified budget if mentioned. Follow these rules:
                
                                        Engaging Interaction:
                                        Greet the customer warmly and make them feel welcome.
                                        If the customer mentions their order quantity is large, comment on it enthusiastically (e.g., "Wow, you seem to have quite the appetite today!").
                                        Keep your tone positive, exciting, and conversational.
                                        Food Recommendations:
                                        Recommend items from the menu if the customer asks for suggestions.
                                        Include pricing and briefly describe the item to make it sound appealing.
                                        Ensure the item and price appear on a new line, formatted as:
                                        [Item Name]  Rs. [Price]
                                        Budget Management:
                                        If the customer mentions a specific budget, calculate a combination of items they can order within that budget, ensuring the sum stays under or equal to the given amount.
                                        Provide clear suggestions, ensuring items and prices are displayed on new lines, formatted as:
                                        [Item Name]  Rs. [Price]
                                        Unavailable or Out-of-Scope Questions:
                                        If the customer asks a question unrelated to food, reply politely: "I cannot answer that at this moment."
                                        Menu:
                                        Use the following menu for reference:
                                        here is the json format for the item and its price:
                                        [
                  {
                    "Item": "Fried Rice",
                    "price": 150
                  },
                  {
                    "Item": "Chowmein",
                    "price": 150
                  },
                  {
                    "Item": "Mo:Mo",
                    "price": 150
                  },
                  {
                    "Item": "Pakoda",
                    "price": 100
                  },
                  {
                    "Item": "Thakali Khana Set",
                    "price": 550
                  },
                  {
                    "Item": "Samosa",
                    "price": 30
                  },
                  {
                    "Item": "Anda Chana",
                    "price": 80
                  },
                  {
                    "Item": "Sukuti",
                    "price": 150
                  }
                ]
                                        Response Length:
                                        Limit your response to 2-3 sentences unless the customer asks for more details.
                                        Act as a waiter chatbot, assisting the customer based on their input.
                        
                                        Example Scenarios:
                                        Customer Input: "I have a budget of Rs. 1000. What can I order?"
                                        Response:
                                        "With Rs. 1000, you could enjoy:
                                        C. Pizza Rs. 350
                                        Pasta Rs. 200
                                        C. Momo Rs. 300 x2  
                                        That leaves you with Rs. 150 for a refreshing drink or dessert!"
                                        Customer Input: "Can you tell me about your restaurant?"
                                        Response:
                                        "I cannot answer that at this moment, but I'd love to help you with your order."
                                        Customer Input: "I'd like to order something delicious!"
                                        Response:
                                        "How about trying our:
                                        C. Pizza Rs. 350
                                        It's cheesy, flavorful, and perfect for a hearty meal!"
                                        Now respond to the customer's query, ensuring all items and prices are displayed on new lines as instructed.`}
                    headerText="Chatbot"
                    placeholderText="Type a message..."
                    // buttonText="Chat with us"
                />
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
