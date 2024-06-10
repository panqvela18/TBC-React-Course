"use client";
import { editProductAction } from "@/app/actions";
import { Prod, ProductFromVercel } from "@/app/interface";
import { Modal } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface EditProduct {
  user_id: number;
  product: ProductFromVercel;
}

export default function EditProduct({ user_id, product }: EditProduct) {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(product?.title || "");
  const [description, setDescription] = useState<string>(
    product?.description || ""
  );
  const [image_url, setImage_url] = useState<string>(product?.image_url || "");
  const [price, setPrice] = useState<string>(product?.price || "");
  const [category, setCategory] = useState<string>(product?.category || "");
  const [discount, setDiscount] = useState<any>(product?.discount || 0);
  const [stock, setStock] = useState<any>(product?.stock || 0);
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const id = product.id;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData: Prod = {
      id: Number(id),
      title,
      description,
      image_url,
      price,
      category,
      discount,
      stock,
      user_id,
    };

    try {
      await editProductAction(productData);
    } catch (error) {
      // Handle error appropriately, e.g., display an error message
      console.error("Error editing product:", error);
    }
    handleClose();
    router.refresh();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      throw new Error("No file selected");
    }

    const file = e.target.files[0];

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = await response.json();
      setImage_url(newBlob.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      {user_id === undefined ? (
        ""
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleOpen}
        >
          Edit
        </button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl max-h-full overflow-y-auto">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                ref={inputFileRef}
                onChange={handleFileChange}
              />
            </div>
            {image_url && (
              <div className="mb-4">
                <Image
                  src={image_url}
                  alt="Product Image"
                  className="max-w-full h-auto"
                  width={100}
                  height={100}
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Discount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="discount"
                type="number"
                placeholder="Discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Stock
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stock"
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
