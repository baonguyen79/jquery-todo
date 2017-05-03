$(document).ready(function(){

	let apiKeys;
	let editId = "";

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

	
	})
	.catch((error) => {
		console.log("getTodos Error", error);
	});

	 //add todo
  $('#add-todo-button').click(() => {
      let newTodo = {
          isCompleted: false,
          task: $('#add-todo-text').val()
      };
    if(editId.length > 0){
      //edit
      FbApi.editTodo(apiKeys, newTodo, editId).then(() => {
        $('#add-todo-text').val("");
        editId = "";
        $('.new-container').addClass('hide');
        $('.list-container').removeClass('hide');
        FbApi.writeToDom(apiKeys);
      }).catch((error) => {
        console.log("addTodo error", error);
      });
    } else{
      FbApi.addTodo(apiKeys, newTodo).then(() => {
        $('#add-todo-text').val("");
        $('.new-container').addClass('hide');
        $('.list-container').removeClass('hide');
        FbApi.writeToDom(apiKeys);
      }).catch((error) => {
        console.log("addTodo error", error);
      });      
    }
  });


	//delete todo
	$('.main-container').on('click', '.delete', (e) => {
		FbApi.deleteTodo(apiKeys, e.target.id)
		.then(() => {
			FbApi.writeToDom(apiKeys);
		})
		.catch((error) => {
			console.log("error in deleteTodo", error);
		});
	});


	//edit todo
	$('.main-container').on('click', '.edit' , (e) => {
		let editText = $(e.target).closest('.col-xs-4').siblings('.col-xs-8').find('.task').html();
		editId = e.target.id;
			$('.list-container').addClass('hide');
			$('.new-container').removeClass('hide');
			$('#add-todo-text').val(editText);
			// console.log("editText", editText);

		});
		
	//
	 // //complete todos
  // $('.main-container').on('click', 'input[type="checkbox"]', (event)=>{
  // 	let myTodo = {
  //     isCompleted: event.target.checked,
  //     task: $(event.target).siblings('.task').html()
  //   };
  //   FbApi.editTodo(apiKeys, myTodo,event.target.id).then(() =>{
  // 		FbApi.writeDom(apiKeys);
  // 	}).catch((error) => {
  // 		console.log("checker error", error);
  // 	});
  // });

	//

	//complete todo
	$('.main-container').on('click', 'input[type="checkbox"]', (e) => {
		let myTodo = {
			isCompleted: e.target.checked,
			task: $(e.target).siblings('.task').html()
		};
		FbApi.editTodo(apiKeys, myTodo, e.target.id).then(() => {
			FbApi.writeToDom(apiKeys);
		}).catch((error) => {
  		console.log("checker error", error);
  		});
	}); 

	
	$('#registerButton').click(() => {
		let email = $('#inputEmail').val();
		let password = $('#inputPassword').val();
		let username = $('#inputUsername').val();

		let user = {email: email, password: password};   // ES6
		// let user = {
		// 	"email": email,
		// 	"password": password
		// }
		// console.log("FbApi", FbApi);

		


		FbApi.registerUser(user).then((response) => {
			console.log("register response", response.uid);
			let newUser = {
				uid: response.uid,
				username: username
			};
			FbApi.addUser(apiKeys, newUser).then((response) => {
				
				FbApi.loginUser(user).then((response) => {
				clearLogin();
				$('#login-container').addClass('hide');
				$('.main-container').removeClass('hide');
				FbApi.writeToDom(apiKeys);

		}).catch((error) => {
			console.log("error in loginUser", error);
		});
			}).catch((error) => {
				console.log("error in addUser", error);
			});
		}).catch((error) => {
			console.log("error in registerUser", error);
		}); 
	});

	let clearLogin = () => {
		$('#inputEmail').val("");
		$('#inputPassword').val("");
		$('#inputUSername').val("");
	}

	$('#loginButton').click(() => {
		let email = $('#inputEmail').val();
		let password = $('#inputPassword').val();
		let user = {email, password};

		FbApi.loginUser(user).then((response) => {
			clearLogin();
			$('#login-container').addClass('hide');
			$('.main-container').removeClass('hide');
			FbApi.writeToDom(apiKeys);

		}).catch((error) => {
			console.log("error in loginUser", error);
		});
	})

});