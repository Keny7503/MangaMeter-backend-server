// src/routes/search.ts

import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

// Define interfaces for the response data
interface Manga {
  id: string;
  attributes: {
    title: {
      en?: string; // optional property for English title
    };
  };
}

interface MangaResponse {
  data: Manga[];
}

router.get("/", async (req: Request, res: Response) => {
  const title = req.query.title as string;

  if (!title) {
    res.status(400).json({ error: "Please provide a title to search for." });
    return;
  }

  try {
    const baseUrl = "https://api.mangadex.org/manga";
    const response = await axios.get<MangaResponse>(baseUrl, {
      params: { title }
    });

    const mangaTitles = response.data.data.map((manga) => "["+ manga.id+"] "+(manga.attributes.title.en || manga.attributes.title));

    res.json({ results: mangaTitles });
  } catch (error: unknown) {
    res.status(500).json({ error: "Error fetching data from MangaDex API", details: error });
  }
});

export default router;
