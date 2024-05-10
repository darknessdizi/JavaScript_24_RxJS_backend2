const combineRouters = require('koa-combine-routers'); // объединение роутеров

const postsLatest = require('./posts'); // получаем один из роутеров

const router = combineRouters(
  postsLatest, // перечисляем все доступные роутеры
);

module.exports = router;
