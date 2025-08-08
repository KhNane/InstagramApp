import { app } from './app';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 9000;
AppDataSource.initialize()
  .then(() => {
      app.listen(PORT, () => {
          console.log(`Server is running on port:${PORT} `);
      });
  })
  .catch((error) => console.error(error));
