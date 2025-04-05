"use server"
import {prisma} from "@repo/db/config"

export const getItems=async()=>{
    try {
        const items = await prisma.items.findMany();
        console.log(items);
        
        return items;
    } catch (error) {
        console.log(error)
    }
}

export const deleteMenuItem = async (id:number) => {
    try {
        const deletedItem = await prisma.items.delete({
            where:{
                id:id
            }
        })
        return {
            success:true,
            message:"Item deleted successfully",
            deletedItem
        }
    } catch (error) {
        console.log(error);
        return{
            success:false,
            message:"Failed to delete item"
        }
        
    }
    
};

interface MenuItem {
    id: number; // Prisma uses Int for id, so this should be a number
    name: string;
    price: number;
    stock: number;
    category: "mainCourse" | "snacks"; // Map Prisma enum to the interface's categories
    image: string;
    image_id: string; // Assuming image_id is relevant to the menu item
    description?: string; // Optional field
    is_veg: boolean; // Boolean to indicate if the item is vegetarian or not
}

export const addMenuItem=async (item:MenuItem)=>{
    try {
        const newItem = await prisma.items.create({
            data:{
                name:item.name,
                price:Number(item.price),
                stock:Number(item.stock),
                category:item.category,
                image:item.image,
                image_id:item.image_id||((Math.random()*10)+1).toString(),
                description:item.description,
                createdAt:new Date(),
                updatedAt:new Date(),
                is_veg:item.is_veg

            }
        });

        return {
            success: true,
            message: "Item added successfully",
            newItem,
        };
    } catch (error) {
        console.log(error)
         return {
             success: false,
             message: "Failed to add item",
         };
    }
}