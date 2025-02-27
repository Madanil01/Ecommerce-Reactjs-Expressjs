import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js"; 
import CategoryRoute from "./routes/CategoryRoute.js"; 
import VariasiRoute from "./routes/VariasiRoute.js"; 
import ColorRoute from "./routes/ColorRoute.js";
import MemoryRoute from "./routes/MemoryRoute.js";
import PesananRoute from "./routes/PesananRoute.js";
import PesananDetailRoute from "./routes/PesananDetailRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import FileUpload from "express-fileupload";
import Pesanans from "./models/PesananModel.js";
import PesananDetail from "./models/PesananDetailModel.js";
import Users from "./models/UserModel.js";

dotenv.config(); 

const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// (async()=>{
//     await db.sync();
// })();
// PesananDetail.sync()
//   .then(() => {
//     console.log("Tabel Variasi telah dibuat."); 
//   })
//   .catch((error) => {
//     console.error("Gagal membuat tabel Product:", error);
//   });
// app.use(
//   session({
//     secret: '21312313eg2hg321hvjhdsvjfvjsdvfvjsdvjvwulasnldca',
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: {
//       secure: true,
//     },
//   })
// );
app.use(
  session({
    secret: "21312313eg2hg321hvjhdsvjfvjsdvfvjsdvjvwulasnldca",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Hanya true di production
      httpOnly: true, // Lindungi cookie dari JavaScript
      sameSite: "None", // Agar bisa diakses di domain berbeda
    },
  })
);
app.use("/test", (req, res) => {
  res.send("Hello, World!");
});


// app.use(
//   cors({
//     credentials: true,
//     origin: "https://tiny-cuchufli-c4e6c1.netlify.app",
//   })
// )
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "ecommerce-reactjs-expressjs.vercel.app"); // Set the origin to your client's URL
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
//   next();
// });
app.use(
  cors({
    credentials: true,
    origin: ["https://tiny-cuchufli-c4e6c1.netlify.app", "https://ecommerce-reactjs-expressjs.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.static("public"))
app.use(express.json());
app.use(FileUpload());
app.use(UserRoute);
app.use(ProductRoute);
app.use(CategoryRoute);
app.use(VariasiRoute);
app.use(ColorRoute);
app.use(MemoryRoute);
app.use(PesananRoute);
app.use(PesananDetailRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
