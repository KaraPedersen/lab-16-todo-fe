import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('/auth/signup')
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
    .post('/auth/signin')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function addToDo(todo) {
  const response = await request
    .post('/todos')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(todo);
  
  return response.body;
}

export async function getToDos() {
  const response = await request
    .get('/me/todos')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function updateTodoCompleted(todo) {
  const response = await request 
    .put(`/todos/${todo.id}`)
    .set(`Authorization`, window.localStorage.getItem('TOKEN'))
    .send(todo);
  return response.body;
}



export async function deleteToDo(id) {
  const response = await request
    .delete(`/todos/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

