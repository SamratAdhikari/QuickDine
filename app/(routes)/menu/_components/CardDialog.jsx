import React, { useState } from "react";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Button,
  CardContent,
  CardMedia,
  Typography,
  TextField,
} from "@mui/material";
import { Rupee } from "@/app/constants/Symbols.jsx"; // Assuming you already have the Rupee symbol
import { Minus, Plus } from "lucide-react";
import { useOrder } from "@/app/context/OrderContext";

const CardDialog = ({ open, onClose, item }) => {
  const [quantity, setQuantity] = useState(1); // Initial quantity is 1
  const [isEditing, setIsEditing] = useState(false); // State to track if we are in edit mode
  const [editedItem, setEditedItem] = useState(item); // To track the edited item

  const { _id, name, description, price, url } = item; // Use _id instead of id

  const { addItemToOrder, updateItemInOrder } = useOrder(); // Assuming updateItemInOrder is a function in context

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

  // Handle Edit button click
  const handleEditAnItem = () => {
    setIsEditing(true); // Enable edit mode
  };

  //   // Handle form submission for editing
  //   const handleSaveDelete = async () => {
  //     try {
  //       // Example of local state update in order context
  //       //   updateItemInOrder(editedItem); // Update the edited item in the order context
  //       const response = await fetch(`/api/item/${item._id}`, {
  //         method: "DELETE", // Use PUT if updating an existing item
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         // body: JSON.stringify(editedItem),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to update item");
  //       }

  //       //   const updatedItem = await response.json();
  //       //   console.log("Item deleted:", updatedItem);

  //       setIsEditing(false); // Exit edit mode
  //     } catch (error) {
  //       console.error("Error deleting item:", error);
  //     }
  //   };

  // Handle input change for edited fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 w-[100vw] h-[100vh]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg w-[90%] sm:w-[400px]">
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
            {!isEditing ? (
              // Show regular details when not editing
              <>
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
              </>
            ) : (
              // Edit form
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={editedItem.name}
                  onChange={handleInputChange}
                  fullWidth
                  className="mt-2"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={editedItem.description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                  className="mt-2"
                />
                <TextField
                  label="Price"
                  name="price"
                  value={editedItem.price}
                  onChange={handleInputChange}
                  fullWidth
                  className="mt-2"
                />
                <TextField
                  label="URL"
                  name="url"
                  value={editedItem.url}
                  onChange={handleInputChange}
                  fullWidth
                  className="mt-2"
                />
              </>
            )}

            <div className="mt-6 flex justify-between">
              {!isEditing ? (
                <>
                  <Button
                    onClick={handleAddToOrder}
                    variant="contained"
                    className="px-8 font-semibold font-base py-2 bg-green-800 border border-green-400 hover:bg-green-700 rounded-xl"
                  >
                    Add
                  </Button>
                </>
              ) : (
                <>
                  <Link href={`/api/item/${_id}`}>
                    <Button
                      onClick={handleSaveEdit}
                      variant="contained"
                      className="px-8 font-semibold font-base py-2 bg-blue-800 border border-blue-400 hover:bg-blue-700 rounded-xl"
                    >
                      Save
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setIsEditing(false)} // Exit edit mode without saving
                    variant="outlined"
                    className="px-8 font-semibold font-base py-2 border border-gray-400 hover:bg-gray-200 rounded-xl"
                  >
                    Cancel
                  </Button>
                </>
              )}

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
