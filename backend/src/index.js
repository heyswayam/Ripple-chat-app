import connectDB from './db/index.js';
import { app,server } from './app.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
      app.on("error",(err)=>{
        console.log(`Encountered some error in the index file: ${err}`);
      })
    });
    
  })
  .catch((e) => {
    console.log('MONGODB connection failed', e);
  });
