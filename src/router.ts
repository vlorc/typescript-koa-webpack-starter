import { Middleware } from "koa";
import * as Router from "koa-router";

const router = new Router();

export default function (): Middleware {
    return router.routes();
}

router.get("*", async (ctx: Router.IRouterContext) => {
    ctx.body = "hello bitch!!";
});
