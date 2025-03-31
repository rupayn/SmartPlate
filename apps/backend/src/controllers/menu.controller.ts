import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const changeImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
            return;
        }

        const { originalname, buffer } = req.file;

        // Generate unique filename with extension
        const fileExt = path.extname(originalname);
        const fileName = `${originalname.replace(/\s+/g, "-").replace(fileExt, "")}-${Date.now()}${fileExt}`;

        // Define upload directory
        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Ensure upload directory exists
        await fs.promises.mkdir(uploadDir, { recursive: true });

        // Define file path
        const filePath = path.join(uploadDir, fileName);

        // Save the file
        await fs.promises.writeFile(filePath, buffer);

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            fileName,
            filePath,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error uploading image",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
