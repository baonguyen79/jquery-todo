$(document).ready(function(){

	let apiKeys;

	$('#new-item').click(() => {
		$('.list-container').addClass('hide');
		$('.new-container').removeClass('hide');
	});

	$('#list-items').click(() => {
		$('.new-container').addClass('hide');
		$('.list-container').removeClass('hide');
	});

	//get todo
	FbApi.firebaseCredentials().then((keys) => {
		apiKeys = keys;
		firebase.initializeApp(apiKeys);
		FbApi.writeToDom(apiKeys);
		countTask();

	
	})
	.catch((error) => {
		console.log("getTodos Error", error);
	});

	//add todo
	$('#add-todo-button').click(() => {
		let newTodo = {
			isComplete: false,
			task: $('#add-todo-text').val()
		};
		console.log("newTodo", newTodo);

		FbApi.addTodo(newTodo).then(() => {
			$('#add-todo-text').val("");
			$('.new-container').addClass("hide");
			$('.list-container').removeClass('hide');
			FbApi.writeToDom(apiKeys);
			countTask();

		}).catch((error) => {
			console.log("addTodoError", error);

		});

	});

	//delete todo
	$('.main-container').on('click', '.delete', (e) => {
		FbApi.deleteTodo(apiKeys, e.target.id).
		then(() => {
			FbApi.writeToDom(apiKeys);
			countTask();
		})
		.catch((error) => {
			console.log("error in deleteTodo", error);
		});
	});


	//edit todo
	$('.main-container').on('click', '.edit' , (e) => {
		let editText = $(e.target).closest('.col-xs-4').siblings('.col-xs-8').find('.task').html();
		FbApi.editTodo(e.target.id).then(() => {
			$('.list-container').addClass('hide');
			$('.new-container').removeClass('hide');
			$('#add-todo-text').val(editText);
			console.log("editText", editText);

		})
		.catch((error) => {
			console.log("error from editTodo" , error);
		});
	});



	//complete todo
	$('.main-container').on('click', 'input[type="checkbox"]', (e) => {
		FbApi.checker(e.target.id).then(() => {
			FbApi.writeToDom(apiKeys);
			countTask();
		}).catch((error) => {
  		console.log("checker error", error);
  		});
	}); 

	let countTask = () => {
		let remainingTask = $('#incomplete-tasks li').length;
		$('#counter').hide().fadeIn(3000).html(remainingTask);
	};

});