// --- KHỞI TẠO BIẾN TOÀN CỤC & DOM ---
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskContainer = document.getElementById('taskContainer');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const taskModalTitle = document.getElementById('taskModalTitle');
const toastNotification = document.getElementById('toastNotification');

// Các phần tử thống kê số lượng
const countAllEl = document.getElementById('countAll');
const countDoneEl = document.getElementById('countDone');
const countPendingEl = document.getElementById('countPending');

// --- HÀM XỬ LÝ DỮ LIỆU ---

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showToast(message) {
    toastNotification.textContent = message;
    toastNotification.classList.remove('hidden');
    setTimeout(() => toastNotification.classList.add('hidden'), 3000);
}

function updateTaskSummary() {
    const total = tasks.length;
    const done = tasks.filter(t => t.completed).length;
    const pending = total - done;

    countAllEl.textContent = total;
    countDoneEl.textContent = done;
    countPendingEl.textContent = pending;
}

// Render dữ liệu ra giao diện dạng Card
function renderTasks() {
    taskContainer.innerHTML = '';

    if (tasks.length === 0) {
        taskContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px 0;">Không có công việc nào tồn tại. Bạn hãy nghỉ ngơi!</div>`;
        return;
    }

    tasks.forEach(task => {
        const card = document.createElement('div');
        // Thay đổi class CSS động theo trạng thái hoàn thành công việc
        card.className = `task-card ${task.completed ? 'is-completed' : ''}`;
        
        card.innerHTML = `
            <div class="card-top">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskStatus('${task.id}')">
                <div class="card-content">
                    <h4 class="title-text">${task.title}</h4>
                    <p class="desc-text">${task.desc || '<i>Không có mô tả</i>'}</p>
                </div>
            </div>
            <div class="card-meta">
                <span class="deadline-badge">📅 Hạn: ${formatDeadline(task.deadline)}</span>
                <span class="priority-tag ${task.priority.toLowerCase()}">${translatePriority(task.priority)}</span>
            </div>
            <div class="card-actions">
                <button class="btn-small edit" onclick="initEditTask('${task.id}')">Sửa</button>
                <button class="btn-small delete" onclick="deleteTask('${task.id}')">Xóa</button>
            </div>
        `;
        taskContainer.appendChild(card);
    });
}

function formatDeadline(dateStr) {
    if (!dateStr) return 'Không có';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function translatePriority(p) {
    if (p === 'High') return 'Cao';
    if (p === 'Medium') return 'Trung bình';
    return 'Thấp';
}

// --- ĐIỀU PHỐI ĐÓNG MỞ POPUP MODAL ---
function openModal(taskId = '') {
    taskModal.removeAttribute('aria-hidden');
    if (!taskId) {
        taskModalTitle.textContent = 'Tạo Công Việc Mới';
        taskForm.reset();
        document.getElementById('taskId').value = '';
    } else {
        taskModalTitle.textContent = 'Chỉnh Sửa Công Việc';
    }
}

function closeModal() {
    taskModal.setAttribute('aria-hidden', 'true');
    taskForm.reset();
}

// --- EVENT HANDLERS (THAO TÁC SỰ KIỆN) ---

// Bấm Submit Form (Thêm hoặc Sửa)
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('taskId').value;
    const title = document.getElementById('taskTitle').value.trim();
    const desc = document.getElementById('taskDesc').value.trim();
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;

    if (!title || !deadline) return;

    if (!id) {
        // Chế độ Thêm mới
        const newTask = {
            id: 'task_' + Date.now(),
            title, desc, deadline, priority,
            completed: false
        };
        tasks.push(newTask);
        showToast('Đã thêm công việc thành công.');
    } else {
        // Chế độ Cập nhật dữ liệu cũ
        const idx = tasks.findIndex(t => t.id === id);
        if (idx !== -1) {
            tasks[idx].title = title;
            tasks[idx].desc = desc;
            tasks[idx].deadline = deadline;
            tasks[idx].priority = priority;
            showToast('Đã cập nhật công việc thành công.');
        }
    }

    saveTasks();
    renderTasks();
    updateTaskSummary();
    closeModal();
});

// Bấm Checkbox đổi trạng thái hoàn thành trực tiếp
window.toggleTaskStatus = function(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateTaskSummary();
        showToast(task.completed ? 'Đã hoàn thành công việc!' : 'Đã mở lại công việc.');
    }
};

// Đưa dữ liệu lên form để chỉnh sửa
window.initEditTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    openModal(id);
    document.getElementById('taskId').value = task.id;
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.desc;
    document.getElementById('taskDeadline').value = task.deadline;
    document.getElementById('taskPriority').value = task.priority;
};

// Xóa công việc khỏi khay
window.deleteTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    if (confirm(`Bạn có chắc muốn xóa công việc "${task.title}" không?`)) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        updateTaskSummary();
        showToast('Đã xóa công việc khỏi danh sách.');
    }
};

// Gắn sự kiện nút bấm điều khiển đóng mở
document.getElementById('openTaskModal').addEventListener('click', () => openModal());
document.getElementById('closeTaskModal').addEventListener('click', closeModal);
document.getElementById('closeFormBtn').addEventListener('click', closeModal);

// Khởi chạy hệ thống ban đầu
renderTasks();
updateTaskSummary();