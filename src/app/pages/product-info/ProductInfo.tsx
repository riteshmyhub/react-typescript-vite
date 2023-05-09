import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../../redux/services/product.service";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import JsonViewer from "../../shared/components/json-viewer/JsonViewer";

export default function ProductInfo(): JSX.Element {
   const { loading, product, error } = useAppSelector((state) => state.productReducer);
   const { id } = useParams();
   const { _get_product_info } = new UserService();
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (id) {
         dispatch(_get_product_info(+id));
      }
      return () => {};
   }, [id]);

   return (
      <div>
         {loading ? (
            "loading..."
         ) : (
            <div>
               {product ? (
                  <div style={{ padding: "10px" }}>
                     <JsonViewer code={JSON.stringify(product)} />
                  </div>
               ) : (
                  error && <div>{error}</div>
               )}
            </div>
         )}
      </div>
   );
}
