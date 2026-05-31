// ==========================================
// 1. API LAYER (Quản lý các kết nối HTTP)
// ==========================================
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error("Không thể lấy danh sách thành viên.");
        return response.json();
    },
    
    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) throw new Error(`Không tìm thấy thành viên ID: ${id}`);
        return response.json();
    },
    
    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!response.ok) throw new Error("Lỗi khi thêm thành viên mới.");
        return response.json();
    },
    
    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!response.ok) throw new Error("Cập nhật thông tin thất bại.");
        return response.json();
    },
    
    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error("Xóa thành viên thất bại.");
        return true; // Trả về true xác nhận đã xóa trên server giả lập
    }
};

// ==========================================
// 2. UI LAYER (Thao tác hiển thị giao diện)
// ==========================================
const ui = {
    userGrid: document.getElementById("userGrid"),
    toastContainer: document.getElementById("toastContainer"),

    renderUsers(users) {
        this.userGrid.innerHTML = "";
        if (users.length === 0) {
            this.userGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px 0;">Không tìm thấy thành viên phù hợp.</p>`;
            return;
        }

        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";
            card.dataset.id = user.id;

            card.innerHTML = `
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <p>📧 ${user.email}</p>
                    <p>📞 ${user.phone || 'Chưa cập nhật'}</p>
                    <p>🏢 ${user.company?.name || user.companyName || 'Cá nhân'}</p>
                </div>
                <div class="user-actions">
                    <button class="action-btn btn-edit" onclick="handleEditBtnClick(${user.id})">Sửa</button>
                    <button class="action-btn btn-delete" onclick="handleDeleteBtnClick(${user.id})">Xóa</button>
                </div>
            `;
            this.userGrid.appendChild(card);
        });
    },

    showLoading() {
        this.userGrid.innerHTML = "";
        // Render 6 thẻ card skeleton nhấp nháy tạo trải nghiệm tốt
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement("div");
            skeleton.className = "skeleton-card";
            skeleton.innerHTML = `
                <div class="skeleton-line skeleton-title"></div>
                <div class="skeleton-line skeleton-text"></div>
                <div class="skeleton-line skeleton-text"></div>
                <div class="skeleton-line skeleton-text short"></div>
            `;
            this.userGrid.appendChild(skeleton);
        }
    },

    hideLoading() {
        // Hàm này có thể để trống hoặc dùng khi bóc tách trạng thái cụ thể, 
        // vì hàm renderUsers() đã ghi đè (xóa sạch) skeleton.
    },

    showError(message) {
        this.createToast(message, "error");
    },

    showSuccess(message) {
        this.createToast(message, "success");
    },

    createToast(message, type) {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        this.toastContainer.appendChild(toast);

        // Tự biến mất sau 3.5 giây
        setTimeout(() => {
            toast.style.animation = "slideIn 0.3s ease reverse";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
};

// ==========================================
// 3. APPLICATION STATE & CONTROLLER LAYER
// ==========================================
let globalUsersState = []; // Bộ nhớ đệm Client để tương tác CRUD mượt mà không reload trang

// Khởi tạo ứng dụng ban đầu
async function initApp() {
    ui.showLoading();
    try {
        globalUsersState = await api.getUsers();
        ui.renderUsers(globalUsersState);
    } catch (error) {
        ui.showError(error.message);
    }
}

// Lọc tìm kiếm thành viên (Client-side Search)
document.getElementById("searchInput").addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = globalUsersState.filter(user => 
        user.name.toLowerCase().includes(keyword) || 
        user.email.toLowerCase().includes(keyword)
    );
    ui.renderUsers(filtered);
});

// Điều phối các phần tử tương tác Form Modal
const userModal = document.getElementById("userModal");
const userForm = document.getElementById("userForm");
const modalTitle = document.getElementById("modalTitle");

function openModal(mode = "CREATE") {
    userModal.removeAttribute("aria-hidden");
    if (mode === "CREATE") {
        modalTitle.textContent = "Thêm Thành Viên Mới";
        userForm.reset();
        document.getElementById("userIdInput").value = "";
    } else {
        modalTitle.textContent = "Cập Nhật Thông Tin";
    }
}

function closeModal() {
    userModal.setAttribute("aria-hidden", "true");
}

// Bắt sự kiện click đóng/mở thủ công
document.getElementById("openAddModalBtn").addEventListener("click", () => openModal("CREATE"));
document.getElementById("closeModalBtn").addEventListener("click", closeModal);
document.getElementById("cancelFormBtn").addEventListener("click", closeModal);
userModal.addEventListener("click", (e) => { if (e.target === userModal) closeModal(); });

// HÀM XỬ LÝ LƯU FORM (Hợp nhất cả CREATE và UPDATE)
userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const id = document.getElementById("userIdInput").value;
    const formData = {
        name: document.getElementById("nameInput").value,
        email: document.getElementById("emailInput").value,
        phone: document.getElementById("phoneInput").value,
        companyName: document.getElementById("companyInput").value, // Lưu tạm vào key phẳng phẳng
        company: { name: document.getElementById("companyInput").value } // Đồng bộ cấu trúc chuẩn API
    };

    try {
        if (id) {
            // --- KỊCH BẢN: UPDATE (PUT) ---
            const updatedUser = await api.updateUser(id, formData);
            
            // Cập nhật mảng State cục bộ
            const index = globalUsersState.findIndex(u => u.id == id);
            if (index !== -1) globalUsersState[index] = { ...globalUsersState[index], ...updatedUser };
            
            ui.showSuccess("Đã cập nhật thông tin thành viên thành công!");
        } else {
            // --- KỊCH BẢN: CREATE (POST) ---
            const newCreatedUser = await api.createUser(formData);
            
            // Vì JSONPlaceholder luôn trả về ID 11 cố định cho dữ liệu mới tạo,
            // Ta cần tùy biến ID cục bộ tránh trùng lập Key khi thêm nhiều bản ghi liên tục.
            newCreatedUser.id = globalUsersState.length > 0 ? Math.max(...globalUsersState.map(u => u.id)) + 1 : 1;
            
            globalUsersState.unshift(newCreatedUser); // Đưa thành viên mới lên đầu danh sách hiển thị
            ui.showSuccess("Đã thêm thành viên mới vào danh bạ!");
        }

        closeModal();
        ui.renderUsers(globalUsersState); // Vẽ lại UI đồng bộ dữ liệu mới không cần reload
        document.getElementById("searchInput").value = ""; // Reset bộ lọc search
    } catch (error) {
        ui.showError(error.message);
    }
});

// HÀM TRUNG GIAN KHI CLICK NÚT SỬA TRÊN CARD
// (Vì render động qua chuỗi String HTML nên cần gắn phạm vi Window)
window.handleEditBtnClick = function(id) {
    const targetUser = globalUsersState.find(u => u.id == id);
    if (!targetUser) return;

    // Đổ dữ liệu cũ vào form
    document.getElementById("userIdInput").value = targetUser.id;
    document.getElementById("nameInput").value = targetUser.name;
    document.getElementById("emailInput").value = targetUser.email;
    document.getElementById("phoneInput").value = targetUser.phone || '';
    document.getElementById("companyInput").value = targetUser.company?.name || targetUser.companyName || '';

    openModal("UPDATE");
};

// HÀM TRUNG GIAN KHI CLICK NÚT XÓA TRÊN CARD
window.handleDeleteBtnClick = async function(id) {
    const targetUser = globalUsersState.find(u => u.id == id);
    if (!targetUser) return;

    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa thành viên "${targetUser.name}" ra khỏi danh bạ hệ thống không?`);
    if (!confirmDelete) return;

    try {
        await api.deleteUser(id);
        
        // Loại bỏ khỏi State mảng cục bộ
        globalUsersState = globalUsersState.filter(u => u.id != id);
        
        // Vẽ lại UI ngay lập tức
        ui.renderUsers(globalUsersState);
        ui.showSuccess(`Đã xóa thành công thành viên ${targetUser.name}.`);
    } catch (error) {
        ui.showError(error.message);
    }
};

// Chạy ứng dụng
initApp();