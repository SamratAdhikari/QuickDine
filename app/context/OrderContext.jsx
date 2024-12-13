"use client";

import React, { createContext, useState, useContext } from "react";

// Create a context to hold the order state
const OrderContext = createContext();

export const useOrder = () => {
    return useContext(OrderContext); // Hook to access the order context
};

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState([]); // Store the order items

    // Add item to the order list
    const addItemToOrder = (item) => {
        setOrder((prevOrder) => {
            const existingItem = prevOrder.find((i) => i.id === item.id);
            if (existingItem) {
                // If the item already exists, update the quantity and totalPrice
                return prevOrder.map((i) =>
                    i.id === item.id
                        ? {
                              ...i,
                              quantity: i.quantity + 1,
                              totalPrice: (i.quantity + 1) * i.price,
                          }
                        : i
                );
            } else {
                // If it's a new item, add it to the order list
                return [
                    ...prevOrder,
                    { ...item, quantity: 1, totalPrice: item.price },
                ];
            }
        });
    };

    // Remove item from the order list
    const removeItemFromOrder = (id) => {
        setOrder((prevOrder) => prevOrder.filter((item) => item.id !== id));
    };

    // Update item quantity in the order
    const updateItemQuantity = (id, quantity) => {
        setOrder((prevOrder) =>
            prevOrder.map((item) =>
                item.id === id
                    ? { ...item, quantity, totalPrice: item.price * quantity }
                    : item
            )
        );
    };

    // Calculate total price for the entire order
    const calculateTotalPrice = () => {
        return order.reduce((acc, item) => acc + item.totalPrice, 0);
    };

    return (
        <OrderContext.Provider
            value={{
                order,
                addItemToOrder,
                removeItemFromOrder,
                updateItemQuantity,
                calculateTotalPrice,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
