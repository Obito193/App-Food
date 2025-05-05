export type FilterParams = {
  page: number,
  limit:number,
  filterColumn: string, 
  filterValue: string,
  type: 'all'| 'drinks' | 'fast_food' | 'snacks'
}
export type ProductListProps = {
    paginationProductTypeAll: any | null;
    paginationProductTypeFastProduct: any | null;
    paginationProductTypeDrinks: any | null;
    paginationProductTypeSnacks: any | null;
  
    hasFetchedPaginationProductTypeAll: boolean;
    hasFetchedPaginationProductTypeFastProduct: boolean;
    hasFetchedPaginationProductTypeDrinks: boolean;
    hasFetchedPaginationProductTypeSnacks: boolean;
  
    hasMorePaginationProductTypeAll: boolean;
    hasMorePaginationProductTypeFastProduct: boolean;
    hasMorePaginationProductTypeDrinks: boolean;
    hasMorePaginationProductTypeSnacks: boolean;
  
    currentPagePaginationProductTypeAll: number;
    currentPagePaginationProductTypeFastProduct: number;
    currentPagePaginationProductTypeDrinks: number;
    currentPagePaginationProductTypeSnacks: number;

  
    productListError: any | null;
    productListLoading: boolean;
  };