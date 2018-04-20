import Koa from 'koa';
import Router from 'koa-router';
import ResponseHandler from 'koa-response-handler';
import { add, sub } from './math';

const app = new Koa();
const router = new Router();

router
    .get('/timer', (ctx, next) => {
        console.log('timer router');
        ctx.response.ok({ ok: true });
    })
    .get('/:two', (ctx) => {
        ctx.response.ok({ two: ctx.params.two });
    })
    .get('/:id/three', (ctx, next) => {
        const data = { id: 1, hello: 'world' };

        if (ctx.params.id !== data.id) {
            ctx.response.notFound({ message: 'Invalid Request' });
            return;
        }
        ctx.response.ok(data);
    })
    .get('/math/add/:arg1/:arg2', (ctx) => {
        const result = add(ctx.params.arg1, ctx.params.arg2);

        ctx.response.ok(result);
    })
    .get('/math/sub/:arg1/:arg2', (ctx) => {
        const result = sub(ctx.params.arg1, ctx.params.arg2);

        ctx.response.ok(result);
    });

app
    .use(ResponseHandler({ contentType: 'application/json' }));
app
    .use(router.routes());

// app.use(async (ctx, next) => {
//   try {
//     console.log(`before next call ${ctx.status}`);
//     await next();
//     console.log(`after next call ${ctx.status}`);
//     ctx.response.notFound({ message: 'Invalid resource' });
//   } catch (error) {
//     console.log('error call');
//   }
// });

app
    .listen(3001, () => {
        console.log('server running');
    })
    .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log('Error: port is in use');
        }
    });
