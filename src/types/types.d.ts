export interface ProductInfo {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    isInStock: boolean;
}

export interface ProductRequestQuery {
    searchValue: string;
    filterCategory: string;
    filterPriceRange: null | number;
    startIndex: number;
    endIndex: number;
}