type CartDataSuccess = {
  success: boolean;
  message: string;
  result: {
    id: number;
    user_id: number;
    total_price: string;
    created_at: string;
    updated_at: string;
  }
}

export type CartFilterParams = {
  page: number,
  limit:number,
  filterColumn: string, 
  filterValue: string,
}

export type ProductCartData = {
  cart_id: number;
  product_id: number;
  quantity: number;
  price: string;
  total_price: string;
  name: string;
  category: string;
  image: string;
  description: string;
};

export type CartItemUpdateData = {
  cart_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
};

type UpdateCartItemResponse = {
  success: boolean;
  response: {
    cart_id: number;
    product_id: number;
    quantity: number;
    total_price: number;
  };
};


export type CartProps = {
  cartData: CartDataSuccess | null
  productCartListData: ProductCartData[] | null
  increaseProductQuantityInCartResponse: UpdateCartItemResponse | null | any
  hasFetchedCartData: boolean,
  cartError: string | null,
  cartLoading: boolean
}