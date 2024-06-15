"use client";
import { editProductAction } from "@/app/actions";
import { Prod, ProductFromVercel } from "@/app/interface";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Modal } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";

interface EditProduct {
  product: ProductFromVercel;
}

interface User {
  role: string[]; // Define role as an array of strings
  [key: string]: any; // To include other properties that might exist on the user object
}

export default function EditProduct({ product }: EditProduct) {
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
  const [loading, setLoading] = useState<boolean>(false);
  const [imageGallery, setImageGallery] = useState<
    { id: number; image_url: string; name: string }[]
  >(product?.image_gallery || []);

  console.log(product?.image_gallery);

  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { user } = useUser() as unknown as { user: User };

  const id = product.id;
  useEffect(() => {
    setImageGallery(product?.image_gallery || []);
  }, [product?.image_gallery]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isAdmin = user?.role.includes("admin");

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
      imageGallery,
    };

    try {
      await editProductAction(productData);
    } catch (error) {
      console.error("Error editing product:", error);
    }
    handleClose();
    router.refresh();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      throw new Error("No file selected");
    }

    const files = Array.from(e.target.files);
    const newImageUrls: { id: number; image_url: string; name: string }[] = [];
    setLoading(true);

    const startId = imageGallery.length + 1;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const response = await fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        const newBlob = await response.json();
        console.log("File uploaded successfully:", newBlob);

        newImageUrls.push({
          id: startId + i,
          image_url: newBlob.url,
          name: file.name,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setImage_url(newImageUrls[0]?.image_url || ""); // Set the first image as the main image URL
    setImageGallery((prev) => [...prev, ...newImageUrls]);
  };

  const handleDeleteImage = (id: number) => {
    setImageGallery((prev) => prev.filter((image) => image.id !== id));
  };

  return (
    <>
      {isAdmin && (
        <CiEdit
          className="cursor-pointer mr-3"
          onClick={handleOpen}
          fontSize={30}
        />
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
                multiple
              />
              {loading && <p>Uploading...</p>}
            </div>

            <div className="mb-4">
              {imageGallery.map((image) => (
                <div key={image.id} className="flex items-center mb-2">
                  <Image
                    src={image.image_url}
                    alt={image.name}
                    className="w-16 h-16 object-cover mr-2"
                    width={64}
                    height={64}
                  />
                  <span className="mr-2">{image.name}</span>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

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
