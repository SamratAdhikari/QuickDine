"use client";

import React from "react";
import { useOrder } from "@/app/context/OrderContext"; // Use order context
import { Button, Typography } from "@mui/material";
import { Rupee } from "@/app/constants/Symbols";

const Order = () => {
    const {
        order,
        removeItemFromOrder,
        updateItemQuantity,
        calculateTotalPrice,
    } = useOrder();

    const handleRemoveItem = (id) => {
        removeItemFromOrder(id); // Remove item from order
    };

    const handleChangeQuantity = (id, quantity) => {
        if (quantity > 0) {
            updateItemQuantity(id, quantity); // Update quantity for the item
        }
    };

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Your Order
            </Typography>
            {order.length === 0 ? (
                <Typography>No items in your order yet.</Typography>
            ) : (
                <>
                    {order.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center mb-4"
                        >
                            <div>
                                <Typography variant="h6">
                                    {item.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    ₹{item.price} x {item.quantity} = ₹
                                    {item.totalPrice}
                                </Typography>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    onClick={() =>
                                        handleChangeQuantity(
                                            item.id,
                                            item.quantity - 1
                                        )
                                    }
                                    variant="outlined"
                                    disabled={item.quantity <= 1} // Disable minus button when quantity is 1
                                >
                                    -
                                </Button>
                                <Typography
                                    variant="body1"
                                    sx={{ alignSelf: "center" }}
                                >
                                    {item.quantity}
                                </Typography>
                                <Button
                                    onClick={() =>
                                        handleChangeQuantity(
                                            item.id,
                                            item.quantity + 1
                                        )
                                    }
                                    variant="outlined"
                                >
                                    +
                                </Button>
                                <Button
                                    onClick={() => handleRemoveItem(item.id)}
                                    color="error"
                                    variant="outlined"
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4">
                        <Typography variant="h6" className="font-semibold">
                            Total: {Rupee}
                            {calculateTotalPrice()}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Place Order
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Order;
