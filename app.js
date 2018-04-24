// import Koa from 'koa';
// import Router from 'koa-router';
// import ResponseHandler from 'koa-response-handler';
// import { add, sub } from './math';

const Koa = require('koa');
const Router = require('koa-router');
const ResponseHandler = require('koa-response-handler');
// const addService = require('./math').add;
require('dotenv').config();

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 3000;

router
    .get('/timer/:name', (ctx, next) => {
        console.log('timer router');

        if (ctx.params.name) {
            ctx.response.ok({ message: ctx.params.name });
            return;
        }
        ctx.response.ok({ ok: true });
    })
    .get('/me/:two', (ctx) => {
        ctx.response.ok({ two: ctx.params.two });
    })
    .get('/me/:id/three', (ctx, next) => {
        const data = { id: 1, hello: 'world' };

        if (ctx.params.id !== data.id) {
            ctx.response.notFound({ message: 'Invalid Request' });
            return;
        }
        ctx.response.ok(data);
    });
// router
//     .get('/math/add/:arg1/:arg2', (ctx) => {
//         const result = addService(ctx.params.arg1, ctx.params.arg2);

//         ctx.response.ok(result);
//     });

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
    .listen(PORT, () => {
        // console.log(process.env.PORT);
        console.log('server running');
    })
    .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log('Error: port is in use');
        }
    });
