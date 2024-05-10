const { faker } = require('@faker-js/faker'); // импортируем faker из библиотеки

const dataBase = {
  listPosts: [],
  listNewPosts: [],
  listUsers: [{
    author_id: '12345',
    author: 'Liza Smit',
    avatar: 'LiSa99',
    image: 'http://url-liza-smitnaya.com',
  }],

  getPosts() {
    // Возвращает список новых сообщений
    const count = Math.floor(Math.random() * 10) + 5; // от 5 до 14
    for (let i = 0; i < count; i += 1) {
      this.newPosts();
    }

    this.listPosts.push(...this.listNewPosts);
    // Далее формируем список последних постов (не более 10)
    const list = this.listNewPosts.reverse().slice(0, 10);
    this.listNewPosts = [];
    return list;
  },

  newPosts() {
    // Создание нового сообщения
    const obj = {}; // создали новый пост и далее наполняем его
    obj.id = faker.string.uuid();
    obj.title = faker.commerce.productDescription();

    const date = faker.date.past();
    obj.created = date.getTime();

    const status = Math.floor(Math.random() * 2);
    // status = 0 использовать старых пользователей
    // status = 1 создать нового пользователя

    if ((status === 1) || (this.listUsers.length === 0)) {
      const user = this.createNewUser(); // создаем пользователя
      // Добавляем в obj поля от user
      Object.entries(user).map(([key, value]) => obj[key] = value);
    } else {
      const index = Math.floor(Math.random() * this.listUsers.length);

      obj.author_id = this.listUsers[index].author_id;
      obj.author = this.listUsers[index].author;
      obj.avatar = this.listUsers[index].avatar;
      obj.image = this.listUsers[index].image;
    }

    this.listNewPosts.push(obj); // сохраняем новый пост в список
  },

  createNewUser() {
    // Создание нового пользователя
    const obj = {
      author_id: faker.string.uuid(),
      author: faker.person.fullName(),
      avatar: faker.internet.userName(),
      image: faker.image.avatar(),
    };
    this.listUsers.push(obj); // сохраняем нового пользователя
    return obj;
  },

  getComments(id) {
    // Получаем список комментариев к посту
    const post = this.listPosts.find((item) => item.id === id);
    let list = [];
    if (post) {
      const count = Math.floor(Math.random() * 10) + 1; // от 1 до 10
      for (let i = 0; i < count; i += 1) {
        const obj = this.createComments(post);
        list.push(obj);
      }
    }
    list = list.reverse().slice(0, 3);
    return list;
  },

  createComments(post) {
    // Создает комментарий к посту
    const date = faker.date.past();
    const user = this.createNewUser();

    const obj = {
      id: faker.string.uuid(),
      post_id: post.id,
      author_id: user.id,
      author: user.author,
      avatar: user.avatar,
      content: faker.internet.emoji(),
      created: date.getTime(),
    };
    return obj;
  },
};

module.exports = dataBase;
