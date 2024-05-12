const Router = require('koa-router');
const dataBase = require('../../db');

const router = new Router(); // создали роутер

router.get('/posts/latest', (ctx) => {
  console.log('GET запрос на latest от', ctx.request.header.referer); // показать url источника запроса

  if (Math.random() > 0.8) { // имитация ошибки
    ctx.response.status = 500;
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    status: 'ok',
    data: dataBase.getPosts(),
  };
});

router.get('/posts/:post_id/comments/latest', (ctx) => {
  console.log('GET запрос на post_id от', ctx.request.header.referer); // показать url источника запроса
  // получаем параметр :post_id из URL
  // console.log('GET запрос на post_id от', ctx.params);

  if (Math.random() > 0.7) { // имитация ошибки
    ctx.response.status = 500;
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    status: 'ok',
    data: dataBase.getComments(ctx.params.post_id), // список комментов
  };
});

module.exports = router;
