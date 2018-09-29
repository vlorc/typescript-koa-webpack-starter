import * as Koa from 'koa';
import * as Parser from 'koa-bodyparser';
import * as Logger from 'koa-logger';
import Router from './router';
const app = new Koa();

app.use(Router());
app.use(Logger());
app.use(Parser());

export default app;