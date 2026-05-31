// --- 1. ĐỊNH VỊ DOM ELEMENTS ---
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const historyList = document.getElementById('historyList');

// Các Block đại diện cho từng States
const initialState = document.getElementById('initialState');
const loadingState = document.getElementById('loadingState');
const successState = document.getElementById('successState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');

// Data Elements hiển thị kết quả thành công
const weatherCity = document.getElementById('weatherCity');
const weatherIcon = document.getElementById('weatherIcon');
const weatherTemp = document.getElementById('weatherTemp');
const weatherHumidity = document.getElementById('weatherHumidity');
const weatherDesc = document.getElementById('weatherDesc');

// --- 2. BẢNG MÃ HÓA EMOJI DỰA TRÊN THỜI TIẾT (FALLBACK CODES TỪ WTTR.IN) ---
const weatherEmojiMap = {
    "Sunny": "☀️",
    "Clear": "🌙",
    "Partly cloudy": "⛅",
    "Cloudy": "☁️",
    "Overcast": "☁️",
    "Mist": "🌫️",
    "Patchy rain nearby": "🌦️",
    "Moderate rain": "🌧️",
    "Heavy rain": "⛈️",
    "Snow": "❄️",
    "Thundery outbreaks nearby": "🌩️"
};

function getWeatherEmoji(desc) {
    // Trả về emoji tương ứng, nếu không tìm thấy mặc định trả về đám mây 🌤️
    return weatherEmojiMap[desc] || "🌤️";
}

// --- 3. QUẢN LÝ 3 STATES GIAO DIỆN HỢP LỆ (STATE MACHINE) ---
function changeUIState(state, errorMsg = '') {
    // Ẩn tất cả các khối trước
    initialState.classList.add('hidden');
    loadingState.classList.add('hidden');
    successState.classList.add('hidden');
    errorState.classList.add('hidden');

    // Bật khối được chỉ định hiển thị
    if (state === 'LOADING') {
        loadingState.classList.remove('hidden');
    } else if (state === 'SUCCESS') {
        successState.classList.remove('hidden');
    } else if (state === 'ERROR') {
        errorMessage.textContent = errorMsg;
        errorState.classList.remove('hidden');
    } else {
        initialState.classList.remove('hidden');
    }
}

// --- 4. HÀM CORE: FETCH API & XỬ LÝ DỮ LIỆU ---
async function fetchWeather(cityName) {
    const cleanCity = cityName.trim();
    if (!cleanCity) return;

    // Chuyển sang giao diện LOADING
    changeUIState('LOADING');

    try {
        // Kiểm tra kết nối mạng thủ công trước khi fetch
        if (!navigator.onLine) {
            throw new Error("Mất kết nối Internet. Vui lòng kiểm tra lại mạng!");
        }

        // Gọi API wttr.in theo format JSON j1 (Lưu ý: API này không cần API Key)
        const response = await fetch(`https://wttr.in/${encodeURIComponent(cleanCity)}?format=j1`);
        
        if (!response.ok) {
            throw new Error("Không tìm thấy dữ liệu thành phố này.");
        }

        const data = await response.json();

        // Kiểm tra xem cấu trúc dữ liệu trả về từ wttr.in có hợp lệ không
        // (Nếu gõ bừa chuỗi ký tự, API đôi khi trả cấu trúc rỗng hoặc lỗi vị trí)
        if (!data.current_condition || data.current_condition.length === 0) {
            throw new Error("Thành phố không tồn tại hoặc dữ liệu bị thiếu.");
        }

        // Bóc tách dữ liệu từ file JSON
        const current = data.current_condition[0];
        const temp = current.temp_C;
        const humidity = current.humidity;
        const desc = current.weatherDesc[0].value;
        
        // Cập nhật lên UI thành công
        weatherCity.textContent = cleanCity;
        weatherTemp.textContent = `${temp}°C`;
        weatherHumidity.textContent = `${humidity}%`;
        weatherDesc.textContent = desc;
        weatherIcon.textContent = getWeatherEmoji(desc);

        // Lưu vào LocalStorage chỉ khi API trả về thành công hoàn chỉnh
        saveCityToHistory(cleanCity);

        // Chuyển sang giao diện SUCCESS
        changeUIState('SUCCESS');

    } catch (error) {
        console.error("Lỗi hệ thống:", error);
        
        // Phân loại thông báo lỗi cụ thể dựa trên lỗi tóm được
        let displayMsg = error.message;
        if (error.name === 'TypeError') {
            displayMsg = "Lỗi kết nối server API hoặc mất mạng.";
        }
        
        // Chuyển sang giao diện ERROR
        changeUIState('ERROR', displayMsg);
    }
}

// --- 5. QUẢN LÝ LỊCH SỬ TÌM KIẾM BẰNG LOCALSTORAGE ---
function getHistoryFromStorage() {
    const history = localStorage.getItem('weather_history');
    return history ? JSON.parse(history) : [];
}

function renderHistoryUI() {
    historyList.textContent = "";
    const history = getHistoryFromStorage();

    if (history.length === 0) {
        historyList.innerHTML = `<span style="font-size:12px; color:var(--text-muted)">Chưa có lịch sử</span>`;
        return;
    }

    history.forEach(city => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'history-btn';
        btn.textContent = city;
        // Gắn sự kiện click trực tiếp vào nút lịch sử để tìm kiếm lại nhanh
        btn.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeather(city);
        });
        historyList.appendChild(btn);
    });
}

function saveCityToHistory(city) {
    let history = getHistoryFromStorage();

    // 1. Chuẩn hóa chuỗi viết hoa chữ cái đầu cho sạch đẹp dữ liệu
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

    // 2. Xóa thành phố đó nếu đã tồn tại trước đó để đưa lên đầu danh sách (Tránh trùng lập)
    history = history.filter(item => item.toLowerCase() !== formattedCity.toLowerCase());

    // 3. Thêm thành phố mới lên vị trí đầu hàng đợi
    history.unshift(formattedCity);

    // 4. Giới hạn độ dài tối đa nghiêm ngặt 5 thành phố gần nhất
    if (history.length > 5) {
        history = history.slice(0, 5);
    }

    // 5. Đồng bộ hóa vào bộ nhớ trình duyệt
    localStorage.setItem('weather_history', JSON.stringify(history));

    // 6. Vẽ lại giao diện lịch sử cập nhật mới nhất
    renderHistoryUI();
}

// --- 6. LẮP SỰ KIỆN KHỞI TẠO HỆ THỐNG ---
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn hành vi tải lại trang mặc định của thẻ Form
    fetchWeather(cityInput.value);
});

// Khi tải lại trang web, tự động render danh sách lịch sử cũ từ LocalStorage
document.addEventListener('DOMContentLoaded', renderHistoryUI);