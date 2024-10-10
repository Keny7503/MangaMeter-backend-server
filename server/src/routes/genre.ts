import { Router } from "express";
import { getAllGenres } from "../services/genreController";


const router = Router();

// Route to get all genres
router.get("/", getAllGenres);

export default router;
