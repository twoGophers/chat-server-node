const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./router/users");
const authRoute = require("./router/auth");
const userPost = require("./router/posts");

//Если env не видит переменные, тогда дополнительно нужно прописать путь
require('dotenv').config({ path: './.evn' });

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB OK"))
    .catch(() => console.log("MongoDB ERROR "))

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", userPost);

app.listen( 8800, () => {
    console.log("Backend server work");
})
