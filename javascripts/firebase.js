var FbApi = (() => {
	let todos = [];

	return {
		todoGetter: () => {
			return todos;
		},
		setTodos : (newArray) => {
			todos = newArray;
		},
		setSingleTodo : (newObject) => {
			todos.push(newObject);
		},
		setChecker: (itemId) => {
			const position = itemId.split("item")[1]; //return item1["",1]
			todos[position].isCompleted = !todos[position].isCompleted; 
		},
		doDelete: (Id) => {
			const position = Id.split("item")[1];
			todos.splice(position, 1);
		}
	};
})();