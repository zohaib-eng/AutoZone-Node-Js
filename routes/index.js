const userRoutes = require('../routes/user.route');
const carRoutes = require('../routes/car.routes');
const googleUserRoutes = require('../routes/googleUserRoutes.routes');

const express = require("express");
const router = express.Router();

class Router {
    static getRoutes = () => {
      // Routes
      router.use("/auth", googleUserRoutes);
      router.use("/users", userRoutes);
      router.use("/cars", carRoutes);
  
      // default index route
      router.get("/", (_, res) => res.send("Welcome to app."));
  
      return router;
    };
}
module.exports = Router;