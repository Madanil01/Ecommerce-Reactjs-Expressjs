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
import Users from "./models/UserModel.js";

dotenv.config(); 

const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db: db });

// 🔥 [1] Perbaiki Middleware CORS (Dipanggil Sebelum Session)
app.use(
  cors({
    credentials: true,
    origin: ["https://ecommerce-reactjs-expressjs.vercel.app", "https://ecommerce-reactjs-expressjs.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔥 [2] Setup Express Session
app.use(
  session({
    secret: "21312313eg2hg321hvjhdsvjfvjsdvfvjsdvjvwulasnldca",
    resave: false,
    saveUninitialized: false, // Jangan simpan session kosong
    store: store,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Hanya true di production (HTTPS)
      httpOnly: true, // Lindungi dari JavaScript (XSS attack)
      sameSite: "None", // Agar bisa diakses lintas domain
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    },
  })
);
store.sync();
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

// 🔥 [3] Debug Route (Cek Session)
app.get("/test", (req, res) => {
  console.log("Session Debug:", req.session);
  res.send("Hello, World!");
});

// 🔥 [4] Routes
app.use(UserRoute);
app.use(ProductRoute);
app.use(CategoryRoute);
app.use(VariasiRoute);
app.use(ColorRoute);
app.use(MemoryRoute);
app.use(PesananRoute);
app.use(PesananDetailRoute);
app.use(AuthRoute);

// 🔥 [5] Sinkronisasi Database (Opsional)
// (async () => {
//   await db.sync();
// })();

// 🔥 [6] Start Server
app.listen(process.env.APP_PORT || 5000, () => {
  console.log("Server up and running...");
});
