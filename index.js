const tasks = [
    {
        id: '1138465078061',
        completed: false,
        text: 'Посмотреть новый урок по JavaScript',
    },
    {
        id: '1138465078062',
        completed: false,
        text: 'Выполнить тест после урока',
    },
    {
        id: '1138465078063',
        completed: false,
        text: 'Выполнить ДЗ после урока',
    },
];
let isToggle = true;

function renderTask(parent, task) {
    let div1 = document.createElement("div"),
        div2 = document.createElement("div"),
        div3 = document.createElement("div"),
        form = document.createElement("form"),
        input = document.createElement("input"),
        label = document.createElement("label"),
        span = document.createElement("span"),
        button = document.createElement("button");
    div1.className = "task-item";
    div1.dataset.taskId = task.id;
    div2.className = "task-item__main-container";
    div3.className = "task-item__main-content";
    form.className = "checkbox-form";
    input.className = "checkbox-form__checkbox";
    input.type = "checkbox";
    input.id = "task-" + task.id;
    label.htmlFor = "task-" + task.id;
    span.className = "task-item__text";
    span.innerText = task.text;
    button.className = "task-item__delete-button default-button delete-button";
    button.dataset.deleteTaskId = task.id;
    button.textContent = " Удалить ";
    form.append(input, " ", label);
    div3.append(form, " ", span);
    div2.append(div3, " ", button)
    div1.append(div2);

    parent.append(div1);
}

function renderModal(parent) {
    let str = `<div class="modal-overlay modal-overlay_hidden">
<div class="delete-modal">
  <h3 class="delete-modal__question">
    Вы действительно хотите удалить эту задачу?
  </h3>
  <div class="delete-modal__buttons">
    <button class="delete-modal__button delete-modal__cancel-button">
      Отмена
    </button>
    <button class="delete-modal__button delete-modal__confirm-button">
      Удалить
    </button>
  </div>
</div>
</div>`;
    parent.insertAdjacentHTML("beforeend", str);
}

function taskLisClick(event) {
    let {target} = event;
    if (target.matches("button.task-item__delete-button")) {
        deleteTaskId = +target.dataset.deleteTaskId;
        delModal.classList.remove("modal-overlay_hidden");
    }
}

function deleteCancelClick(event) {
    event.preventDefault();
    delModal.classList.add("modal-overlay_hidden");
}

function deleteConfirmClick(event) {
    event.preventDefault();
    let index = tasks.findIndex(e => e.id === deleteTaskId);
    tasks.splice(index, 1);
    taskList.querySelector(`div[data-task-id="${deleteTaskId}"]`).remove();
    delModal.classList.add("modal-overlay_hidden");
}

function validateInput() {
    let text = input.value,
        task = tasks.find(e => e.text === text);
    input.setCustomValidity(task ? "Задача с таким названием уже существует." : "");
    return input.checkValidity();
}

function formSubmit(event) {
    event.preventDefault();
    form.querySelector(".error-message-block")?.remove();

    if (!validateInput()) {
        let obj = input.validity,
            message = obj.valueMissing
                ? "Название задачи не должно быть пустым"
                : input.validationMessage;
        let span = document.createElement("span");
        span.className = "error-message-block";
        span.textContent = message;
        form.append(span);
        return;
    }
    ++idCounter;
    let task = {
        id: idCounter,
        text: input.value
    };
    tasks.push(task);
    input.value = "";
    renderTask(taskList, task);
    updateStyleTasks();
}

let idCounter = 3;
renderModal(document.body);
let delModal = document.body.lastElementChild;

let taskList = document.querySelector(".tasks-list");
for (let task of tasks) {
    renderTask(taskList, task);
}

let form = document.querySelector(".create-task-block"),
    input = form.taskName;

input.value = "";
form.noValidate = true;
input.required = true;

form.onsubmit = formSubmit;

taskList.addEventListener("click", taskLisClick);
delModal.querySelector(".delete-modal__cancel-button").onclick = deleteCancelClick;
delModal.querySelector(".delete-modal__confirm-button").onclick = deleteConfirmClick;
let deleteTaskId;

let updateStyleTasks = function () {
    let body = document.querySelector('body'),
        tasItemAll = document.querySelectorAll('.task-item'),
        buttonAll = document.querySelectorAll('button');

    if (isToggle) {
        body.style.backgroundColor = 'initial';
        for (let i = 0; i < tasItemAll.length; i++) {
            tasItemAll[i].style.color = 'initial';
        }
        for (let i = 0; i < buttonAll.length; i++) {
            buttonAll[i].style.border = 'none';
        }
    } else {
        body.style.backgroundColor = '#24292E';
        for (let i = 0; i < tasItemAll.length; i++) {
            tasItemAll[i].style.color = '#ffffff';
        }
        for (let i = 0; i < buttonAll.length; i++) {
            buttonAll[i].style.border = '1px solid #ffffff';
        }
    }

};

document.addEventListener('keydown', (event) => {
    const {key} = event;
    if (key === '0') {
        isToggle = !isToggle;
        updateStyleTasks();
    }
})