const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user")
const todoRouter = require("./routes/todo");
const resetRouter = require("./routes/reset");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user",userRouter)
app.use("/api/v1/todo",todoRouter)
app.use("/api/v1/",resetRouter);


app.listen(3000,()=>
console.log("Port Connected")
)