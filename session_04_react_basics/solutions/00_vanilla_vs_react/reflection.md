
Câu 1: Ở Phần A, mỗi lần thêm/xóa/toggle 1 todo, phải gọi bao nhiêu hàm?
Nội dung của bạn: Đã rất tốt và chỉ ra đúng vấn đề.

Gợi ý bổ sung thuật ngữ: Bạn có thể gọi tên cơ chế này trong Vanilla JS là Imperative Programming (Lập trình mệnh lệnh). Nghĩa là lập trình viên phải "cầm tay chỉ việc", tự thay đổi dữ liệu và tự ra lệnh cho trình duyệt vẽ lại giao diện bằng tay.

Câu 2: Ở Phần B, khi setTodos(...) chạy, React tự động làm gì?
Nội dung của bạn: Chính xác về cơ chế Virtual DOM.

Gợi ý bổ sung thuật ngữ: Cơ chế tự động so sánh giữa Virtual DOM cũ và mới của React được gọi là thuật toán Reconciliation (hoặc quá trình Diffing). Ngược lại với Vanilla JS, React đi theo tư duy Declarative Programming (Lập trình khai báo) — bạn chỉ cần định nghĩa giao diện sẽ trông như thế nào ứng với từng trạng thái (state), việc cập nhật DOM thật cứ để React lo.

Câu 3: Nếu Portfolio có 50 project, cách nào quản lý an toàn hơn?
Nội dung của bạn: Rất chuẩn xác khi nhắc đến khái niệm Single Source of Truth.

Gợi ý bổ sung góc nhìn: Với số lượng item lớn (50 projects) hoặc giao diện phức tạp có nhiều bộ lọc, Vanilla JS rất dễ rơi vào tình trạng "Side Effects" ngoài ý muốn (ví dụ: cập nhật mảng dữ liệu thành công nhưng quên render, hoặc render trùng lặp, hoặc rò rỉ bộ nhớ khi tháo gỡ các sự kiện click cũ). React quản lý theo các Component độc lập nên kiểm soát lỗi tốt hơn nhiều.

Câu 4: useState + .map() + .filter() áp dụng cho Portfolio như thế nào?
Nội dung của bạn: Sự liên tưởng rất logic và thực tế.

Gợi ý bổ sung code minh họa tư duy:

JavaScript
// Tư duy thiết kế Portfolio bằng React từ Todo List
const [projects, setProjects] = useState(initialProjects);
const [category, setCategory] = useState("All");

const filteredProjects = projects.filter(p => category === "All" || p.tag === category);

return (
  <div>
    {/* Bộ lọc giống như các tab trạng thái All/Active/Completed của Todo */}
    <FilterButtons activeCategory={category} setCategory={setCategory} />

    {/* Vòng lặp map tương tự renderTodos */}
    <div className="portfolio-grid">
      {filteredProjects.map(project => (
        <ProjectCard key={project.id} data={project} />
      ))}
    </div>
  </div>
);