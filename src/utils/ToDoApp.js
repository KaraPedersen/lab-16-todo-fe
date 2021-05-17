import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('/api/auth/signup')
    .ok(res => res.status < 500)
    // .send(credentials);
    .send({ 
      name: credentials.name, 
      email: credentials.email,
      password: credentials.password
    });

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function signIn(credentials) {
  const response = await request
    .post('/api/auth/signin')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function addToDo(todo) {
  const response = await request
    .post('/api/todo')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(todo);

  return response.body;
}

export async function getToDos() {
  const response = await request
    .get('/api/me/todo')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function deleteToDo(id) {
  const response = await request
    .delete(`/api/todo/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

