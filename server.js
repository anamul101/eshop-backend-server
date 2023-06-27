const app = require("./app");
const mongoose = require("mongoose");
// const connectDatabase = require("./db/Database");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  }

// connect db
// connectDatabase();
async function bootstrap() {
  try {
    await mongoose.connect("mongodb+srv://E-Shop:t2nbLulDswG4zUFJ@cluster0.ecyy5fq.mongodb.net/?retryWrites=true&w=majority");
    console.log("🛢Database is connected successfully");

    server = app.listen(process.env.PORT, () => {
      console.log(`Application  listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();


// create server
// const server = app.listen(process.env.PORT, () => {
//   console.log(
//     `Server is running on http://localhost:${process.env.PORT}`
//   );
// });
// t2nbLulDswG4zUFJ
// unhandled promise rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Shutting down the server for ${err.message}`);
//   console.log(`shutting down the server for unhandle promise rejection`);

//   server.close(() => {
//     process.exit(1);
//   });
// });