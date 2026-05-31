// --- KHỞI TẠO BIẾN TOÀN CỤC & DOM ---
let students = JSON.parse(localStorage.getItem('students')) || [];

const studentTableBody = document.getElementById('studentTableBody');
const studentModal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const modalTitle = document.getElementById('modalTitle');
const formMode = document.getElementById('formMode');
const alertContainer = document.getElementById('alertContainer');

// Các phần tử thống kê
const totalStudentsEl = document.getElementById('totalStudents');
const classAverageEl = document.getElementById('classAverage');

// --- HÀM CORE CHỨC NĂNG ---

// 1. Lưu LocalStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// 2. Cập nhật số liệu thống kê
function updateStatistics() {
    totalStudentsEl.textContent = students.length;
    if (students.length === 0) {
        classAverageEl.textContent = '0.0';
        return;
    }
    const sum = students.reduce((acc, student) => acc + parseFloat(student.gpa), 0);
    classAverageEl.textContent = (sum / students.length).toFixed(1);
}

// 3. Hiển thị thông báo (Toast/Alert)
function showAlert(message) {
    alertContainer.innerHTML = `<div class="alert alert-success">${message}</div>`;
    setTimeout(() => alertContainer.innerHTML = '', 3000);
}

// 4. Render danh sách ra bảng HTML
function renderStudents() {
    studentTableBody.innerHTML = '';
    
    if (students.length === 0) {
        studentTableBody.innerHTML = `<tr><td colspan="7" class="empty-row">Danh sách trống. Hãy thêm sinh viên mới!</td></tr>`;
        return;
    }

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${student.id}</strong></td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${formatDate(student.birthDate)}</td>
            <td>${student.className}</td>
            <td><span class="badge">${student.gpa}</span></td>
            <td>
                <button class="btn btn-edit" onclick="initEditStudent('${student.id}')">Sửa</button>
                <button class="btn btn-danger" onclick="deleteStudent('${student.id}')">Xóa</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

// --- XỬ LÝ VALIDATION FORM (BÀI TẬP VỀ NHÀ) ---
function validateForm() {
    let isValid = true;
    const idInput = document.getElementById('studentId');
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const dateInput = document.getElementById('birthDate');
    const classInput = document.getElementById('className');
    const gpaInput = document.getElementById('gpa');

    // Reset thông báo lỗi cũ
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    // Kiểm tra MSSV
    if (!idInput.value.trim()) {
        setError(idInput, 'Mã sinh viên không được để trống.');
        isValid = false;
    } else if (formMode.value === 'ADD' && students.some(s => s.id.toLowerCase() === idInput.value.trim().toLowerCase())) {
        setError(idInput, 'Mã sinh viên này đã tồn tại trên hệ thống.');
        isValid = false;
    }

    // Kiểm tra tên
    if (!nameInput.value.trim()) {
        setError(nameInput, 'Họ và tên không được để trống.');
        isValid = false;
    }

    // Kiểm tra Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        setError(emailInput, 'Email không được để trống.');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        setError(emailInput, 'Định dạng Email không hợp lệ.');
        isValid = false;
    }

    // Kiểm tra Ngày sinh
    if (!dateInput.value) {
        setError(dateInput, 'Vui lòng chọn ngày sinh.');
        isValid = false;
    }

    // Kiểm tra Lớp
    if (!classInput.value.trim()) {
        setError(classInput, 'Lớp học không được để trống.');
        isValid = false;
    }

    // Kiểm tra Điểm số
    const gpaVal = parseFloat(gpaInput.value);
    if (gpaInput.value === '') {
        setError(gpaInput, 'Điểm trung bình không được để trống.');
        isValid = false;
    } else if (isNaN(gpaVal) || gpaVal < 0 || gpaVal > 10) {
        setError(gpaInput, 'Điểm số phải nằm trong khoảng từ 0 đến 10.');
        isValid = false;
    }

    return isValid;
}

function setError(inputEl, message) {
    const parent = inputEl.parentElement;
    const errorEl = parent.querySelector('.error-msg');
    errorEl.textContent = message;
}

// --- ĐIỀU PHỐI ĐÓNG MỞ MODAL POPUP ---
function openModal(mode = 'ADD') {
    studentModal.removeAttribute('aria-hidden');
    formMode.value = mode;
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    
    if (mode === 'ADD') {
        modalTitle.textContent = 'Thêm Sinh Viên Mới';
        studentForm.reset();
        document.getElementById('studentId').disabled = false;
    } else {
        modalTitle.textContent = 'Cập Nhật Thông Tin Sinh Viên';
        document.getElementById('studentId').disabled = true; // Không cho sửa khóa chính
    }
}

function closeModal() {
    studentModal.setAttribute('aria-hidden', 'true');
    studentForm.reset();
}

// --- SỰ KIỆN ĐIỀU KHIỂN CRUD ---

// Lắng nghe Submit form
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) return;

    const studentData = {
        id: document.getElementById('studentId').value.trim(),
        name: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        birthDate: document.getElementById('birthDate').value,
        className: document.getElementById('className').value.trim(),
        gpa: parseFloat(document.getElementById('gpa').value).toFixed(1)
    };

    if (formMode.value === 'ADD') {
        // Thêm mới
        students.push(studentData);
        showAlert(`Đã thêm thành công sinh viên: ${studentData.name}`);
    } else {
        // Cập nhật
        const idx = students.findIndex(s => s.id === studentData.id);
        if (idx !== -1) {
            students[idx] = studentData;
            showAlert(`Đã cập nhật thông tin sinh viên: ${studentData.name}`);
        }
    }

    saveStudents();
    renderStudents();
    updateStatistics();
    closeModal();
});

// Kích hoạt nạp dữ liệu cũ lên form để Sửa
window.initEditStudent = function(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    openModal('EDIT');
    
    document.getElementById('studentId').value = student.id;
    document.getElementById('fullName').value = student.name;
    document.getElementById('email').value = student.email;
    document.getElementById('birthDate').value = student.birthDate;
    document.getElementById('className').value = student.className;
    document.getElementById('gpa').value = student.gpa;
};

// Xóa sinh viên
window.deleteStudent = function(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    if (confirm(`Bạn có chắc chắn muốn xóa sinh viên "${student.name}" (MSSV: ${id})?`)) {
        students = students.filter(s => s.id !== id);
        saveStudents();
        renderStudents();
        updateStatistics();
        showAlert('Đã xóa dữ liệu sinh viên thành công.');
    }
};

// Gắn sự kiện nút mở/đóng thủ công
document.getElementById('openModalBtn').addEventListener('click', () => openModal('ADD'));
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.getElementById('cancelBtn').addEventListener('click', closeModal);

// Khởi chạy ứng dụng
renderStudents();
updateStatistics();