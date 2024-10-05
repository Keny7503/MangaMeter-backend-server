import { Request, Response } from "express";
import { AppDataSource } from "./data-source"
import { Genre } from "../entity/Genre"

// Get all genres from the database
export const getAllGenres = async (req: Request, res: Response) => {
    try {
        const genreRepository = AppDataSource.getRepository(Genre);
        const genres = await genreRepository.find(); // Retrieve all genres
        res.status(200).json(genres);
    } catch (error) {
        console.error("Error fetching genres:", error);
        res.status(500).json({ message: "Error fetching genres" });
    }
};
