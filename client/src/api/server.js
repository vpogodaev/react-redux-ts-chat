import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,
    models: {
      user: Model,
    },

    seeds(server) {
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
    },

    routes() {
      this.namespace = 'api';

      this.get('/users', (schema) => {
        return schema.users.all();
      });
      this.get('/users/online', (schema) => {
        return schema.users.where({ status: 'online' });
      });

      this.post('/users/login', (schema, request) => {
        let newUser = JSON.parse(request.requestBody);
        //console.log('server', newUser);

        if (!newUser.name) {
          return new Response(400, {}, { errors: 'Name cannot be blank' });
        }
        let user = schema.users.findBy({ name: newUser.name });
        if (user) {
          return new Response(409, {}, { errors: 'Name is taken' });
        }

        return schema.users.create({ ...newUser, status: 'online' }).attrs;
      });
    },
  });

  return server;
}
