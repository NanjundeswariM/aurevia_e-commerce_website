import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.mjs";
import { Product } from "../models/Product.mjs";
import productData from "../../../client/db.json" with {
    type: "json"
};
dotenv.config();
const seedProducts = async () => {
    try {
        await connectDB();
        console.log("Starting product migration...");
        const productMap = new Map();
        for (const [section, products] of Object.entries(productData)) {
            if (!Array.isArray(products)) {
                continue;
            }
            for (const product of products) {
                if (product.id === undefined || product.id === null) {
                    console.log("Skipping product without ID:", product.name);
                    continue;
                }
                if (productMap.has(product.id)) {
                    const existingProduct = productMap.get(product.id);
                    if (!existingProduct.sections.includes(section)) {
                        existingProduct.sections.push(section);
                    }
                } else {
                    const {
                        category,
                        ...productDetails
                    } = product;
                    productMap.set(product.id, {
                        ...productDetails,
                        id: Number(product.id),
                        sections: [section],
                        size: Array.isArray(product.size)
                            ? product.size.map(String)
                            : []
                    });
                }
            }
        }
        const uniqueProducts = Array.from(productMap.values());
        console.log("Unique products found:", uniqueProducts.length);
        const operations = uniqueProducts.map(product => {
            const {
                category,
                ...productDetails
            } = product;
            return {
                updateOne: {
                    filter: {
                        id: product.id
                    },
                    update: {
                        $set: productDetails,
                        $unset: {
                            category: ""
                        }
                    },
                    upsert: true
                }
            };
        });
        if (operations.length > 0) {
            const result = await Product.bulkWrite(operations);

            console.log("Product migration completed successfully!");
            console.log("Inserted:", result.upsertedCount);
            console.log("Modified:", result.modifiedCount);
            console.log("Matched:", result.matchedCount);
        } else {
            console.log("No products found to migrate.");
        }
    } catch (error) {
        console.error("Product migration failed:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seedProducts();
