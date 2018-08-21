import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Logger from 'koa-logger';

const port = +process.env.PORT || 3000;
const app = new Koa();
const router = new Router();

router.get('/*', async (ctx) => {
    ctx.body = 'Hello World!';
});

app.use(router.routes());
app.use(Logger());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})