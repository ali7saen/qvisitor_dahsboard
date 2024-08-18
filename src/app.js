const connectDB = require("./config/db");
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const { is_login, authenticateJwt } = require("./middlewares/authMiddlewares")
const { swaggerSpec, swaggerUi } = require('./config/swagger');
const {requestLogger} = require("./middlewares/loggerMiddlewares")

const app = express();

const corsOptions = {
    origin: [
        `${process.env.ANDROID_APP_DOMAIN}`,
        `${process.env.IOS_APP_DOMAIN}`
    ],
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


app.use(requestLogger);


// Serve Swagger UI
app.use('/api-docs',cors(),authenticateJwt, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const questionsApiRoutes = require("./routes/api/Questions")
app.use("/api/questions", cors(corsOptions) ,questionsApiRoutes);



app.use(cors());

app.get("/", (req, res) => res.redirect("/questions"))

app.use((error, req, res, next)=>{
    
})
const usersRoutes = require("./routes/web/userRoutes")
app.use("/users", usersRoutes)

const questionsRoutes = require("./routes/web/questionsRoutes")
app.use("/questions", authenticateJwt, questionsRoutes)

const authRoutes = require("./routes/web/authRoutes")
app.use("/auth", is_login, authRoutes)

app.use((req, res) => {
    const view_data = {
        title: "الصفحة غير موجودة !"
    }
    res.render("./404-page", view_data)
});
connectDB();
module.exports = app;