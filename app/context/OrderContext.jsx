"use client";

import React, { createContext, useState, useContext } from "react";

// Create a context to hold the order state
const OrderContext = createContext();

export const useOrder = () => {
    return useContext(OrderContext); // Hook to access the order context
};

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState([]);

    // Function to add item to the order
    const addItemToOrder = (item, quantity) => {
        setOrder((prevOrder) => {
            // Check if the item already exists in the order (using _id)
            const existingItem = prevOrder.find((i) => i._id === item._id);

            if (existingItem) {
                // If the item exists, update its quantity and total price
                return prevOrder.map((i) =>
                    i._id === item._id
                        ? {
                              ...i,
                              quantity: i.quantity + quantity, // Add the new quantity
                              totalPrice: (i.quantity + quantity) * i.price, // Update total price
                          }
                        : i
                );
            } else {
                // If it's a new item, add it to the order with initial quantity
                return [
                    ...prevOrder,
                    { ...item, quantity, totalPrice: item.price * quantity },
                ];
            }
        });
    };

    // Function to remove item from the order
    const removeItemFromOrder = (_id) => {
        setOrder((prevOrder) => prevOrder.filter((item) => item._id !== _id));
    };

    // Function to update the quantity of an item in the order
    const updateItemQuantity = (_id, quantity) => {
        setOrder((prevOrder) =>
            prevOrder.map((item) =>
                item._id === _id
                    ? { ...item, quantity, totalPrice: item.price * quantity }
                    : item
            )
        );
    };

    // Calculate total price of the entire order
    const calculateTotalPrice = () => {
        return order.reduce((acc, item) => acc + item.totalPrice, 0);
    };

    const clearOrder = () => {
        setOrder([]);
    };

    return (
        <OrderContext.Provider
            value={{
                order,
                addItemToOrder,
                removeItemFromOrder,
                updateItemQuantity,
                calculateTotalPrice,
                clearOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
