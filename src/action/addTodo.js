function addTodo(message) {
    return {
      type: 'ADD_TODO',
      message: message,
      completed: false
    };
  }

  export default addTodo;
