import * as http from "http";
import app from "./app";

let currentApp = app.callback();
const server = http.createServer(currentApp);
const port = +process.env.PORT || 8080;

server.listen(port, function (err) {
    if (err) {
        console.error(`Application listening error ${err}.`);
        process.exit(-1);
        return;
    }
    console.log(`Application is listening on port ${port}.`);
});

if (module.hot) {
    module.hot.accept("./app", () => {
        server.removeListener("request", currentApp);
        import("./app").then(next => {
            currentApp = (next as any).default.callback();
            server.on("request", currentApp);
        });
    });
}