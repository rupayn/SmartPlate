"use client";
import Image from "next/image";
import React from "react";
import Img from "../../../public/images.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
    
    faTimes,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/store/auth";
import { getItems } from "@/actions/items/items";

interface MenuItem {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: "mainCourse" | "snacks";
    image: string;
    image_id: string;
    description?: string|null;
    is_veg: boolean;
}


function Page() {

    const { user } = useAuthStore();
    const [popup, setPopup] = React.useState(false);
    const [items, setItems] = React.useState<MenuItem[]>([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<MenuItem | null>(null);
    const [inItem, setInItem] = React.useState({
        name: "",
        price: "",
        stock: "",
        category: "mainCourse", // Default category
        image: "",
        description: "",
    });
    const popUpwindowHandeler = (item: MenuItem) => {
        setSelectedItem(item);
        setPopup((prev) => !prev);
    };

    const closePopup = () => {
        setPopup((prev) => !prev);
    };

    const handleDeleteItem = async (id: string) => {
        console.log(id);
    };
    const fetchItems = async () => {
        const item = await getItems();
        setItems(item??[]);
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setInItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleAddItem = async () => {
        console.log(inItem);
        setInItem({
            name: "",
            price: "",
            stock: "",
            category: "mainCourse", // Default category
            image: "",
            description: "",
        });
    };

    React.useEffect(() => {
        fetchItems();
    }, []);

    /*
    
    className=""
    
    */

    return (
        <div className="px-10">
            <div className=" mt-32 flex flex-col-reverse grid-cols-1 md:grid md:grid-cols-2">
                <div className="  flex flex-col items-center justify-center">
                    <p className="text-xl mb-8 md:mb-16">Are you Hungry?</p>
                    <p className="text-2xl md:text-6xl font-bold md:font-extrabold mb-10 md:mb-28">{`Don't wait!`}</p>
                    <div className="flex justify-center align-center">
                        <div className="flex items-center justify-center p-5 md:p-9 rounded-r-full rounded-l-full h-16 md:h-10 w-36 md:w-48 text-center bg-orange-600 mr-5 md:ml-5">
                            Order Now
                        </div>
                        <div className="flex items-center justify-center p-5 md:p-9 rounded-r-full rounded-l-full h-16 md:h-10 w-36 md:w-48 text-center bg-pink-600 md:mr-5">
                            Go to cart
                        </div>
                    </div>
                </div>
                <div className="flex items-center mb-10 justify-center">
                    <Image
                        src={Img}
                        alt="image"
                        className="w-56 h-56 md:w-96 md:h-96   rounded-full"
                    />
                </div>
            </div>

            <div>
                <h1 className=" md:mt-0 mt-10 border-y-4 md:w-36 text-center font-bold text-3xl">
                    All Items
                </h1>
                <div className="pt-10">
                    {user?.isAdmin &&
                        (isEdit ? (
                            <div className="mb-4 flex flex-col justify-center items-center p-4 border rounded-lg bg-gray-800 text-black">
                                <button
                                    className="relative mb-5 bg-red-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => setIsEdit(() => !isEdit)}
                                >
                                    close
                                </button>
                                <h3 className="text-lg md:text-3xl md:mb-5 font-semibold mb-2 text-white text-center">
                                    Add New Item
                                </h3>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={inItem.name}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={inItem.price}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                />
                                <input
                                    type="number"
                                    name="stock"
                                    placeholder="Stock"
                                    value={inItem.stock}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                />
                                <select
                                    name="category"
                                    value={inItem.category}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                >
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                                </select>
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="Image URL"
                                    value={inItem.image}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                />
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={inItem.description}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                ></textarea>
                                <button
                                    onClick={handleAddItem}
                                    className="bg-green-500 text-white px-4 w-36  py-2 rounded-md"
                                >
                                    <FontAwesomeIcon icon={faPlus} /> Add Item
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEdit(() => !isEdit)}
                                className="bg-green-500 text-white px-4 w-36  py-2 rounded-md mb-6"
                            >
                                {" "}
                                Add New Item{" "}
                            </button>
                        ))}
                    {items.map((item, i) => (
                        <div
                            className="border-2 rounded-xl mb-10 mx-5 border-green-500 w-72 h-96 flex flex-col items-center justify-around"
                            key={i}
                        >
                            <div className=" bg-blue-700">
                                <Image
                                    src={item.image}
                                    alt="image"
                                    height={1000}
                                    width={1000}
                                    className=" w-56 h-52"
                                />
                            </div>
                            <p className="text-2xl font-bold">{item.name}</p>
                            <p
                                className="text-xl font-semibold text-blue-600 cursor-pointer"
                                onClick={() => popUpwindowHandeler(item)}
                            >
                                Show More
                            </p>
                            <div className="flex items-center justify-between  w-3/4">
                                <p className="text-lg  font-semibold">
                                    ₹ {item.price}
                                </p>
                                <p
                                    className={`${item.is_veg ? "bg-green-600" : "bg-red-600"} w-5 h-5 min-h-5 min-w-5`}
                                ></p>
                                <button className="bg-orange-200 text-orange-800 border-orange-800 px-6 rounded-full border-4 py-2">
                                    +Add
                                </button>
                            </div>
                        </div>
                    ))}
                    {popup && (
                        <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg w-96 relative">
                                <button
                                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                                    onClick={closePopup}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <h2 className="text-2xl font-bold mb-2">
                                    {selectedItem?.name}
                                </h2>
                                <div className="relative w-full h-40">
                                    <Image
                                        src={selectedItem?.image as string}
                                        alt={"selectedItem.name"}
                                        height={150}
                                        width={150}
                                        objectFit="cover"
                                        className="rounded-md mx-auto"
                                    />
                                </div>
                                <p className="text-center text-gray-500 mb-2">
                                    {selectedItem?.description}
                                </p>
                                <p className="text-lg font-semibold">
                                    ₹{selectedItem?.price}
                                </p>
                                <p
                                    className={
                                        selectedItem?.is_veg === true
                                            ? "text-green-600 text-bold text-lg"
                                            : "text-red-600 text-bold text-lg"
                                    }
                                >
                                    {selectedItem?.category}
                                </p>
                                <p className="text-sm py-1">
                                    Stock: {selectedItem?.stock}
                                </p>

                                {user?.isAdmin && (
                                    <div className="flex justify-between mt-4">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                            <FontAwesomeIcon icon={faEdit} />{" "}
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteItem("4")
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />{" "}
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page;
