The project is made as a monorepo containing both frontend and backend
It contains auth backend + frontend functionality, however features like forgot password and mfa for user
are skipped for brevity.

## Frontend

Steps to start

1. Create .env file at the root of frontend folder containing variables mentioned in sample.env
2. Install project dependencies by running ```npm install```
3. Start vue server using ```npm run dev```

## Backend

Steps to start

1. Spin up a mongodb. docker-compose found in this repo can be used for same
2. Create .env file at the root of frontend folder containing variables mentioned in sample.env
2. Install project dependencies by running ```npm install```
3. Start nest server using ```npm run start```