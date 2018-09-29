import * as http from 'http';
import app from './app';

let currentApp = app.callback();
const server = http.createServer(currentApp);
server.listen(+process.env.PORT || 8080);

if (module.hot) {
	module.hot.accept('./app', () => {
		server.removeListener('request', currentApp);
		import("./app").then(next => {
			currentApp = (next as any).default.callback();
			server.on('request', currentApp);
		});
	});
}