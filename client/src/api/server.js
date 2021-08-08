import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,
    models: {
      user: Model,
      message: Model,
    },
    //timing: 10000000,

    seeds(server) {
      // users
      server.create('user', { name: 'Bob', id: 1, status: 'offline' });
      server.create('user', { name: 'Alice', id: 2, status: 'online' });
      server.create('user', { name: 'Fred', id: 3, status: 'offline' });
      server.create('user', { name: 'Mr. Bond', id: 4, status: 'online' });
      server.create('user', { name: 'John', id: 5, status: 'offline' });
      server.create('user', {
        name: '0123456789 0123456789',
        id: 6,
        status: 'online',
      });
      server.create('user', {
        name: '01234567890123456789',
        id: 7,
        status: 'online',
      });

      // messages
      server.create('message', {
        id: 1,
        text: 'Hello, mf!',
        timestamp: Date.now() - 10,
        userId: '1',
        userName: 'Bob',
      });
      server.create('message', {
        id: 2,
        text: 'Hello, you too!',
        timestamp: Date.now() - 5,
        userId: '0',
        userName: 'Me',
      });
      server.create('message', {
        id: 3,
        text: 'It is my message',
        timestamp: Date.now() - 5,
        userId: '8',
        userName: 'asd',
      });
      server.create('message', {
        id: 4,
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia voluptatum tempore totam corrupti voluptates distinctio, ducimus provident iure quibusdam quas praesentium repellendus porro eaque laudantium similique perferendis dolore at nam.',
        timestamp: Date.now() - 5,
        userId: '2',
        userName: 'Alice',
      });
      server.create('message', {
        id: 5,
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia voluptatum tempore totam corrupti voluptates distinctio, ducimus provident iure quibusdam quas praesentium repellendus porro eaque laudantium similique perferendis dolore at nam.',
        timestamp: Date.now() - 5,
        userId: '2',
        userName: 'Alice',
      });
      server.create('message', {
        id: 6,
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia voluptatum tempore totam corrupti voluptates distinctio, ducimus provident iure quibusdam quas praesentium repellendus porro eaque laudantium similique perferendis dolore at nam.',
        timestamp: Date.now() - 5,
        userId: '1',
        userName: 'Bob',
      });
      server.create('message', {
        id: 7,
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia voluptatum tempore totam corrupti voluptates distinctio, ducimus provident iure quibusdam quas praesentium repellendus porro eaque laudantium similique perferendis dolore at nam.',
        timestamp: Date.now() - 5,
        userId: '3',
        userName: 'Fred',
      });
      server.create('message', {
        id: 8,
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia voluptatum tempore totam corrupti voluptates distinctio, ducimus provident iure quibusdam quas praesentium repellendus porro eaque laudantium similique perferendis dolore at nam.',
        timestamp: Date.now() - 5,
        userId: '4',
        userName: 'Mr. Bond',
      });
      server.create('message', {
        id: 9,
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia voluptatum tempore totam corrupti voluptates distinctio, ducimus provident iure quibusdam quas praesentium repellendus porro eaque laudantium similique perferendis dolore at nam.',
        timestamp: Date.now() - 5,
        userId: '8',
        userName: 'asd',
      });
      server.create('message', {
        id: 10,
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia voluptatum tempore totam corrupti voluptates distinctio, ducimus provident iure quibusdam quas praesentium repellendus porro eaque laudantium similique perferendis dolore at nam.',
        timestamp: Date.now() - 5,
        userId: '0',
        userName: 'Me',
      });
      server.create('message', {
        id: 11,
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia voluptatum tempore totam corrupti voluptates distinctio, ducimus provident iure quibusdam quas praesentium repellendus porro eaque laudantium similique perferendis dolore at nam.',
        timestamp: Date.now() - 5,
        userId: '4',
        userName: 'Mr. Bond',
      });
    },

    routes() {
      this.namespace = 'api';

      // users
      this.get('/users', (schema) => {
        return schema.users.all();
      });
      this.get('/users/online', (schema) => {
        return schema.users.where({ status: 'online' });
      });
      this.post('/users/login', (schema, request) => {
        let newUser = JSON.parse(request.requestBody);

        if (!newUser.name) {
          return new Response(400, {}, { errors: 'Name cannot be blank' });
        }
        let user = schema.users.findBy({ name: newUser.name });
        if (user) {
          return new Response(409, {}, { errors: 'Name is taken' });
        }

        return schema.users.create({ ...newUser, status: 'online' }).attrs;
      });

      // messages
      this.get('messages', (schema) => {
        return schema.messages.all();
      });
      this.post('/messages/post', (schema, request) => {
        let newMessage = JSON.parse(request.requestBody);

        if (!newMessage.text) {
          return new Response(400, {}, { errors: 'Message cannot be blank' });
        }
        if (!newMessage.userId) {
          return new Response(400, {}, { errors: 'User needed' });
        }

        let user = schema.users.findBy({ id: newMessage.userId });
        if (!user) {
          return new Response(400, {}, { errors: 'User not found' });
        }

        return schema.messages.create({
          ...newMessage,
          userName: user.name,
          timestamp: Date.now(),
        });
      });
    },
  });

  return server;
}
