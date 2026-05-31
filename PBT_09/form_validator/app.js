// --- 1. ĐỊNH VỊ DOM ELEMENTS ---
const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const phone = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');

// Elements hiển thị validation riêng biệt
const nameStatus = document.getElementById('nameStatus');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const phoneError = document.getElementById('phoneError');

// Modal Elements
const successModal = document.getElementById('successModal');
const modalData = document.getElementById('modalData');
const closeModalBtn = document.getElementById('closeModalBtn');

// --- 2. TRẠNG THÁI VALIDATE CỦA FORM (FORM STATE) ---
const formFieldsStatus = {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
};

// Hàm điều khiển bật/tắt nút Submit dựa vào formFieldsStatus
function checkFormValidity() {
    const isAllValid = Object.values(formFieldsStatus).every(status => status === true);
    submitBtn.disabled = !isAllValid;
}

// --- 3. CÁC HÀM VALIDATE CHI TIẾT ---

// A. Validate Tên (2 - 50 ký tự)
fullName.addEventListener('input', () => {
    const val = fullName.value.trim();
    if (val.length >= 2 && val.length <= 50) {
        fullName.classList.remove('invalid');
        fullName.classList.add('valid');
        nameStatus.textContent = '✅';
        nameError.textContent = '';
        formFieldsStatus.fullName = true;
    } else {
        fullName.classList.remove('valid');
        fullName.classList.add('invalid');
        nameStatus.textContent = '❌';
        nameError.textContent = 'Họ và tên phải có từ 2 đến 50 ký tự.';
        formFieldsStatus.fullName = false;
    }
    checkFormValidity();
});

// B. Validate Email (Sử dụng Regex)
email.addEventListener('input', () => {
    const val = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(val)) {
        email.classList.remove('invalid');
        email.classList.add('valid');
        emailError.textContent = '';
        formFieldsStatus.email = true;
    } else {
        email.classList.remove('valid');
        email.classList.add('invalid');
        emailError.textContent = 'Định dạng email không hợp lệ (ví dụ: abc@gmail.com).';
        formFieldsStatus.email = false;
    }
    checkFormValidity();
});

// C. Validate Password & Strength Meter
password.addEventListener('input', () => {
    const val = password.value;
    
    // Reset khi trống
    if (val.length === 0) {
        password.className = '';
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Trống';
        strengthText.style.color = 'inherit';
        passwordError.textContent = '';
        formFieldsStatus.password = false;
        checkFormValidity();
        return;
    }

    // Các cụm biểu thức Regex kiểm tra thành phần mã hóa
    const hasLetter = /[a-zA-Z]/.test(val);
    const hasDigit = /[0-9]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasSpecial = /[^a-zA-Z0-9]/.test(val);

    let strength = 'weak'; // Mặc định là yếu

    if (val.length >= 8) {
        if (hasUpper && hasLower && hasDigit && hasSpecial) {
            strength = 'strong';
        } else if (hasLetter && hasDigit) {
            strength = 'medium';
        }
    }

    // Cập nhật giao diện thanh Meter dựa trên kết quả strength
    if (strength === 'strong') {
        password.className = 'valid';
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'var(--success)';
        strengthText.textContent = 'Mạnh';
        strengthText.style.color = 'var(--success)';
        passwordError.textContent = '';
        formFieldsStatus.password = true;
    } else if (strength === 'medium') {
        password.className = 'invalid'; // Chưa đạt độ bảo mật tối đa nhưng cấu trúc form hợp lệ? 
        // Đề bài: "Mạnh (xanh): 8+ ký tự...". Ta coi chỉ mức "Mạnh" mới tính field này Valid, hoặc tùy chỉnh logic.
        // Ở đây thiết lập: Chỉ khi Password đạt mức Mạnh mới cho Pass form.
        password.classList.remove('valid');
        password.classList.add('invalid');
        strengthBar.style.width = '66%';
        strengthBar.style.backgroundColor = 'var(--warning)';
        strengthText.textContent = 'Trung bình';
        strengthText.style.color = 'var(--warning)';
        passwordError.textContent = 'Mật khẩu cần thêm chữ hoa, chữ thường và ký tự đặc biệt.';
        formFieldsStatus.password = false;
    } else {
        password.className = 'invalid';
        strengthBar.style.width = '33%';
        strengthBar.style.backgroundColor = 'var(--error)';
        strengthText.textContent = 'Yếu';
        strengthText.style.color = 'var(--error)';
        passwordError.textContent = 'Mật khẩu phải từ 8 ký tự trở lên.';
        formFieldsStatus.password = false;
    }

    // Mỗi khi password thay đổi, bắt buộc phải trigger validate lại confirmPassword xem có còn khớp không
    validateConfirmPassword();
    checkFormValidity();
});

// D. Validate Confirm Password
function validateConfirmPassword() {
    const passVal = password.value;
    const confirmVal = confirmPassword.value;

    if (confirmVal.length > 0 && passVal === confirmVal) {
        confirmPassword.classList.remove('invalid');
        confirmPassword.classList.add('valid');
        confirmPasswordError.textContent = '';
        formFieldsStatus.confirmPassword = true;
    } else {
        confirmPassword.classList.remove('valid');
        confirmPassword.classList.add('invalid');
        confirmPasswordError.textContent = confirmVal.length === 0 ? '' : 'Mật khẩu xác nhận không khớp.';
        formFieldsStatus.confirmPassword = false;
    }
}
confirmPassword.addEventListener('input', () => {
    validateConfirmPassword();
    checkFormValidity();
});

// E. Validate Phone & Tự động định dạng (Format: 0901-234-567)
phone.addEventListener('input', (e) => {
    // 1. Trích xuất chỉ lấy các chữ số nguyên bản
    let digits = e.target.value.replace(/\D/g, '');
    
    // Giới hạn độ dài tối đa là 10 chữ số
    if (digits.length > 10) {
        digits = digits.slice(0, 10);
    }

    // 2. Thuật toán tự động chèn dấu gạch ngang lý tưởng theo thời gian thực
    let formatted = '';
    if (digits.length > 0) {
        formatted += digits.substring(0, 4);
    }
    if (digits.length > 4) {
        formatted += '-' + digits.substring(4, 7);
    }
    if (digits.length > 7) {
        formatted += '-' + digits.substring(7, 10);
    }

    // Cập nhật lại giá trị hiển thị trong ô input
    e.target.value = formatted;

    // 3. Thực hiện kiểm tra tính hợp lệ (Phải đủ chuẩn 10 chữ số)
    if (digits.length === 10) {
        phone.classList.remove('invalid');
        phone.classList.add('valid');
        phoneError.textContent = '';
        formFieldsStatus.phone = true;
    } else {
        phone.classList.remove('valid');
        phone.classList.add('invalid');
        phoneError.textContent = 'Số điện thoại phải bao gồm chính xác 10 chữ số.';
        formFieldsStatus.phone = false;
    }
    checkFormValidity();
});

// --- 4. SỰ KIỆN SUBMIT FORM & HIỂN THỊ MODAL ---
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn hành vi tải lại trang mặc định

    // Đổ thông tin dữ liệu đã an toàn sang dạng text thuần túy vào Modal
    modalData.textContent = ''; // Clear dữ liệu cũ
    
    const details = [
        `Họ và tên: ${fullName.value.trim()}`,
        `Email: ${email.value.trim()}`,
        `Số điện thoại: ${phone.value}`
    ];

    details.forEach(item => {
        const p = document.createElement('p');
        p.textContent = item; // textContent chống tấn công XSS
        modalData.appendChild(p);
    });

    // Mở Modal giao diện bằng cách thêm class điều hướng css
    successModal.classList.add('open');
});

// Sự kiện Đóng Modal phục hồi trạng thái Form ban đầu
closeModalBtn.addEventListener('click', () => {
    successModal.classList.remove('open');
    form.reset();
    
    // Reset toàn bộ style class và trạng thái logic
    document.querySelectorAll('input').forEach(input => input.className = '');
    nameStatus.textContent = '';
    strengthBar.style.width = '0%';
    strengthText.textContent = 'Trống';
    strengthText.style.color = 'inherit';
    
    Object.keys(formFieldsStatus).forEach(key => formFieldsStatus[key] = false);
    checkFormValidity();
});