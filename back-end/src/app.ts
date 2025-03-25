import express from "express";
import cors from "cors";
import 'express-async-errors'
import env from 'dotenv';
import bookRouter from "./routes/book";
import connectDB from "./db/connection";
import notFound from "./middleware/not-found";
import errorHandler from "./middleware/error";
import authenticateUser from "./middleware/authentication";
import orderRouter from "./routes/order";
import userRouter from "./routes/user";

const port = process.env.PORT || 3030;



env.config()
const app = express();
// middleware
app.use(express.json());

app.use(cors({
  origin: ['*','http://localhost:5173'],
  credentials: true
}));
app.use(authenticateUser as unknown as express.RequestHandler);



// routes
app.use('/api/v1/books',bookRouter);
app.use('/api/v1/orders',orderRouter);
app.use('/api/v1/users',userRouter)



app.use(notFound);
app.use(errorHandler); 
app.listen(port, async() => {
  try{
    await connectDB(process.env.DB_URL)
  }catch(e){
    console.error("DB connection error: ",e)
  }
  console.log(`app listening on port ${port}`);
});
