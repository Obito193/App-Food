type CartDataSuccess = {
    id: number;
    user_id: number;
    total_price: string;
    created_at: string;
    updated_at: string;
}

export type CartFilterParams = {
  page: number,
  limit:number,
  filterColumn: string, 
  filterValue: string | number,
}

export type ProductCartData = {
  cart_id: number;
  id?:number| string
  product_id: number | string;
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
  price: string;
};

type UpdateCartItemResponse = {
  success: boolean;
  response: {
    cart_id: number;
    product_id: number;
    quantity: number;
    total_price: string;
  };
};


export type CartProps = {
  cartData: CartDataSuccess | null
  productCartListData: ProductCartData[] | null
  increaseProductQuantityInCartResponse: UpdateCartItemResponse | null | any
  hasFetchedProductCartListData: boolean,
  hasMoreProductCartListData: boolean
  currentPageProductCartListData: number
  hasFetchedCartData: boolean,
  cartError: string | null,
  cartLoading: boolean
}