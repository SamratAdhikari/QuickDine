import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, CardContent, CardMedia, Typography } from "@mui/material";
import { Rupee } from "@/app/constants/Symbols.jsx"; // Assuming you already have the Rupee symbol
import { Minus, Plus } from "lucide-react";
import { useOrder } from "@/app/context/OrderContext";

const CardDialog = ({ open, onClose, item }) => {
    const [quantity, setQuantity] = useState(1); // Initial quantity is 1
    const { _id, name, description, price, url } = item; // Use _id instead of id

    const { addItemToOrder } = useOrder();

    // Handle quantity increase
    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    // Handle quantity decrease
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    // Calculate total price based on quantity
    const totalPrice = price * quantity;

    // Handle adding item to order
    const handleAddToOrder = () => {
        addItemToOrder(item, quantity); // Pass item and quantity to context
        onClose(); // Close dialog after adding item
    };

    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 w-[100vw] h-[100vh]" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg w-[90%] sm:w-[400px] ">
                    <CardMedia
                        component="img"
                        image={url}
                        alt={name}
                        sx={{ height: 250, width: "100%", objectFit: "cover" }}
                        className="rounded-t-xl"
                    />
                    <Dialog.Title className="text-xl font-semibold mt-4 ml-2">
                        {name}
                    </Dialog.Title>
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className="-mt-2 -ml-2 text-sm font-semibold"
                        >
                            {description || "No description available."}
                        </Typography>

                        <div className="mt-4 flex justify-between items-center">
                            <Typography
                                variant="h6"
                                color="text.primary"
                                sx={{ fontWeight: "bold" }}
                                className="text-gray-600"
                            >
                                {Rupee} {totalPrice}
                            </Typography>

                            <div className="flex justify-between items-center mt-2">
                                <div>
                                    <Button
                                        onClick={decreaseQuantity}
                                        variant="outlined"
                                        className="rounded-full px-2 font-semibold"
                                        sx={{ marginRight: 2 }}
                                    >
                                        <Minus className="w-5 font-semibold" />
                                    </Button>
                                    <span className="text-lg font-semibold text-gray-600">
                                        {quantity}
                                    </span>
                                    <Button
                                        onClick={increaseQuantity}
                                        variant="outlined"
                                        sx={{ marginLeft: 2 }}
                                        className="rounded-full px-2 font-semibold"
                                    >
                                        <Plus className="w-5 font-semibold" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between">
                            <Button
                                onClick={handleAddToOrder}
                                variant="contained"
                                className="px-8 font-semibold font-base py-2 bg-green-800 border border-green-400 hover:bg-green-700 rounded-xl"
                            >
                                Add
                            </Button>
                            <Button
                                onClick={onClose}
                                variant="contained"
                                className="px-6 font-semibold font-base py-2 bg-blue-950 border border-blue-400 hover:bg-blue-900 rounded-xl"
                            >
                                Close
                            </Button>
                        </div>
                    </CardContent>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default CardDialog;
