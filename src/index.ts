import app, { initializeMiddlewares, initializeRoutes } from "./configs/app";
import appConfig from "./configs";
import connectDb from "./configs/persistence/database";


const { port, environment } = appConfig;

(() => {
  initializeMiddlewares();
  initializeRoutes();

  connectDb()
    .then(() => {
      app.listen(port, () => {
        console.log(
          `${environment?.toLocaleUpperCase()} is running on port ${port}...`
        );
      });
    })
    .catch((err) => {
      console.log("error connecting to database", err);
      process.exit(1);
    });
})();
