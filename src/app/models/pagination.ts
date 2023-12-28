export interface PaginationData {
    numberOfItemsFromQuery: number;
    numberOfPages: number;
    numberOfItemsPerPage: number;
    currentPage: number;
}
export class PaginationResponse<T>{
    data: T;
    pagination: PaginationData;
    constructor(responseData: T, responsePagination: PaginationData) {
        this.data = responseData;
        this.pagination = responsePagination;
    }
}