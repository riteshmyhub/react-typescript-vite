import { ProductType } from "../interfaces/product.type";
import ProductService from "../services/product.service";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type productState = {
   loading: boolean;
   products: ProductType[] | [];
   product: ProductType | null;
   error: any;
};

const initialState: productState = {
   loading: true,
   products: [],
   product: null,
   error: null,
};

export const productSlice = createSlice({
   name: "product",
   initialState: initialState,
   reducers: {},
   extraReducers(builder) {
      let { _get_all_products, _get_product_info } = new ProductService();

      // Todo:_get_all_products
      builder.addCase(_get_all_products.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(_get_all_products.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
         state.loading = false;
         state.products = action.payload;
         state.error = "";
      });
      builder.addCase(_get_all_products.rejected, (state, action) => {
         state.loading = false;
         state.products = [];
         state.error = action.error.message || "something went wrong!";
      });

      // Todo:_get_products info
      builder.addCase(_get_product_info.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(_get_product_info.fulfilled, (state, action: PayloadAction<ProductType>) => {
         state.loading = false;
         state.product = action.payload;
         state.error = "";
      });
      builder.addCase(_get_product_info.rejected, (state, action) => {
         state.loading = false;
         state.product = null;
         state.error = action.payload;
      });

      // Todo:_get_products info
   },
});

export default productSlice.reducer;
