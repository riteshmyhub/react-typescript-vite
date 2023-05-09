import axios from "axios";

const environment = Object.freeze({
   disabled: false,
   production: true,
   API_KEY: "AIzaSyAslWktQbSTmaTgMExqsVpSO713qnJ8MKw",
   get firebase_auth_api() {
      return axios.create({
         baseURL: "https://identitytoolkit.googleapis.com/v1",
         params: { key: this.API_KEY },
      });
   },
   get firebase_api() {
      return axios.create({
         baseURL: "https://auth-app-15c9e-default-rtdb.firebaseio.com",
         params: { key: this.API_KEY },
      });
   },
});

export default environment;
