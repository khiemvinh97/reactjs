
  
  function deleteTodo(index) {
    return {
      type: 'DELETE_TODO',
      index: index
    };
  }

  export default deleteTodo;

  