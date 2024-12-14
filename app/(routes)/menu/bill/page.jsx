"use client";

import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent, Skeleton } from "@mui/material"; // Add Skeleton import
import { Rupee } from "@/app/constants/Symbols";

const Bill = () => {
    const [bill, setBill] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const tableName = "Table01"; // Specify your table here

    const fetchBill = async () => {
        try {
            const response = await fetch(`/api/order`);
            const data = await response.json();

            console.log("Fetched Orders:", data);

            if (response.ok) {
                // Filter orders for the specific table (Table01)
                const tableOrders = data.filter(
                    (order) => order.table === tableName
                );

                console.log("Filtered Orders for Table01:", tableOrders);

                if (tableOrders.length === 0) {
                    setError(`No bill found for the table: ${tableName}`);
                } else {
                    setBill(tableOrders); // Set the filtered orders
                }
            } else {
                setError(data.error || "Failed to fetch bill.");
            }
        } catch (error) {
            setError("An error occurred while fetching the bill.");
            console.error("Error in fetchBill:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBill();
    }, []);

    if (loading) {
        // Show skeleton loading indicator while loading the bill
        return (
            <div className="flex flex-col items-center w-full justify-center mt-4">
                <Typography variant="h4" sx={{ mb: 4 }} className="text-center">
                    Bill for {tableName}
                </Typography>
                {/* Skeleton for the bill items */}
                {[...Array(3)].map((_, idx) => (
                    <Skeleton
                        key={idx}
                        variant="rectangular"
                        width="60%"
                        height={150}
                        sx={{ mb: 2 }}
                    />
                ))}
                <Skeleton
                    variant="rectangular"
                    width="60%"
                    height={50}
                    sx={{ mb: 2 }}
                />
            </div>
        );
    }

    // Calculate overall total
    const overallTotal = bill.reduce((total, tableOrder) => {
        if (Array.isArray(tableOrder.items) && tableOrder.items.length > 0) {
            return (
                total +
                tableOrder.items.reduce((orderTotal, item) => {
                    if (item?.item?.price && item.quantity) {
                        return orderTotal + item.item.price * item.quantity;
                    }
                    return orderTotal; // Skip if invalid item
                }, 0)
            );
        }
        return total; // Return the total as is if there are no items in this order
    }, 0);

    return (
        <div className="flex flex-col items-center justify-center mt-4">
            {bill.length > 0 ? (
                <>
                    <Typography
                        variant="h4"
                        sx={{ mb: 4 }}
                        className="text-center"
                    >
                        Bill for {tableName}
                    </Typography>

                    {/* Render bill cards */}
                    {bill.map((tableOrder, index) => (
                        <Card
                            key={index}
                            className="p-4 w-full sm:w-[95%] md:w-[60%] shadow-lg mb-4"
                        >
                            <CardContent>
                                <Typography
                                    sx={{ mb: 2 }}
                                    className="text-gray-500 text-base"
                                >
                                    Order {index + 1}:
                                </Typography>
                                {/* Map through each item and render */}
                                {Array.isArray(tableOrder.items) &&
                                tableOrder.items.length > 0 ? (
                                    tableOrder.items.map((item, itemIndex) => (
                                        <div
                                            key={itemIndex}
                                            className="flex justify-between"
                                        >
                                            {/* Conditional rendering for item details */}
                                            <Typography className="text-gray-800 text-lg">
                                                {item?.item?.name ||
                                                    "Unknown Item"}{" "}
                                                x {item.quantity}
                                            </Typography>
                                            <Typography>
                                                {Rupee}
                                                {item?.item?.price &&
                                                item.quantity
                                                    ? item.item.price *
                                                      item.quantity
                                                    : 0}
                                            </Typography>
                                        </div>
                                    ))
                                ) : (
                                    <Typography>
                                        No items in this order.
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    {/* Overall total at the bottom */}
                    <Typography
                        variant="h6"
                        sx={{ mt: 4, fontWeight: "bold" }}
                        className="flex justify-between w-full sm:w-[95%] md:w-[60%] shadow-lg p-4"
                    >
                        <span>Total:</span>
                        <span>
                            {Rupee}
                            {overallTotal}
                        </span>
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        className="mt-4 w-full sm:w-[95%] md:w-[60%] mb-4 bg-blue-950 py-2"
                        onClick={() => console.log("Proceed to payment")}
                    >
                        Proceed to Payment
                    </Button>
                </>
            ) : (
                <div className="flex flex-col font-normal text-xl">
                    No bills available for {tableName}.
                </div>
            )}
        </div>
    );
};

export default Bill;
