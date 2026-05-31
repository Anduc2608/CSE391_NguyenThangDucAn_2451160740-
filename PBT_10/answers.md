# Phần A:
## Câu A1:
1. Dự đoán thứ tự Output chính xác 
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
2. Cơ chế hoạt động

| Queue           | Loại       | Ví dụ                   | Ưu tiên                        |
| --------------- | ---------- | ----------------------- | -------------------------------|
| Call Stack      | Đồng bộ    | console.log             | Chạy ngay                      |
| Microtask Queue | Async nhẹ  | Promise.then            | Sau Call Stack, trước Macrotask|
| Macrotask Queue | Async nặng | setTimeout, setInterval | Sau khi Microtask Queue trống  |
3. Giải thích Event Loop, Microtask Queue, Macrotask Queue
- Event Loop: JS single-threaded, sau khi Call Stack trống → chạy hết Microtask → lấy 1 Macrotask → lặp lại.
- Microtask Queue: `Promise.then` — ưu tiên cao, chạy hết trước khi lấy Macrotask.
- Macrotask Queue: `setTimeout` — chạy từng cái một, xen kẽ sau mỗi lần drain Microtask.
## Câu A2:
1. await fetch()
fetch trả về: Một Promise chứa đối tượng Response (mới chỉ có thông tin tổng quan như Header, Status; chưa có dữ liệu).

Tại sao cần await: Vì gửi yêu cầu qua Internet cần thời gian, phải đợi mạng phản hồi xong mới chạy tiếp.

2. response.ok bằng false khi nào?
Khi mã HTTP trả về nằm ngoài khoảng 200 - 299 (yêu cầu đến được server nhưng thất bại).

3 mã lỗi phổ biến: 404 (Không tìm thấy trang), 500 (Server lỗi code), 403 (Không có quyền truy cập).

3. Tại sao response.json() lại cần await lần nữa?
Vì ở bước 1, nội dung sản phẩm (Body) vẫn chưa tải xong mà đang là luồng dữ liệu thô.

.json() vừa phải đợi tải nốt phần dữ liệu thô, vừa phải chuyển chuỗi JSON đó thành Object JS. Quá trình này tốn thời gian và trả về một Promise mới nên phải await.

4. try...catch gom được những lỗi gì?
Lỗi mạng: Mất Wi-Fi, đứt cáp, sai tên miền.

Lỗi HTTP (404, 500): Do dòng if (!response.ok) throw... của bạn chủ động ép nó nhảy xuống catch.

Lỗi định dạng dữ liệu: API lỗi trả về chữ hoặc code HTML khiến hàm .json() bị lỗi (không parse được).

## câu A3:
1. Sơ đồ 3 trạng thái của Promise
Một Promise trong JavaScript luôn nằm trong 1 trong 3 trạng thái dưới đây. Khi đã chuyển từ Pending sang Fulfilled hoặc Rejected, trạng thái này là vĩnh viễn và không thể thay đổi ngược lại.
                  ┌───► [ Fulfilled ] (Thành công) ───► Kích hoạt .then()
                  │      Dữ liệu trả về: value
   [ Pending ] ───┤
   (Đang chờ đợi) │
                  └───► [ Rejected ] (Thất bại) ──────► Kích hoạt .catch()
                         Lý do lỗi: error
                
2. Callback Hell là gì?
Callback Hell (hay còn gọi là Pyramid of Doom - Kim tự tháp chết chóc) là hiện tượng các hàm bất đồng bộ lồng nhau quá nhiều tầng thông qua các hàm callback.   
3. Ví dụ 4 cấp Callback HellGiả sử bạn cần thực hiện chuỗi hành động liên tiếp: Đăng nhập $\rightarrow$ Lấy thông tin cá nhân $\rightarrow$ Lấy danh sách bài viết $\rightarrow$ Lấy các bình luận của bài viết đầu tiên.JavaScript// Ví dụ hung thần 4 cấp callback hell
login("admin", "123456", function(user) {
    // Cấp 1
    getProfile(user.id, function(profile) {
        // Cấp 2
        getPosts(profile.id, function(posts) {
            // Cấp 3
            getComments(posts[0].id, function(comments) {
                // Cấp 4
                console.log("Danh sách bình luận: ", comments);
            }, function(err4) { console.error(err4); });
        }, function(err3) { console.error(err3); });
    }, function(err2) { console.error(err2); });
}, function(err1) { console.error(err1); });
4. Refactor (Viết lại) sạch đẹp với Async/Await
Để dùng được async/await, các hàm login, getProfile, getPosts, và getComments phải được viết để trả về một Promise. Khi đó, cấu trúc lồng nhau phức tạp phía trên sẽ biến thành một đường thẳng tuyến tính, dễ đọc như code đồng bộ:

JavaScript
async function showFirstPostComments() {
    try {
        // Code chạy thẳng tuột từ trên xuống dưới, không lồng ghép
        const user = await login("admin", "123456");
        const profile = await getProfile(user.id);
        const posts = await getPosts(profile.id);
        const comments = await getComments(posts[0].id);
        
        console.log("Danh sách bình luận: ", comments);
    } catch (error) {
        // Tất cả lỗi ở bất kỳ bước nào đều gom về một mối tại đây!
        console.error("Đã xảy ra lỗi trong chuỗi xử lý:", error.message);
    }
}

// Kích hoạt hàm
showFirstPostComments();
# Phần C:
Câu C1:
1. Phân loại và Xử lý lỗi Network & API
Network Errors (Mất mạng giữa chừng):

Dấu hiệu: fetch() sẽ ném ra một TypeError (Failed to fetch).

Xử lý: Hiển thị một Toast thông báo trạng thái mạng (Offline), tạm dừng các request thay đổi dữ liệu (POST/PUT), lưu cục bộ (Local Storage/IndexedDB) nếu cần, và tự động kích hoạt cơ chế chạy lại (Retry) cho các request lấy dữ liệu (GET).

API Errors (Lỗi từ phía Server phản hồi):

500 Internal Server Error: Server gặp sự cố hệ thống. Hiển thị thông báo "Hệ thống đang bảo trì, vui lòng thử lại sau". Đẩy log lỗi này về các dịch vụ giám sát tập trung (như Sentry).

404 Not Found: Tài nguyên (sản phẩm, danh mục) không tồn tại. Điều hướng người dùng về trang 404 tùy chỉnh hoặc ẩn component tương ứng, không thực hiện thử lại (Retry) vô ích.

429 Too Many Requests: Người dùng hoặc IP đang spam API quá tần suất cho phép. Đọc header Retry-After từ server (nếu có) để chặn không cho gửi request trong khoảng thời gian đó, đồng thời hiển thị cảnh báo yêu cầu người dùng thao tác chậm lại.
2. Triển khai Code Hệ thống
Hàm fetchWithTimeout(url, options, ms)
Ngăn chặn các request rơi vào trạng thái "treo vĩnh viễn" khi server phản hồi quá chậm (quá 10 giây).

JavaScript
async function fetchWithTimeout(url, options = {}, ms = 10000) {
    // Khởi tạo bộ điều khiển hủy request
    const controller = new AbortController();
    const { signal } = controller;

    // Thiết lập thời gian tự động hủy
    const timeoutId = setTimeout(() => controller.abort(), ms);

    try {
        const response = await fetch(url, { ...options, signal });
        clearTimeout(timeoutId); // Xóa bộ đếm nếu fetch thành công trước thời hạn
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error(`Request Timeout: API không phản hồi trong ${ms / 1000} giây.`);
        }
        throw error;
    }
}
Hàm fetchWithRetry(url, options, maxRetries)
Tự động thử lại tối đa 3 lần với kỹ thuật Exponential Backoff (thời gian chờ tăng dần) để tránh dồn dập làm sập server vừa hồi phục.

JavaScript
async function fetchWithRetry(url, options = {}, maxRetries = 3, baseDelay = 1000) {
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            // Kết hợp cả Timeout (10s) vào trong lượt thử
            const response = await fetchWithTimeout(url, options, 10000);

            // Nếu gặp lỗi Client (trừ 429), không cần retry vì kết quả sẽ không đổi
            if (!response.ok) {
                if (response.status === 429) {
                    console.warn(`Gặp lỗi 429 (Spam), chuẩn bị thử lại lượt ${attempt}...`);
                } else {
                    // 404, 401, 403... ném lỗi ra ngoài luôn
                    throw new Error(`HTTP Error ${response.status}`);
                }
            } else {
                return response; // Thành công, trả kết quả về luôn
            }
        } catch (error) {
            lastError = error;
            
            // Nếu đã dùng hết lượt thử, thoát vòng lặp và báo lỗi
            if (attempt === maxRetries) break;

            // Tính toán thời gian chờ tăng dần: 1s -> 2s -> 4s
            const delay = baseDelay * Math.pow(2, attempt);
            console.warn(`Lượt thử ${attempt} thất bại (${error.message}). Thử lại sau ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw new Error(`Thất bại hoàn toàn sau ${maxRetries} lần thử. Lỗi cuối cùng: ${lastError.message}`);
}

## Câu C2:
1. Bảng so sánh bản chất
| Method          | Khi nào resolve?                | Khi nào reject?                         | Use case                                           |
| --------------- | ------------------------------- | --------------------------------------- | ---------------------------------------------------|
| `.all()`        | Tất cả fulfilled                | 1 cái reject (fail fast)                | Các API phụ thuộc nhau, cần đủ hết mới chạy tiếp   |
| `.allSettled()` | Luôn luôn (sau khi tất cả xong) | Không bao giờ reject                    | Các API độc lập, 1 cái lỗi không ảnh hưởng cái khác|
| `.race()`       | Cái nào xong trước nhất         | Cái nào xong trước nhất (nếu là reject) | Timeout, fallback server, lấy kết quả nhanh nhất   |
| `.any()`        | 1 cái fulfilled                 | Tất cả đều reject                       | Thử nhiều nguồn, lấy cái nào thành công đầu tiên   |
2. Ví dụ Code kịch bản thực tế (E-Commerce)
Kịch bản 1: Promise.all — Tạo đơn hàng (Checkout)
Yêu cầu: Phải đồng thời kiểm tra số lượng kho, xác thực mã giảm giá và tính phí vận chuyển. Một bước lỗi là hủy toàn bộ quá trình thanh toán.

JavaScript
async function processCheckout(cartId, couponCode, userAddress) {
    try {
        const [stockStatus, couponDiscount, shippingFee] = await Promise.all([
            validateStock(cartId),
            verifyCoupon(couponCode),
            calculateShipping(userAddress)
        ]);

        console.log("Tất cả hợp lệ! Tiến hành tạo hóa đơn.", { stockStatus, couponDiscount, shippingFee });
    } catch (error) {
        console.error("Thanh toán thất bại! Lý do:", error.message);
        // Hiện thông báo lỗi cụ thể cho khách hàng (ví dụ: Mã giảm giá hết hạn hoặc Hết hàng)
    }
}
Kịch bản 2: Promise.allSettled — Tải trang chủ (Homepage Dashboard)
Yêu cầu: Tải thông tin Banner, Sản phẩm Flash Sale, và Đánh giá từ khách hàng. Nếu mục Đánh giá bị lỗi hệ thống, trang chủ vẫn phải hiển thị Banner và Flash Sale cho khách mua.

JavaScript
async function loadHomepage() {
    const promises = [
        fetchBanners(),
        fetchFlashSales(),
        fetchCustomerReviews()
    ];

    const results = await Promise.allSettled(promises);

    // Xử lý bóc tách từng phần độc lập
    const bannerData = results[0].status === 'fulfilled' ? results[0].value : [];
    const flashSaleData = results[1].status === 'fulfilled' ? results[1].value : [];
    const reviewData = results[2].status === 'fulfilled' ? results[2].value : [];

    if (results[2].status === 'rejected') {
        console.warn("Không tải được Review, nhưng vẫn giữ trải nghiệm mượt mà cho các phần khác.");
    }

    renderUI({ bannerData, flashSaleData, reviewData });
}
Kịch bản 3: Promise.race — Giới hạn thời gian xác thực OTP SMS
Yêu cầu: Người dùng nhập mã OTP để xác nhận thanh toán, nếu API kiểm tra OTP chạy lâu quá 5 giây thì hủy luôn và báo lỗi chờ lâu để bảo mật.

JavaScript
async function verifyOtpWithTimeout(otpCode) {
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Hết thời gian xác thực")), 5000)
    );

    try {
        // Cuộc đua giữa API thật và hàm đếm ngược 5 giây độc hại
        const result = await Promise.race([
            submitOtpToGateway(otpCode),
            timeoutPromise
        ]);
        console.log("Xác thực OTP thành công:", result);
    } catch (error) {
        console.error("Lỗi giao dịch:", error.message);
    }
}
Kịch bản 4: Promise.any — Tải ảnh sản phẩm từ cụm CDN dự phòng
Yêu cầu: Ảnh sản phẩm được lưu ở 3 server (Việt Nam, Singapore, Mỹ). Chỉ cần lấy được ảnh từ thằng nào trả về thành công nhanh nhất để tối ưu tốc độ hiển thị cho khách.

JavaScript
async function loadProductImage(imagePath) {
    const cdns = [
        `https://cdn-vn.shop.com/${imagePath}`,
        `https://cdn-sg.shop.com/${imagePath}`,
        `https://cdn-us.shop.com/${imagePath}`
    ];

    try {
        // Lấy luồng dữ liệu từ CDN đầu tiên phản hồi thành công (status 200)
        const fastestResponse = await Promise.any(cdns.map(url => fetch(url).then(res => {
            if (!res.ok) throw new Error("CDN fail");
            return res.url;
        })));
        
        console.log("Đã lấy ảnh từ cụm server tối ưu nhất:", fastestResponse);
        return fastestResponse;
    } catch (aggregateError) {
        console.error("Tất cả các server CDN đều sập!", aggregateError.errors);
        return "/images/fallback-placeholder.png"; // Trả về ảnh mặc định lỗi
    }
}

