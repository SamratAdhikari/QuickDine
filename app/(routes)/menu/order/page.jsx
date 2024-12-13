"use client";

import React from "react";
import { useOrder } from "@/app/context/OrderContext"; // Use order context
import { Button, Typography } from "@mui/material";
import { Rupee } from "@/app/constants/Symbols";
import { Trash } from "lucide-react";

const Order = () => {
    const {
        order,
        removeItemFromOrder,
        updateItemQuantity,
        calculateTotalPrice,
    } = useOrder();

    const handleRemoveItem = (id) => {
        removeItemFromOrder(id);
    };

    const handleChangeQuantity = (id, quantity) => {
        if (quantity > 0) {
            updateItemQuantity(id, quantity);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Typography variant="h4" sx={{ mb: 4 }} className="text-center">
                Your Orders
            </Typography>
            {order.length === 0 ? (
                <Typography>No items in your order List yet.</Typography>
            ) : (
                <div className="p-6 w-full sm:w-[95%] md:w-[60%] flex flex-col gap-4 rounded-lg shadow-lg">
                    {order.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center w-full mb-4"
                        >
                            <div className="flex-1">
                                <Typography variant="h6">
                                    {item.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {Rupee}
                                    {item.price} x {item.quantity} = {Rupee}
                                    {item.totalPrice}
                                </Typography>
                            </div>

                            <div className="flex space-x-4 items-center">
                                {/* Decrement Button */}
                                <Button
                                    onClick={() =>
                                        handleChangeQuantity(
                                            item._id, // Using item._id to match
                                            item.quantity - 1
                                        )
                                    }
                                    variant="outlined"
                                    disabled={item.quantity <= 1} // Disable minus button when quantity is 1
                                >
                                    -
                                </Button>

                                {/* Quantity Display */}
                                <Typography
                                    variant="body1"
                                    sx={{ alignSelf: "center" }}
                                >
                                    {item.quantity}
                                </Typography>

                                {/* Increment Button */}
                                <Button
                                    onClick={() =>
                                        handleChangeQuantity(
                                            item._id, // Consistent use of item._id
                                            item.quantity + 1
                                        )
                                    }
                                    variant="outlined"
                                >
                                    +
                                </Button>

                                {/* Remove Button */}
                                <Button
                                    onClick={() => handleRemoveItem(item._id)} // Using item._id here as well
                                    color="error"
                                    variant="outlined"
                                >
                                    <Trash />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Total Price */}
                    <div className="mt-4 w-full">
                        <Typography variant="h6" className="font-semibold">
                            Total: {Rupee}
                            {calculateTotalPrice()}
                        </Typography>
                        {/* Place Order Button */}
                        <Button
                            variant="contained"
                            className="bg-blue-950 font-semibold py-2 rounded-xl"
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            Place Order
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;
