window.addEventListener('load', () => {
    showTask();

    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');
    const blank_alert = document.querySelector('#blank-alert');

    form.addEventListener('submit', (e) => {
        // Avoiding auto-refresh of the webpage:
        e.preventDefault();

        const task = input.value;
        if (!task) {
            blank_alert.innerHTML = `<p>&#10680;</p>
            <span>Task cannot be empty</span>`;
            input.style.border = "0.5px solid #ff2121";
            input.style.boxShadow = "none";
        }
        else {
            blank_alert.innerHTML = ``;
            input.style.border = "none";
            input.style.boxShadow = "0px 0px 5px rgba(255, 255, 255, 0.4), 0px 0px 5px rgba(255, 255, 255, 0.4) inset";

            let addTxt = document.querySelector('#new-task-input');
            let task_array = localStorage.getItem("task_array");
            if (task_array == null) {
                notesObj = [];
            }
            else {
                notesObj = JSON.parse(task_array);
            }
            notesObj.push(addTxt.value);
            localStorage.setItem("task_array", JSON.stringify(notesObj));
            addTxt.value = "";
            console.log(notesObj);

            showTask();

        }
    });
});

// Function definition to add & show a Task:
function showTask() {
    let task_array = localStorage.getItem("task_array");
    if (task_array == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(task_array);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="task">
        <div class="content">
            <input 
            type="text"
            class="text"
            value="${element}" 
            readonly />
        </div>

        <div class="actions">
            <button id="Edit${index}" onclick="editTask(this.id)" class="edit"><img src="edit-pen.png" alt="image/edit"></button>
            <button id="${index}" onclick="deleteTask(this.id)" class="delete"><img src="delete.png" alt="image/delete"></button>
        </div>
        </div> 
        `;
    });
    let notesElm = document.getElementById('tasks');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Your tasks will appear here.`;
    }
}

// Function to edit a task:
function editTask(index) {
    index = index.slice(4);
    let task_array = localStorage.getItem("task_array");
    notesObj = JSON.parse(task_array);

    edit = document.getElementsByClassName('task')[index].querySelector(".edit");
    let text_val = document.getElementsByClassName('task')[index].querySelector('.text');
    if (edit.innerHTML == `<img src="edit-pen.png" alt="image/edit">`) {
        text_val.removeAttribute('readonly');
        text_val.focus();
        edit.innerHTML = `<img class="save" src="save.png" alt="image/edit">`;
    }
    else {
        text_val.setAttribute("readonly", "readonly");
        edit.innerHTML = `<img src="edit-pen.png" alt="image/edit">`;
        notesObj[index] = text_val.value;
        localStorage.setItem("task_array", JSON.stringify(notesObj));
        showTask();
    }

}

// Function to delete a task:
function deleteTask(index) {
    console.log("Deleted task of index " + index);
    let task_array = localStorage.getItem("task_array");
    if (task_array == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(task_array);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("task_array", JSON.stringify(notesObj));
    showTask();
}