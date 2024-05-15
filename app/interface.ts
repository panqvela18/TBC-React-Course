
export interface PostData {
  id: number;
  title: string;
  body: string;
  tags: string[];
}


export interface ProductData {
    id: number ;
    thumbnail: string;
    description: string;
    price: number;
    title:string;
    category?:string
    count?:number;
    handleClick: (productId: number) => void;

  }

  export interface ProductData {
    id: number ;
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

export interface User {
  id:number;
  name:string,
  age:number,
  email:string,
  isadmin:boolean
}
export interface UserData {
  name: string;
  email: string;
  age: number;
  isadmin: boolean;
}
export interface UserData1 {
  name: string;
  email: string;
  age: number;
  isAdmin: boolean;
}