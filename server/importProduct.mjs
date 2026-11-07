import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./src/config/db.mjs";
import { Product } from "./src/models/Product.mjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importProducts = async () => {
    try {
        await connectDB();

        const jsonPath = path.join(
            __dirname,
            "..",
            "client",
            "public",
            "db.json"
        );

        const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

        const productMap = new Map();
        for (const [section, products] of Object.entries(data)) {
            if (!Array.isArray(products)) continue;
            for (const product of products) {
                const productId = Number(product.id);

                if (!productId) continue;

                if (productMap.has(productId)) {
                    const existing = productMap.get(productId);

                    if (!existing.sections.includes(section)) {
                        existing.sections.push(section);
                    }
                } else {
                    productMap.set(productId, {
                        ...product,
                        id: productId,
                        sections: [section]
                    });
                }
            }
        }

        const allProducts = Array.from(productMap.values());

        console.log(`Found ${allProducts.length} unique products.`);

        for (const product of allProducts) {
            await Product.findOneAndUpdate(
                { id: product.id },
                { $set: product },
                { upsert: true, new: true, runValidators: true }
            );
        }

        console.log("Products imported successfully!");
        console.log(`Total products imported: ${allProducts.length}`);

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error("Product import failed:", error.message);
        await mongoose.disconnect();
        process.exit(1);
    }
};

importProducts();
