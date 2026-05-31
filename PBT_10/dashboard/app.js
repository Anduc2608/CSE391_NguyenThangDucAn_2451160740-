// --- 1. KHỞI TẠO ĐỊNH VỊ DOM CÁC WIDGETS ---
const fetchTimeText = document.getElementById("fetchTime");
const refreshBtn = document.getElementById("refreshBtn");

const widgets = {
    0: document.querySelector("#widget-0 .widget-body"), // Ô chứa Weather
    1: document.querySelector("#widget-1 .widget-body"), // Ô chứa User
    2: document.querySelector("#widget-2 .widget-body")  // Ô chứa Posts
};

// --- 2. HÀM BỔ TRỢ ĐƯỜNG TRUYỀN (Xử lý ép lỗi HTTP status) ---
// Giải thích: Mặc định hàm fetch() của JS sẽ KHÔNG rơi vào catch/rejected nếu gặp lỗi 404 hoặc 500. 
// Do đó, ta phải bọc lại để ném (throw) lỗi thủ công ra ngoài, giúp Promise.allSettled bắt đúng trạng thái.
async function fetchWithValidation(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Mã lỗi HTTP: ${response.status} (${response.statusText})`);
    }
    return response.json();
}

// --- 3. QUẢN LÝ HIỂN THỊ TRẠNG THÁI RIÊNG CỦA MỖI WIDGET ---
function setWidgetLoading(index) {
    widgets[index].innerHTML = `
        <div class="widget-loading">
            <div class="spinner"></div>
            <span>Đang tải dữ liệu ô số ${index + 1}...</span>
        </div>
    `;
}

function renderWidgetError(index, errorMessage) {
    widgets[index].innerHTML = `
        <div class="widget-error">
            <strong>⚠️ Lỗi tải dữ liệu:</strong><br>
            ${errorMessage || "Không thể kết nối đến máy chủ API."}
        </div>
    `;
}

// --- 4. HÀM KẾT XUẤT DỮ LIỆU THÀNH CÔNG (RENDER WIDGETS) ---
function renderWidgetSuccess(index, data) {
    const container = widgets[index];
    container.innerHTML = ""; // Xóa dòng chữ Loading

    switch (index) {
        case 0: // Render Thời tiết (Open-Meteo)
            const currentWeather = data.current_weather;
            container.innerHTML = `
                <div class="weather-data">
                    <div class="temp">${currentWeather.temperature}°C</div>
                    <div class="details">
                        <p>💨 Tốc độ gió: ${currentWeather.windspeed} km/h</p>
                        <p>🧭 Hướng gió: ${currentWeather.winddirection}°</p>
                    </div>
                </div>
            `;
            break;

        case 1: // Render Thành viên (Random User)
            const user = data.results[0];
            container.innerHTML = `
                <div class="user-data">
                    <img src="${user.picture.medium}" alt="Avatar">
                    <h3>${user.name.first} ${user.name.last}</h3>
                    <p>📧 ${user.email}</p>
                    <p>📍 ${user.location.city}, ${user.location.country}</p>
                </div>
            `;
            break;

        case 2: // Render Danh sách Bài viết (JSONPlaceholder)
            let postsHTML = '<div class="posts-list">';
            data.forEach(post => {
                postsHTML += `
                    <div class="post-item">
                        <h4>${post.title.substring(0, 35)}...</h4>
                        <p>${post.body.substring(0, 60)}...</p>
                    </div>
                `;
            });
            postsHTML += '</div>';
            container.innerHTML = postsHTML;
            break;
    }
}

// --- 5. CORE FUNCTION: GỌI ĐỒNG THỜI SONG SONG VÀ ĐO THỜI GIAN ---
async function loadDashboard() {
    // 1. Kích hoạt Loading tổng thể trên tất cả các Widget cùng lúc
    setWidgetLoading(0);
    setWidgetLoading(1);
    setWidgetLoading(2);
    
    fetchTimeText.textContent = "Hệ thống đang đồng bộ dữ liệu...";
    refreshBtn.disabled = true; // Khóa nút bấm khi đang fetch tránh user spam liên tục

    const startTime = Date.now();
    
    try {
        // 2. Kích hoạt cuộc gọi song song bất đồng bộ toàn phần
        const results = await Promise.allSettled([
            fetchWithValidation("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true"),
            fetchWithValidation("https://randomuser.me/api/"),
            fetchWithValidation("https://jsonplaceholder.typicode.com/posts?_limit=3")
        ]);
        
        // 3. Tính toán và kết xuất tổng thời gian xử lý của cụm API (X ms)
        const duration = Date.now() - startTime;
        fetchTimeText.textContent = `⚡ Dữ liệu đồng bộ hoàn tất trong: ${duration} ms`;

        // 4. Duyệt qua mảng kết quả trả về của AllSettled để phân phối UI độc lập
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                // API thành công -> Render dữ liệu thật
                renderWidgetSuccess(index, result.value);
            } else {
                // API này bị lỗi -> Render thông báo lỗi cho riêng widget này, không sập cả trang
                renderWidgetError(index, result.reason.message);
            }
        });

    } catch (criticalError) {
        // Dự phòng trường hợp lỗi logic JavaScript lõi hệ thống
        console.error("Lỗi chí mạng hệ thống điều hướng:", criticalError);
        fetchTimeText.textContent = "Có lỗi xảy ra trong cấu trúc điều phối Dashboard.";
    } finally {
        refreshBtn.disabled = false; // Mở khóa lại nút bấm sau khi hoàn tất
    }
}

// --- 6. GẮN SỰ KIỆN KÍCH HOẠT BAN ĐẦU ---
refreshBtn.addEventListener("click", loadDashboard);

// Tự động kích hoạt nạp dữ liệu một lần ngay khi vừa mở trang web
document.addEventListener("DOMContentLoaded", loadDashboard);