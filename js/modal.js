const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.remove("invisible");
}

const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.add("invisible");
    modal.innerHTML = "";
}

const modifySubmitButtonOnClickHandler = (id) => {
    modifySubmitButton(id);
}

const modifySubmitButtonOnkeyUpHandler = (event, id) => {
    console.log(event.keyCode);
    if(event.keyCode === 13) {
        modifySubmitButton(id);
        closeModal();
    }
}

const modifySubmitButton = (id) => {
    const newTodoContent = document.querySelector(".modal-main .text-input").value;
    const todo = TodolistService.getInstance().getTodoById(id);

    if(todo.todoContent === newTodoContent || !newTodoContent) {
        return;
    }
    const todoObj = {
        ...todo,
        todoContent: newTodoContent
    }
    TodolistService.getInstance().setTodo(todoObj);
}

const modifyModal = (todo) => {
    const modal = document.querySelector(".modal");
    modal.innerHTML = `
        <div class="modal-container"> 
            <header class="modal-header">
                <h1 class="modal-title">
                    ToDo 수정
                </h1>
            </header>
            <main class="modal-main">
                <p class="modal-message">
                    ToDo를 수정해주세요.
                </p>
                <input type="text" class="text-input w-f" value="${todo.todoContent})" 
                    onkeyup="modifySubmitButtonOnkeyUpHandler(event, ${todo.id});">
            </main>
            <footer class="modal-footer">
                <button class="btn" onclick="modifySubmitButtonOnClickHandler(${todo.id}); closeModal();">확인</button>
                <button class="btn" onclick="closeModal();">닫기</button>
            </footer>
        </div>
    `;
}










