import Koa from 'koa';
import Router from 'koa-router';
import ResponseHandler from 'koa-response-handler';
// const Koa = require('koa');
// const Router = require('koa-router');
// const responseHandler = require('koa-response-handler');

const app = new Koa();
const router = new Router();
// const responseHandler = new ResponseHandler();

router
  .get('/timer', async (ctx, next) => {
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
  });

app
  .use(ResponseHandler({ contentType: 'application/json' }));
app
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', (err) => {
    console.log(err);
  });

// app.use(async (ctx, next) => {
//   console.log(`before next in try code : ${ctx.status}`);
//     await next();
//     console.log(`after next in try code : ${ctx.status}`);
//     console.log(ctx.response);
  
// });

app.listen(3001, () => {
  console.log('server running');
})
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Error: port is in use');
    }
  });
