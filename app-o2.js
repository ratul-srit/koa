import Koa from 'koa';
import Router from 'koa-router';
import ResponseHandler from 'koa-response-handler';
import JoiRouter, { Joi } from 'koa-joi-router';
// import { Joi } from JoiRouter;
// const Koa = require('koa');
// const Router = require('koa-router');
// const responseHandler = require('koa-response-handler');

const app = new Koa();
const router = new Router();
// const responseHandler = new ResponseHandler();
const joiRouter = JoiRouter();
// const Joi = JoiRouter.Joi;

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
  });

joiRouter.get('/', async (ctx) => {
  ctx.body = 'hello joi-router!';
});

joiRouter.route({
  method: 'post',
  path: '/signup',
  validate: {
    body: {
      name: Joi.string().max(100),
      email: Joi.string().lowercase().email(),
      password: Joi.string().max(100),
      _csrf: Joi.string().token()
    },
    type: 'json',
    output: {
      200: {
        body: {
          userId: Joi.string(),
          name: Joi.string()
        }
      },
      '400-499': {
        body: {
          test: 'teste'
        }
      }
    },
    // continueOnError: true
  },
  handler: [
    // async (ctx, next) => {
    //   console.log('first middlewire');
    //   // console.log(ctx.invalid);
    //   try {
    //     if (ctx.invalid.body) {
    //       // ctx.throw(400, 'bad request', { message: { message: 'invalid request' } });
    //       // ctx.status = 400;
    //       // ctx.throw = { message: 'error' };
    //       // ctx.app.emit('error', )
    //       ctx.response.badRequest({ message: 'error' });
    //       return;
    //     }
    //     next();
    //   } catch (err) {
    //     console.log('catch error');
    //     console.log(err);
    //     ctx.body = err.message;
    //   }
    //   // if (ctx.invalid.type) {
    //   //   ctx.response.badRequest({ test: 'error' });
    //   // }
    // },
    async (ctx) => {
      console.log('second middlewire');
      const user = {
        userId: 'srit123',
        name: 'test teste'
      };
      ctx.status = 201;
      ctx.body = user;
    }
  ]
});

app
  .use(ResponseHandler({ contentType: 'application/json' }));
app
  .use(joiRouter.middleware());

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

app.listen(3001, () => {
  console.log('server running');
})
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Error: port is in use');
    }
  });
