import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../../redux/services/product.service";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery";

export default function Products(): JSX.Element {
   const product = useAppSelector((state) => state.productReducer);
   const dispatch = useAppDispatch();
   const { _get_all_products } = new ProductService();
   const navigate = useNavigate();
   const isDesktop = useMediaQuery("(min-width:787px)");
   useEffect(() => {
      dispatch(_get_all_products());
      return () => {};
   }, []);
   //100% 50% 25%
   return (
      <div>
         {product.loading ? (
            <p>loading...</p>
         ) : product.products.length ? (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
               {product.products.map((item) => (
                  <React.Fragment key={item.id}>
                     <div style={{ flex: "0 0 auto", width: isDesktop ? "33.3333%" : "100%" }}>
                        <div className="card">
                           <img
                              src={item.thumbnail}
                              alt="no item"
                              className="d-block mx-auto"
                              style={{
                                 width: "200px",
                                 height: "200px",
                                 objectFit: "contain",
                              }}
                           />
                           <br />
                           <h2 className="text-center">{item.title}</h2>
                           <h3 className="text-center">{item.brand}</h3>
                           <br />
                           <div className="text-center">
                              <button onClick={() => navigate(`/products/${item?.id}`)}>Product Detail</button>
                           </div>
                        </div>
                     </div>
                  </React.Fragment>
               ))}
            </div>
         ) : product.error ? (
            <div>{product.error}</div>
         ) : (
            <div>no products</div>
         )}
      </div>
   );
}
