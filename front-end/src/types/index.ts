export interface Book {
    _id: string
    coverImage: string
    title: string
    description: string
    newPrice: number
    oldPrice: number
    category?:Category
  }
export type Category =  "Business" | "Fiction" | "Horror" | "Adventure";

  