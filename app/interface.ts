
export interface PostData {
  id: number;
  title: string;
  body: string;
  tags: string[];
}


export interface ProductData {
    id: number | string;
    thumbnail: string;
    description: string;
    price: number;
    title:string;
    category?:string
  }

  
  export interface PaginatedResponse extends PostData {
    total: number;
    skip: number;
    limit: number;
  }
  
  export interface FetchedPost {
    posts: PaginatedResponse[];
  }
  
export interface ProdDetail{
  id:number;
  title:string;
  description:string;
  brand:string;
  price:number;
  thumbnail:string;
  rating:number;
  category:string;
  discountPercentage:number;
  images:string[];
}