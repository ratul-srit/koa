// import Koa from 'koa';
// import Router from 'koa-router';
// import ResponseHandler from 'koa-response-handler';
// import { add, sub } from './math';
require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const ResponseHandler = require('koa-response-handler');
// const addService = require('./math').add;

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 3000;

router
    .get('/timer/:name', (ctx) => {
        console.log('timer router');

        if (ctx.params.name) {
            ctx.response.ok({ message: `I am ${ctx.params.name}` });
            return;
        }
        ctx.response.ok({ ok: true });
    });
// router
//     .get('/math/add/:arg1/:arg2', (ctx) => {
//         ctx.response.ok(ctx.request);
//         // return;
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
