import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../../redux/services/user.service";
import { useAppSelector, useAppDispatch } from "../../../redux/store";

export default function UserInfo(): JSX.Element {
   const { loading, user, error } = useAppSelector((state) => state.userReducer);
   const { id } = useParams();
   const { _get_user_info } = new UserService();
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (id) {
         dispatch(_get_user_info(+id));
      }
      return () => {};
   }, [id]);

   return (
      <div>
         {loading ? (
            "loading..."
         ) : (
            <div>
               {user ? (
                  <div style={{ padding: "10px" }}>
                     <div className="card">
                        <img src={user?.image} alt="no image" style={{ width: "200px", display: "block", margin: "auto" }} />
                        <h1 className="text-center">
                           {user?.firstName} {user?.maidenName} {user?.lastName}
                        </h1>
                     </div>
                     <br />
                     <div className="card">
                        <p>username : {user?.username}</p>
                        <p>id : {user?.id}</p>
                        <p>age : {user?.age}</p>
                        <p>gender : {user?.gender}</p>
                        <p>email : {user?.email}</p>
                        <p>phone : {user?.phone}</p>
                        <p>birthDate : {user?.birthDate}</p>
                        <p>bloodGroup : {user?.bloodGroup}</p>
                        <p>height : {user?.height}</p>
                        <p>weight : {user?.weight}</p>
                        <p>eyeColor : {user?.eyeColor}</p>
                        <p>
                           domain :
                           <a href={`https://${user?.domain}`} target="_blank" rel="noopener noreferrer">
                              {user?.domain}
                           </a>
                        </p>
                     </div>
                     <br />
                     <div className="card">
                        <p>bank details</p>
                        <p> cardExpire : {user?.bank?.cardExpire} </p>
                        <p> cardNumber :{user?.bank?.cardNumber} </p>
                        <p> cardType : {user?.bank?.cardType} </p>
                        <p> currency : {user?.bank?.currency} </p>
                        <p> iban :{user?.bank?.iban} </p>
                     </div>
                     <br />
                     <div className="card">
                        <p>Address</p>
                        <p>
                           {user?.address?.address} {user?.address?.city} {user?.address?.postalCode} {user?.address?.state}
                        </p>
                     </div>
                  </div>
               ) : (
                  error && <div>{error}</div>
               )}
            </div>
         )}
      </div>
   );
}
