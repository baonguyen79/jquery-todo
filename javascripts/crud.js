var FbApi = ((oldCrap) => {

	oldCrap.getTodos = (apiKeys) => {

		let items = [];

		return new Promise ((resolve, reject) => {
		 // $.ajax(`${apiKeys.databaseURL}/items.json`)
		 let uid = FbApi.credentialsCurrentUser().uid;
		 $.ajax(`${apiKeys.databaseURL}/items.json?orderBy="uid"&equalTo="${uid}"`)
		.done((data) => {
			let response = data;
			Object.keys(response).forEach((key) => {
				// console.log("key" , key);
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


//
oldCrap.addTodo = (apiKeys, newTodo) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url:`${apiKeys.databaseURL}/items.json`,
				data: JSON.stringify(newTodo)
			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			});
		});
	};
//
	

	oldCrap.checker = (apiKeys, id) => {
		return new Promise((resolve, reject) => {
			FbApi.setChecker(id);
			resolve();
		});
	};
//
oldCrap.deleteTodo = (apiKeys, id) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'DELETE',
				url:`${apiKeys.databaseURL}/items/${id}.json`
			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			});
		});
	};
//

	

oldCrap.editTodo = (apiKeys, editTask, id ) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
			 	method: `PUT`,
			 	url:`${apiKeys.databaseURL}/items/${id}.json`,
			 	data: JSON.stringify(editTask)
			 }).done(() => {
			 	resolve();
			 }).fail((error) => {
			 	reject(error);
	  		
	  		});	
		});
	};


	return oldCrap;

})(FbApi || {});