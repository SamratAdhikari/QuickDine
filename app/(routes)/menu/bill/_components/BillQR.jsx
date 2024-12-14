import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@mui/material"; // Assuming you have this context for handling the bill or order
import { Rupee } from "@/app/constants/Symbols.jsx"; // Assuming you have the Rupee symbol

const BillQR = ({ open, onClose, billData }) => {
    const { totalAmount, qrImageUrl } = billData; // Assume billData contains totalAmount and qrImageUrl

    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 w-[100vw] h-[100vh]" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg w-[90%] sm:w-[400px]">
                    <div className="text-center p-4">
                        {/* Title for accessibility */}
                        <Dialog.Title className="sr-only">
                            Scan to Pay
                        </Dialog.Title>

                        <h2 className="text-xl font-semibold mb-4">
                            Scan to Pay
                        </h2>

                        {/* Displaying total amount with Rupee symbol */}
                        <p className="text-lg font-semibold text-gray-600 mb-6">
                            Total Amount: {Rupee} {totalAmount}
                        </p>

                        {/* QR Code Image */}
                        <img
                            src={
                                "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                            } // Use provided QR code URL or default one
                            alt="QR Code for Payment"
                            className="mx-auto mb-6"
                            style={{ width: "200px", height: "200px" }}
                        />

                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={onClose}
                                variant="contained"
                                className="px-8 font-semibold py-2 bg-blue-950 border border-blue-400 hover:bg-blue-900 rounded-xl"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default BillQR;
