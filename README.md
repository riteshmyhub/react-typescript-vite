```
./src/environments/environment.ts

import axios from "axios";

const environment = Object.freeze({
   disabled: false,
   production: true,
   API_KEY: {{firebase_API_KEY}},
   get firebase_auth_api() {
      return axios.create({
         baseURL: {{firebase_auth_URL}},
         params: { key: this.API_KEY },
      });
   },
   get firebase_api() {
      return axios.create({
         baseURL: {{firebase_URL}},
         params: { key: this.API_KEY },
      });
   },
});

export default environment;
```
