export interface Book {
    _id: string
    coverImage: string
    title: string
    description: string
    newPrice: number
    oldPrice: number
    category?:Category
    trending?:boolean
  }
export interface FullBookInfo extends Book{
  author: string;
  createdAt: number;

}

export type Category =  "Business" | "Fiction" | "Horror" | "Adventure";

  