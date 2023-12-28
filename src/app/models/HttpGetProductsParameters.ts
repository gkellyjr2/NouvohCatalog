import { PaginationData } from "./pagination";

export interface HttpGetProductsParameters {
    sortOrder: string;
    NumberOfItemsPerPage: number;
    CurrentPage: number;
    searchName?: string;
    selectedBrands?: string[];
    selectedCategories?: string[];
    brand?: string;
    category?: string;
    paginationData: PaginationData;
}