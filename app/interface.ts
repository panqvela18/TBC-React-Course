
export interface PostData {
  id: number;
  title: string;
  description: string;
  image_url:string;
}

export interface blogData {
  title: string;
  description: string;
  image_url?:string | undefined;
  // user_id:number
}

export interface reviewData {
  user_id:number,
      product_id:number,
      rating:number,
      message:string
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

  export interface formData{
    name:string;
    surname:string;
    email:string;
    message:string
  }
  export interface ProductFromVercel {
    imageGallery?: string[] | [];
    id: number;
    description: string;
    price: string;
    title:string;
    discount:string;
    category:string;
    stock:number;
    image_url:string;
    user_id:number;
    quantity?:number
    image_gallery?: Gallery[] | undefined;
  }
  export interface Gallery {
    id: number;
    image_url: string;
    name:string
}

export interface Prod {
    id?: number;
    title: string;
    description: string;
    price: string;
    category: string;
    discount: number;
    stock: number;
    image_url: string;
    imageGallery?: Gallery[];
}


  export interface ProductWithQuantity extends ProductFromVercel {
    quantity: number;
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
  name:string;
  email:string;
  image_url:string;
}
export interface UserData {
  name: string;
  email: string;
  image_url:string;

}
export interface UserData1 {
  name: string;
  email: string;
}

export interface Cart {
  id: number;
  user_id: number;
  products: {
    [key: string]: number;
  };
  added_on: string;
}