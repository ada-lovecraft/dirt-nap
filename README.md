
# dirt-nap api

A little api to manage construction site materials

## [Live Demo](http://observablehq.com/@ada-lovecraft/dirt-nap-api)
Once you've got your server up and running, click the link above for demo and client use docs.

## Features
- `postgresql` for data persistence
- `Prisma` for DB Migrations, Seeding, and querying
- `express` for Routing and Serving
- `dotenv` for environment settings
- `ava` for testing

## Installation

1. clone this repo: `$ gh repo clone ada-lovecraft/dirt-nap`
2. Install dependencies: `$ npm install`
3. run postgres docker: `$ docker run --name dirt-nap-postgres -p 5432:5432  -e POSTGRES_PASSWORD=password postgres:latest`
4. Update `.env` file with proper database url if you had to change anything
5. Migrate & seed database with most recent schema: `$ npx prisma migrate reset`
6. Start the server: `$ npm start`
7. [Check Usage Docs](http://observablehq.com/@ada-lovecraft/dirt-nap-docs)


    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` - the db connection string to your postgres instance




## Running Tests

To run tests, run the following command

```bash
  npm run test
```
pr with a watcher
```bash
npm run test:dev
```

## Updating Schemas
The database schema at `/prisma/schema.prisma`. 
Once you've editted it, you can push it to your local db by `$ npx prisma db push` 
If you're happy with the change, `$ npx prisma migrate dev` to create a new migration step

## DB Seeding
The database is automatically seeded when you `$ npx prisma migrate deploy`. The seed scripts are located at `prisma/seed.js`

## The Naming of Things
Why did I call this project `dirt-nap`? 
It's a `REST` api  dealing with construction site materials, a lot of which are created from the `earth` itself.

