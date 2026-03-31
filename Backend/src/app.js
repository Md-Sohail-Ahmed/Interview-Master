const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const allowedOrigins = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
    methods: [ "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS" ],
    allowedHeaders: [ "Content-Type", "Authorization" ],
    optionsSuccessStatus: 204
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app
