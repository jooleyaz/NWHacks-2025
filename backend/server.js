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
    product_sustainability: z.string(),
    product_quality: z.string(),
});

app.post('/scrape', async (req, res) => {
    console.log(req.body)
    const { url } = req.body;

    try {
        console.log(url)

        const scrapeResult = await firecrawlApp.extract([url], {
            prompt: `Find information about the product from the URL given. 
            Obtain the price from the official seller.
            Obtain the product description from the official seller.
            Obtain information about how sustainable and ethical the product is by examining information about the manufacturer,
            any official listed sustainability/ethics information from the seller,
            and any comments by reviewers, if available. If this is not found, tell the user that they should look into the sustainability of the
            product as it was not explicitly mentioned, which may be a red flag.
            Obtain information about product quality by weighing the pros and cons of user reviews, especially looking for longevity and ease of use information.`,
            schema: schema,
        });

        if (!scrapeResult.success) {
            throw new Error(`Failed to scrape: ${scrapeResult.error}`)
        }

        res.json(scrapeResult.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));