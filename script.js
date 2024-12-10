// Get todos from localStorage or initialize empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// Function to save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to render todos
function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  // Filter todos based on the current filter
  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "completed") return todo.completed;
    if (currentFilter === "pending") return !todo.completed;
    return true; // Show all for the default filter
  });

  // Render the filtered todos
  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";

    li.innerHTML = `
      <div class="todo-content">
        <span class="todo-text">${todo.text}</span>
      </div>
      <div class="todo-actions">
        <button data-index="${index}" class="action-btn complete-btn">
          <i class="fas ${todo.completed ? "fa-rotate-left" : "fa-check"}"></i>
        </button>
        <button data-index="${index}" class="action-btn delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// Function to add new todo
function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
  }
  input.value = ""; // Clear input field after adding
}

// Function to toggle todo completion
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Function to delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Function to set the current filter and re-render todos
function setFilter(filter) {
  currentFilter = filter;
  renderTodos();

  // Update active tab styling
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
}

// Add event listeners
document.getElementById("addTodoBtn").addEventListener("click", addTodo);

document.getElementById("todoInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

document.getElementById("todoList").addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target) return;

  const todoIndex = parseInt(target.dataset.index);

  if (target.classList.contains("complete-btn")) {
    toggleTodo(todoIndex);
  } else if (target.classList.contains("delete-btn")) {
    deleteTodo(todoIndex);
  }
});

// Add filter functionality
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

// Initial render
renderTodos();
