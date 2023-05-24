import express from "express";
import url from "url";
import path from "path";
const app = express();

let __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", function (req, res) {
   res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, async () => {
   try {
      console.log(`app is running on http://localhost:3000`);
   } catch (error) {
      console.log(error);
   }
});
console.log("app running...");
