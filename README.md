**How to run locally**
1. Setup database
  Just run any MySQL database and copy the database connection url,
  it should be formatted like this ```mysql://[username]:[password]@[host]:[port]/[dbname]?schema=public```
3. Setup the backend
   Go to the ```/backend``` folder, then run ```npm install```, after that create your own ```.env``` file at the root of ```/backend``` after that write the following inside the ```.env``` file
   ```bash
   DATABASE_URL="mysql://[username]:[password]@[host]:[port]/[dbname]?schema=public"
   ```
   After that run the following command to apply migrations to the database
   ```bash
   npx prisma migrate deploy
   ```
   Then you could run the app with the following command
   ```bash
   npm run dev
   ```
   
5. Setup the frontend
   Go to the ```frontend``` folder, then run ```npm install```, after that run the app with ```npm run dev```, the app will run on ```http://localhost:4200```.
