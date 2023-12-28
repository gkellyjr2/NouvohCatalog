export interface basket {
    buyerId: string
    contents: basketContent[]
  }
  
  export interface basketContent {
    quantity: number
    id: number
    productName: string
    description: string
    imagePath: string
    unitPrice: number
    categoryID: number
    brandID: number
    categoryName: string
    brandName: string
  }
  