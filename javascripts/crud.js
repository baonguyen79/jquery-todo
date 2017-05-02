var FbApi = ((oldCrap) => {

	oldCrap.getTodos = (apiKeys) => {

		let items = [];

		return new Promise ((resolve, reject) => {
		 $.ajax(`${apiKeys.databaseURL}/items.json`)
		.done((data) => {
			let response = data;
			Object.keys(response).forEach((key) => {
				console.log("key" , key);
				response[key].id = key;
				items.push(response[key]);
			});
			// FbApi.setTodos(items);
			resolve(items);
		})
		.fail((error) => {
			reject(error);

		});
	  });	
	};

	  oldCrap.addTodo = (newTodo) => {
	  	return new Promise ((resolve, reject) => {
	  		newTodo.id = `item${FbApi.todoGetter().length}`;
	  		console.log (newTodo);
	  		FbApi.setSingleTodo(newTodo);

	  		resolve();
	  	});
		
	};

	oldCrap.checker = (apiKeys, id) => {
		return new Promise((resolve, reject) => {
			FbApi.setChecker(id);
			resolve();
		});
	};


	oldCrap.deleteTodo = (apiKeys, id) => {
		return new Promise ((resolve, reject) => {
			 $.ajax({
			 	method: `DELETE`,
			 	url:`${apiKeys.databaseURL}/items/${id}.json`
			 }).done(() => {
			 	resolve();
			 }).fail(() => {
			 	reject(error);
			 })
			
			resolve();
		});
	};

oldCrap.editTodo = (apiKeys, id) => {
		return new Promise ((resolve, reject) => {
			FbApi.doDelete(id);
			resolve();
		});
	};


	return oldCrap;

})(FbApi || {});