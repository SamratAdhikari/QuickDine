import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { Rupee } from "@/app/constants/Symbols.jsx"; // Assuming you already have the Rupee symbol

const CardDialog = ({ open, onClose, item }) => {
    const [quantity, setQuantity] = useState(1); // Initial quantity is 1
    const { name, description, price, url } = item;

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

    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
                    <Dialog.Title className="text-xl font-semibold">
                        {name}
                    </Dialog.Title>
                    <CardMedia
                        component="img"
                        image={url || "https://via.placeholder.com/150"}
                        alt={name}
                        sx={{ height: 250, width: "100%", objectFit: "cover" }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {description || "No description available."}
                        </Typography>

                        <div className="mt-4">
                            <Typography
                                variant="h6"
                                color="text.primary"
                                sx={{ fontWeight: "bold" }}
                            >
                                {Rupee} {totalPrice}
                            </Typography>

                            <div className="flex justify-between items-center mt-2">
                                <div>
                                    <Button
                                        onClick={decreaseQuantity}
                                        variant="outlined"
                                        sx={{ marginRight: 2 }}
                                    >
                                        -
                                    </Button>
                                    <span>{quantity}</span>
                                    <Button
                                        onClick={increaseQuantity}
                                        variant="outlined"
                                        sx={{ marginLeft: 2 }}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={onClose}
                                variant="contained"
                                color="primary"
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
