// --- 1. KHỞI TẠO STATE & DOM ---
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const filterButtons = document.querySelectorAll('.filter-btn');

// --- 2. HÀM CORE LOGIC & TRỰC QUAN GIAO DIỆN ---

// Lưu dữ liệu vào LocalStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render danh sách Todo (Dùng hoàn toàn createElement, KHÔNG dùng innerHTML cho item)
function render() {
    // Xóa sạch danh sách cũ mà không gây lỗi bảo mật
    todoList.textContent = ''; 

    // Lọc danh sách theo bộ lọc hiện tại
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    // Xây dựng cây DOM cho từng phần tử bằng createElement
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) li.classList.add('completed');
        li.dataset.id = todo.id;

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text; // Ngăn chặn hoàn toàn XSS tấn công

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;
        editInput.style.display = 'none';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '❌';

        li.appendChild(span);
        li.appendChild(editInput);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    // Cập nhật bộ đếm số việc chưa hoàn thành
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

    // Ẩn/Hiện nút xoá các việc đã xong
    const hasCompleted = todos.some(t => t.completed);
    clearCompletedBtn.style.visibility = hasCompleted ? 'visible' : 'hidden';
}

function saveAndRender() {
    saveTodos();
    render();
}

// --- 3. ĐĂNG KÝ SỰ KIỆN (EVENT LISTENERS) ---

// Thêm Todo mới
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    todos.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    todoInput.value = '';
    saveAndRender();
});

// THỰC HIỆN EVENT DELEGATION TRÊN MỘT THẰNG CHA DUY NHẤT (#todoList)
// A. Click Event: Cho tính năng Xóa và Toggle Completed
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.classList.contains('delete-btn')) {
        // Chức năng Xóa
        todos = todos.filter(t => t.id !== id);
        saveAndRender();
    } else if (e.target.classList.contains('todo-text')) {
        // Chức năng Toggle Hoàn thành
        todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveAndRender();
    }
});

// B. Double Click Event: Kích hoạt chế độ Edit
todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('todo-text')) {
        const li = e.target.closest('.todo-item');
        const span = e.target;
        const editInput = li.querySelector('.edit-input');

        li.classList.add('editing');
        span.style.display = 'none';
        editInput.style.display = 'block';
        editInput.focus();
        
        // Đẩy con trỏ chuột về cuối chữ
        const length = editInput.value.length;
        editInput.setSelectionRange(length, length);
    }
});

// C. Keydown & Focusout Event: Xử lý lưu kết quả sửa đổi khi nhấn Enter hoặc click ra ngoài
todoList.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('edit-input') && e.key === 'Enter') {
        e.target.blur(); // Chuyển giao việc xử lý cho sự kiện 'focusout' bên dưới
    }
});

todoList.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('edit-input')) {
        const li = e.target.closest('.todo-item');
        const id = Number(li.dataset.id);
        const newText = e.target.value.trim();

        if (newText) {
            todos = todos.map(t => t.id === id ? { ...t, text: newText } : t);
            saveAndRender();
        } else {
            // Nếu xóa hết chữ, tự động coi là hành động Xóa todo
            todos = todos.filter(t => t.id !== id);
            saveAndRender();
        }
    }
});

// Xử lý sự kiện bộ lọc danh sách (Filter: All / Active / Completed)
filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        render();
    });
});

// Xóa tất cả Todo đã hoàn thành
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveAndRender();
});

// Lần chạy ứng dụng đầu tiên để kéo dữ liệu từ LocalStorage ra
render();