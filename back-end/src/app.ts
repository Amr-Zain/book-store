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
