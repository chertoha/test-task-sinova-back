# Test task for Sinova (Backend)

## Clone repository

```bash
git clone https://github.com/chertoha/test-task-sinova-back.git
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables. Adjust the values according to your environment:

```bash
PORT=application_serving_port
DB_HOST=mongoDB_database_link_string
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## OpenAPI docs

Open [http://localhost:<PORT>/api](http://localhost:PORT/api) with your browser to see the result.
