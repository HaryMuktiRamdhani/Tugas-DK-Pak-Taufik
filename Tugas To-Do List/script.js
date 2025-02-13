
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const categorySelect = document.getElementById("category");
const filterSelect = document.getElementById("filter");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");
const clearAllButton = document.getElementById("clear-all");
const colorPicker = document.getElementById("color-picker");
const darkModeButton = document.getElementById("dark-mode-toggle");


if (darkModeButton) {
    darkModeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}


function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#list-container li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").innerText,
            completed: li.classList.contains("completed"),
            category: li.dataset.category,
            color: li.style.backgroundColor
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    listContainer.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.completed, task.color, task.category, false));
    updateCounter();
}


function addTask(taskText = null, completed = false, taskColor = null, taskCategory = null, save = true) {
    if (!taskText && save) {
        taskText = inputBox.value.trim();
        taskColor = colorPicker.value;
        taskCategory = categorySelect.value;

        if (!taskText) {
            alert("Silakan masukkan tugas!");
            return;
        }
    }

    const li = document.createElement("li");
    li.style.backgroundColor = taskColor;
    li.classList.add("task-item");
    li.dataset.category = taskCategory;

    li.innerHTML = `
        <label style="flex: 1; display: flex; align-items: center;">
            <input type="checkbox" class="task-checkbox" ${completed ? "checked" : ""}>
            <span class="task-text">${taskText} <small>(${taskCategory})</small></span>
        </label>
        <div class="button-group">
            <button class="edit-btn">✏</button>
            <button class="delete-btn">❌</button>
        </div>
    `;

    if (completed) {
        li.classList.add("completed");
    }

    listContainer.appendChild(li);
    inputBox.value = "";

    if (save) saveTasks();
    updateCounter();

    
    const checkbox = li.querySelector(".task-checkbox");
    checkbox.addEventListener("change", function () {
        li.classList.toggle("completed", checkbox.checked);
        saveTasks();
        updateCounter();
        filterTasks();
    });

    
    li.querySelector(".edit-btn").addEventListener("click", function () {
        const newText = prompt("Edit tugas:", taskText);
        if (newText) {
          li.querySelector(".task-text").innerHTML = newText + " <small>(" + taskCategory + ")</small>";
        }
    });

    
    li.querySelector(".delete-btn").addEventListener("click", function () {
        if (confirm("Hapus tugas ini?")) {
            li.remove();
            saveTasks();
            updateCounter();
        }
    });

    filterTasks();
}


function filterTasks() {
    const filterValue = filterSelect.value;
    document.querySelectorAll(".task-item").forEach(li => {
        const category = li.dataset.category;
        const isCompleted = li.classList.contains("completed");

        if (
            filterValue === "Semua" ||
            category === filterValue ||
            (filterValue === "Selesai" && isCompleted) ||
            (filterValue === "Belum Selesai" && !isCompleted)
        ) {
            li.style.display = "flex";
        } else {
            li.style.display = "none";
        }
    });
}


function updateCounter() {
    const totalTasks = document.querySelectorAll(".task-item").length;
    const completedTasks = document.querySelectorAll(".task-item.completed").length;
    const uncompletedTasks = totalTasks - completedTasks;

    completedCounter.innerText = completedTasks;
    uncompletedCounter.innerText = uncompletedTasks;
}


filterSelect.addEventListener("change", filterTasks);


clearAllButton.addEventListener("click", () => {
    if (confirm("Hapus semua tugas?")) {
        listContainer.innerHTML = "";
        localStorage.removeItem("tasks");
        updateCounter();
    }
});


loadTasks();