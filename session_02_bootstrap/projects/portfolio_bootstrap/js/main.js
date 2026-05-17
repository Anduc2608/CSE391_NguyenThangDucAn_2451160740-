document.addEventListener("DOMContentLoaded", function () {
  // Reply button toggle
  document.querySelectorAll(".reply-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const commentItem = this.closest(".comment-item");
      const existing = commentItem.querySelector(".reply-form");

      // Xóa form cũ nếu đang mở
      document.querySelectorAll(".reply-form").forEach((f) => f.remove());
      if (existing) return;

      // Tạo reply form
      const replyForm = document.createElement("div");
      replyForm.className = "reply-form mt-3";
      replyForm.innerHTML = `
        <div class="card border-0 shadow-sm p-3">
          <h6 class="fw-bold mb-3">Reply to comment</h6>
          <div class="mb-2">
            <input type="text" class="form-control form-control-sm" placeholder="Your name">
          </div>
          <div class="mb-2">
            <textarea class="form-control form-control-sm" rows="2" placeholder="Your reply..."></textarea>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-primary btn-sm submit-reply">Post Reply</button>
            <button class="btn btn-secondary btn-sm cancel-reply">Cancel</button>
          </div>
        </div>
      `;

      commentItem.querySelector(".flex-grow-1").appendChild(replyForm);

      // Cancel
      replyForm.querySelector(".cancel-reply").addEventListener("click", () => {
        replyForm.remove();
      });

      // Submit reply
      replyForm.querySelector(".submit-reply").addEventListener("click", function () {
        const name = replyForm.querySelector("input").value.trim();
        const message = replyForm.querySelector("textarea").value.trim();
        if (!name || !message) return;

        const nested = document.createElement("div");
        nested.className = "d-flex gap-3 mt-3 ms-4";
        nested.innerHTML = `
          <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff"
               class="rounded-circle flex-shrink-0" width="40" height="40" alt="${name}">
          <div class="flex-grow-1">
            <div class="bg-white rounded-3 p-3 shadow-sm border-start border-primary border-3">
              <div class="d-flex justify-content-between mb-2">
                <h6 class="fw-bold mb-0 text-primary">${name}</h6>
                <small class="text-muted">Just now</small>
              </div>
              <p class="mb-0 text-muted">${message}</p>
            </div>
          </div>
        `;

        commentItem.querySelector(".flex-grow-1").appendChild(nested);
        replyForm.remove();
      });
    });
  });

  // Comment form submit
  const commentForm = document.getElementById("commentForm");
  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("commentName").value.trim();
      const message = document.getElementById("commentText").value.trim();
      if (!name || !message) return;

      const list = document.querySelector(".comments-list");
      const newComment = document.createElement("div");
      newComment.className = "comment-item d-flex gap-3 mb-4";
      newComment.innerHTML = `
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff"
             class="rounded-circle flex-shrink-0" width="50" height="50" alt="${name}">
        <div class="flex-grow-1">
          <div class="bg-white rounded-3 p-3 shadow-sm">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="fw-bold mb-0">${name}</h6>
              <small class="text-muted">Just now</small>
            </div>
            <p class="mb-0 text-muted">${message}</p>
          </div>
          <div class="mt-2">
            <button class="btn btn-sm btn-outline-primary reply-btn">
              <i class="bi bi-reply me-1"></i>Reply
            </button>
          </div>
        </div>
      `;

      list.prepend(newComment);
      commentForm.reset();
    });
  }
});