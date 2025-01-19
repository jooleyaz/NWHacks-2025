import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from "zod";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const firecrawlApp = new FirecrawlApp({
    apiKey: process.env.FIRECRAWL_API_KEY,
});

const schema = z.object({
    product_price: z.number(),
    product_description: z.string(),
});

app.post('/scrape', async (req, res) => {
    const {url} = req.body;

    try {
        const scrapeResult = await firecrawlApp.extract([url], {
            prompt: "Find information about the product quality and suitability for the user, by extracting product price and product description from the site.",
            schema: schema,
        });

        if (!scrapeResult.success) {
            throw new Error(`Failed to scrape: ${scrapeResult.error}`)
        }

        res.json(scrapeResult.data);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));