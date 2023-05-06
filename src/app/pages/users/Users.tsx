import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import UserService from "../../../redux/services/user.service";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery";

export default function Users(): JSX.Element {
   const user = useAppSelector((state) => state.userReducer);
   const dispatch = useAppDispatch();
   const { _get_all_users } = new UserService();
   const navigate = useNavigate();
   const isDesktop = useMediaQuery("(min-width:787px)");
   useEffect(() => {
      dispatch(_get_all_users());
      return () => {};
   }, []);
   //100% 50% 25%
   return (
      <div>
         {user.loading ? (
            <p>loading...</p>
         ) : user.users.length ? (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
               {user.users.map((item) => (
                  <React.Fragment key={item.id}>
                     <div style={{ flex: "0 0 auto", width: isDesktop ? "25%" : "100%" }}>
                        <div className="card">
                           <img src={item.image} alt="no item" className="d-block mx-auto" style={{ width: "150px" }} />
                           <h2 className="text-center">
                              {item.firstName} {item.maidenName} {item.lastName}
                           </h2>
                           <h3 className="text-center">{item.email}</h3>
                           <br />
                           <div className="text-center">
                              <button onClick={() => navigate(`${item?.id}`)}>User Detail</button>
                           </div>
                        </div>
                     </div>
                  </React.Fragment>
               ))}
            </div>
         ) : user.error ? (
            <div>{user.error}</div>
         ) : (
            <div>no users</div>
         )}
      </div>
   );
}
