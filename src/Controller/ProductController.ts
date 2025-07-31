import { Request, Response } from "express";
import { ProductInfo } from "../types/types";

const products: ProductInfo[] = require('../data/products.json');


const getFullProductsOrFiltered = async (req: Request, res: Response): Promise<any> => {
    const { searchValue, filterCategory, filterPriceRange, startIndex, endIndex } = req.query as any;  
    console.log(filterPriceRange);

    if (!products) return res.status(500).json({
        messege: "product data is empty to search/filter",  
        error: true,
        success: false,
    })

    try {
        function searchByName() {
            const searchResults = products?.filter((product: ProductInfo) => {
                return product.name.toLowerCase().trim().startsWith(searchValue.toLowerCase().trim());
            });
            return searchResults;
        }

        function filterProducts() {

            const filterPrice = filterPriceRange.split(" ");
            const price = Number(filterPrice[1]);
            const filteredData = products?.filter((product: ProductInfo) => {
                if (filterCategory !== "" && product?.category !== filterCategory) return false;
                if (filterPriceRange && product?.price > price) return false;
                return true;
            });
            return filteredData;
        }

        if (searchValue == "" && filterCategory == "" && filterPriceRange == "") {
            console.log("hai");
            // console.log("indexes",startIndex, endIndex);
            const productLists = products.slice(startIndex-1, endIndex);
            return res.status(200).json({
                data: productLists,
                error: false,
                success: true
            });
        } else if (searchValue !== "") {
            const searchData = await searchByName();
            return res.status(200).json({
                data: searchData,
                error: false,
                success: true,
            });
        } else if (filterCategory !== "" || filterPriceRange !== "") { 
            const filteredData = await filterProducts();
            const filterResponse = filteredData.slice(startIndex - 1, endIndex);
            console.log(startIndex, endIndex);
            console.log(filterResponse);
            return res.status(200).json({
                data: filterResponse,
                error: false,
                success: true,
            });
        } else {
            return res.status(500).json({
                messege: "data not found",
                error: true,
                success: false
            });
        }
    } catch (err) { 
        return res.status(500).json({
            messege: "err while filtering/searching",
            error: true,
            success: false
        })
    }

}


const getRelatedProducts = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id as string;
    const productDoc = products.find((product: ProductInfo) => product.id == id);
    if (!productDoc) {
        return res.status(400).json({
            messege: "failed to find product",
            error: true,
            success: false
        });
    }

    try {
        const relatedProducts = products.filter((product: ProductInfo) => product.category == productDoc.category);
        const relatedResponseProducts = relatedProducts.slice(0, 4);
        res.status(200).json({
            data: relatedResponseProducts,
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            messege: "error filtering related data",
            error: true,
            success: false,
        });
    }
}


const getSingleProduct = (req: Request, res: Response): any => {
    const id = req.params.id;
    console.log("parmas id:", id);

    try {
        const productDoc = products.find((product: ProductInfo) => product?.id == id);
        return res.status(200).json({
            data: productDoc,
            error: false,
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            messege: "failed to find doc apss valid id!!!",
            error: false,
            successs: true,
        });
    }
} 

export default { getFullProductsOrFiltered, getRelatedProducts, getSingleProduct };