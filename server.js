const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors'); // правила политики cors
const router = require('./routes'); // импортируем набор роутеров по файлу index.js в папке

const app = new Koa();

app.use(koaBody({ // чтобы обработать тело запроса
  // (обязательно объявить до Middleware где работаем с body)
  urlencoded: true, // иначе тело будет undefined (тело будет строкой)
  multipart: true, // если тело запроса закодировано через FormData
}));

app.use(cors()); // задаем правила для политики CORS
app.use(router()); // подключаем маршрутизатор

const port = process.env.PORT || 9000;

app.listen(port, (err) => {
  // два аргумента (1-й это порт, 2-й это callback по результатам запуска сервера)
  if (err) { // в callback может быть передана ошибка
    // (выводим её в консоль для примера, если она появится)
    console.log(err);
    return;
  }
  console.log('Server is listening to 9000 port ************************');
});
