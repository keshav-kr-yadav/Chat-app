const express = require('express');
const path = require('path');
const { PORT } = require('./config');
const expressApp = require('./app');
const DBConnection = require('./database/DBConnection');
const app = express();
const StartServer = async() => {
    const app = express();
    
    await DBConnection();
    await expressApp(app);

    const __dirname1 = path.resolve();
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname1, "/frontend/build")));

      app.get("*", (req, res) =>
        res.sendFile(
          path.resolve(__dirname1, "frontend", "build", "index.html")
        )
      );
    } else {
      app.get("/", (req, res) => {
        res.send("API is running..");
      });
    }
    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();