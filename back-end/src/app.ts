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
import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import { credential } from "firebase-admin";
import adminRouter from "./routes/admin";
import Book from "./models/book";

const port = process.env.PORT || 3030; 



env.config()
// eslint-disable-next-line @typescript-eslint/no-require-imports
const  serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS)
const app = express();
// middleware
app.use(express.json());

app.use(cors({
  origin: ['*','http://localhost:5173'],
  credentials: true
}));
app.use(authenticateUser as unknown as express.RequestHandler);

//const credentialPath = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
initializeApp({
  credential: credential.cert(serviceAccount as ServiceAccount),
});

 

// routes
app.use('/api/v1/books',bookRouter);
app.use('/api/v1/orders',orderRouter);
app.use('/api/v1/admin',adminRouter);



app.use(notFound);
app.use(errorHandler); 
app.listen(port, async() => {
  try{
    await connectDB(process.env.DB_URL)
    await Book.updateMany({},{$set:{createdAt:'2025-03-31T02:12:40.487+00:00', updatedAt:'2025-03-31T02:12:40.487+00:00'}})
  }catch(e){
    console.error("DB connection error: ",e)
  }
  console.log(`app listening on port ${port}`);
});
