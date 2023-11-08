window.addEventListener('load', ()=> {
    // unlocks string.  global var. no const or let
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    //selectors of html elements
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    // get username from local storage
    const username = localStorage.getItem('username') || '';
    //set input field to username
    nameInput.value = username;
    // set username in local storage to input value
    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value)
    });

    newTodoForm.addEventListener('submit', (e)=> {
        e.preventDefault();
        //gets input values for new todos and time.
        const todo = {
            // name:'' in html input for form
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done:false,
            createdAt: new Date().getTime()
        }
        //push new todo to array
        todos.push(todo);
        //save todos to local storage. turn into json string
        localStorage.setItem('todos',JSON.stringify(todos));
        //resets the form
        e.target.reset();

        DisplayTodos();
    });

    DisplayTodos();
});

function DisplayTodos () {
    // selects the todolist Div
    const todoList = document.querySelector('#todo-list');
    //clears all elements
    todoList.innerHTML = '';
    //todo is global due to no let in line 3. loop over localstorage and new inputs
    todos.forEach(todo =>{
        //create a div
        const todoItem = document.createElement('div');
        //add class to div
        todoItem.classList.add('todo-item');
        //create more elements
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');
        //makes input a checkbox 
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        //adds either personal or business to class
        if (todo.category == 'personal'){
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }
        //add classes to elements
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('edit');
        //adds content div to html with input set to todo.content
        content.innerHTML = ` <input type='text' value='${todo.content}' readonly>`;
        // edit and delete button html
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';
        //assign elements to their labels and divs 
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        // assign above elements to the todoItem Div
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        //assign   todoItem to the todoList
        todoList.appendChild(todoItem);
        //if done is true
        if(todo.done){
            //add done class
            todoItem.classList.add('done');
        }
        //when clicked toggle done
        input.addEventListener('click', (e) => {
            todo.done = e.target.checked;
            // set to local storage
            localStorage.setItem('todos', JSON.stringify(todos));
            //adds removes done class on check
            if(todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }
            //redisplay after changes
            DisplayTodos();
        });

        edit.addEventListener('click', (e)=>{
            const input = content.querySelector('input');
            //removes read only on edit button click
            input.removeAttribute('readonly');
            //focus's into the input
            input.focus();
            // when clicking out 
            input.addEventListener('blur', (e)=>{
                //turns input back to read only
                input.setAttribute('readonly', true);
                //new value set to the content div
                todo.content = e.target.value;
                //set to local storage
                localStorage.setItem('todos', JSON.stringify(todos));
                //redisplay after changes
                DisplayTodos();
            });
        });

        deleteButton.addEventListener('click', (e)=>{
            //if t isnt equal to todo delete it.
            todos = todos.filter(t => t !==todo)
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    });
}