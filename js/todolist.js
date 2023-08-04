const addTodoButtonOnClickHandler = () => {   
    generateTodoObj();
}

const addTodoOnKeyUpHandler = (event) => {
    if(event.keyCode === 13) {
        generateTodoObj();
    }
}

const checkedOnChangeHandler = (target) => {
    TodolistService.getInstance().setCompletStatus(target.value, target.checked);
}

const modifyTodoOnClickHandler = (target) => {
    // 클릭하면 modal창 띄우고 id값이 같은 list의 todo 불러오고 input value 받아서 객체 안에 content내용 바꾸고 저장하고 뿌려주기?
    openModal();
    modifyModal(TodolistService.getInstance().getTodoById(target.value));
    
}       

const deleteTodoOnClickHandler = (target) => {
    
    TodolistService.getInstance().removeTodo(target.value);
}

const generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-header-items .text-input").value;
    const todoObj = {
        id: 0,
        todoContent: todoContent,
        createDate: DateUtills.toStringByFormatting(new Date()),
        completStatus: false
    };

    TodolistService.getInstance().addTodo(todoObj);
}

class TodolistService {
    static #instance = null;

    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new TodolistService();
        }
        return this.#instance;
    }

    todoList = new Array();
    todoIndex = 1;

    constructor() {
        this.loadTodoList();
    }
    
    // JSON.parse(Json 문자열) : JSON 문자열 -> 객체로 변환 // JSON.stringify(객체) : 객체 -> JSON 문자열로 변환
    loadTodoList() {
        // localStorage : web browser에 저장되는 데이터. 삭제하지 않으면 남아있음
        // true면 값을 JSON 문자열 -> 객체로 변환 false면 빈배열 만듬
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
                                                      // js문법 - ? : 값이 없을 수도 있음. 값이 없으면 참조X
        this.todoIndex = !!this.todoList[this.todoList.length - 1]?.id ? this.todoList[this.todoList.length - 1].id + 1: 1;
    }

    saveLocalStoreage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

    getTodoById(id) {
        // console.log(this.todoList);
        // console.log(this.todoList.filter(todo => todo.id === parseInt(id)));
        // console.log(this.todoList.filter(todo => todo.id === parseInt(id))[0]);
        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }
    
    addTodo(todoObj) {
        const todo = {
            ...todoObj,
            id: this.todoIndex
        }
        this.todoList.push(todo);

        this.saveLocalStoreage();

        this.updateTodoList();
        
        this.todoIndex++;
    }

    setCompletStatus(id, status) {
        this.todoList.forEach((todo, index) => {
            if(todo.id === parseInt(id)) {
                this.todoList[index].completStatus = status;
            }
        });
        this.saveLocalStoreage();
    }

    setTodo(todoObj) {
        for(let i = 0; i < this.todoList.length; i++) {
            if(this.todoList[i].id === todoObj.id) {
                this.todoList[i] = todoObj;
                break;
            }
        }
        this.saveLocalStoreage();

        this.updateTodoList();
    }

    removeTodo(id) {
        // 새창 만들어서 하는게 나을듯?
        if(confirm("삭제 하시겠습니까?")) {
            this.todoList = this.todoList.filter((todo) => {
                return todo.id !== parseInt(id);
            });
    
            this.saveLocalStoreage();
            this.updateTodoList();
        } else {
            return;
        }
        
    }

    updateTodoList() {
        const todoListMainContainer = document.querySelector(".todolist-main-container");

        todoListMainContainer.innerHTML = this.todoList.map((todo) => {
            return `
                <li class="todolist-items">
                    <div class="item-left">
                        <input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs" 
                            ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandler(this);">
                        <label for="complet-chkbox${todo.id}"></label>
                    </div>
                    <div class="item-center">
                        <pre class="todolist-content">${todo.todoContent}</pre>
                    </div>
                    <div class="item-right">
                        <p class="todolist-date">${todo.createDate}</p>
                        <div class="todolist-item-buttons">
                            <button class="btn btn-edit" value="${todo.id}" onclick="modifyTodoOnClickHandler(this)">수정</button>
                            <button class="btn btn-remove" value="${todo.id}" onclick="deleteTodoOnClickHandler(this);">삭제</button>
                        </div>
                    </div>
                </li>
            `;
        }).join("");
    }


}




