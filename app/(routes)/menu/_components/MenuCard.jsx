import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Rupee } from "@/app/constants/Symbols.jsx";
import CardDialog from "./CardDialog"; // Import CardDialog

const MenuCard = ({ item }) => {
    const { name, price, description, url } = item;

    // State to control dialog visibility
    const [openDialog, setOpenDialog] = useState(false);

    // Function to handle dialog open
    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    // Function to handle dialog close
    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <>
            {/* Card that opens the dialog on click */}
            <div
                className="cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                onClick={handleDialogOpen}
            >
                <Card
                    className="shadow-lg"
                    sx={{
                        width: 350, // Fixed width
                        height: 400, // Fixed height
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <CardMedia
                        component="img"
                        image={url || "https://via.placeholder.com/150"}
                        alt={name}
                        sx={{
                            height: 250,
                            width: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <CardContent sx={{ padding: 2 }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ fontWeight: "bold" }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className="font-semibold text-sm"
                        >
                            {description || "No description available."}
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            sx={{ mt: 2 }}
                            className="font-semibold text-gray-500"
                        >
                            <span>{Rupee}</span>
                            {price}
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            {/* Render the CardDialog with item details */}
            <CardDialog
                open={openDialog}
                onClose={handleDialogClose}
                item={item}
            />
        </>
    );
};

export default MenuCard;
