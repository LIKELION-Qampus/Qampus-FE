// 버튼 및 요소 가져오기
const likeBtn = document.querySelector(".like-box");
const likeImg = document.querySelector(".like-img");
const filLikeImg = document.querySelector(".like-img-fill");
const likeNum = document.querySelector(".like-num");

const scrapBtn = document.querySelector(".scrap-box");
const scrapImg = document.querySelector(".scrap-img");
const filScrapImg = document.querySelector(".scrap-img-fill");
const scrapCancel = document.querySelector(".scrap-text-none");

const cmtInput = document.querySelector(".input-comment");
const subMitBtn = document.querySelector(".submit");
const cmtCount = document.querySelector(".comment-count");
const commentNum = document.querySelector(".comment-num");
const emptyComment = document.querySelector(".empty-comment");
const commentList = document.querySelector(".comment-list");

const menuIcon = document.querySelector(".post-menu-icon");
const modal = document.querySelector(".post-modal");
const editBtn = document.querySelector(".edit-button");
const deleteBtn = document.querySelector(".delete-button");

const confirmOverlay = document.querySelector('.delete-confirm-overlay');
const btnNo = document.querySelector('.btn-no');
const btnYes = document.querySelector('.btn-yes');

let isLikeClicked = false;
let isScrapClicked = false;

// 대댓글 모드 상태 관리 변수
let replyTargetId = null;

let comments = [
  {
    id: 1,
    author: '익명 2',
    content: '답변내용답변내용답변내용답변내용',
    date: '2026-04-26T10:00:00',
    likes: 0,
    isLiked: false,
    replies: [
      {
        id: 11,
        author: '익명 3',
        content: '답변내용답변내용답변내용답변내용답변내용',
        date: '2026-04-26T11:00:00',
        likes: 0,
        isLiked: false,
      }
    ]
  }
];

const formatDate = (dateString) => {
  const d = new Date(dateString);
  return `${String(d.getFullYear()).slice(2)}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
};

// 템플릿 생성 시 부모 댓글에만 '답글 달기' 버튼 추가 + 댓글 / 대댓글 하트 누르면 색 변경
const generateCommentHTML = (item, isReply = false) => {
  const className = isReply ? "re-comment-item" : "comment-item";
  
  const replyBtnHTML = !isReply 
    ? `<button class="reply-trigger-btn" data-id="${item.id}" style="background:none; border:none; color:#7B7B7B; font-size:11px; font-weight:600; cursor:pointer; margin-left:10px;">답글 달기</button>` 
    : '';

  // 좋아요 상태에 따라 하트 이미지 경로 결정
  const heartIconSrc = item.isLiked ? '../assets/icons/heart-blue-fill.svg' : '../assets/icons/heart-black.svg';

  return `
    <div class="${className}">
      <div class="comment-user-box">
        <img class="comment-user-img" src="../assets/icons/user.svg" />
        <p>${item.author}</p>
        <img class="comment-ellipsis-img" src="../assets/icons/ellipsis-vertical-g.svg" data-id="${item.id}" style="cursor:pointer;" />
      </div>
      
      <div class="comment-modal-wrapper hidden" id="comment-modal-${item.id}">
        <div class="post-modal-box" style="position: static; width: 140px; height: auto;">
          <button class="edit-button comment-edit-btn" type="button">
            수정하기
            <img class="edit-icon" src="../assets/icons/pencil-b.svg" />
            <img class="edit-icon-active" src="../assets/icons/pencil-w.svg" />
          </button>
          <button class="delete-button comment-delete-btn" type="button" data-id="${item.id}">
            삭제하기
            <img class="delete-icon" src="../assets/icons/trash-b.svg" />
            <img class="delete-icon-active" src="../assets/icons/trash-w.svg" />
          </button>
        </div>
      </div>

      <div class="comment-content">
        <p class="comment-content-text">${item.content}</p>
        <div class="comment-etc">
          <p>${formatDate(item.date)}</p>
          <div class="comment-like-box">
            <img class="comment-like-img" src="${heartIconSrc}" data-id="${item.id}" style="cursor:pointer;" />
            <p class="comment-like-count">${item.likes}</p>
          </div>
          ${replyBtnHTML}
        </div>
      </div>
    </div>
  `;
};

const renderComments = () => {
  if (comments.length === 0) {
    emptyComment.classList.remove("hidden");
    commentList.classList.add("hidden");
    cmtCount.textContent = `답변 0`;
    commentNum.textContent = "0";
    return;
  }

  emptyComment.classList.add("hidden");
  commentList.classList.remove("hidden");
  
  let totalCount = 0;
  commentList.innerHTML = ''; 

  comments.forEach(comment => {
    totalCount++;
    let html = generateCommentHTML(comment, false);

    if (comment.replies && comment.replies.length > 0) {
      comment.replies.forEach(reply => {
        totalCount++;
        html += generateCommentHTML(reply, true);
      });
    }
    commentList.insertAdjacentHTML('beforeend', html);
  });

  cmtCount.textContent = `답변 ${totalCount}`;
  commentNum.textContent = totalCount;
};

// 대댓글 로직이 포함된 새 댓글 등록 함수
const addComment = () => {
  const commentValue = cmtInput.value.trim();
  if (commentValue === "") return alert("답변을 입력해주세요.");

  const newComment = {
    id: Date.now(),
    author: '익명(나)', 
    content: commentValue,
    date: new Date().toISOString(), 
    likes: 0,
    isLiked: false,
    replies: [] // 새 부모 댓글일 경우를 대비해 빈 배열 추가
  };

  if (replyTargetId !== null) {
    // 타겟 ID가 있으면 해당 부모 댓글을 찾아서 replies 배열에 푸시
    const parent = comments.find(c => c.id === replyTargetId);
    if (parent) {
      if (!parent.replies) parent.replies = [];
      parent.replies.push(newComment);
    }
    // 등록 후 대댓글 모드 해제
    replyTargetId = null;
    cmtInput.placeholder = "답변을 입력해보세요";
  } else {
    // 타겟 ID가 없으면 일반 최상위 댓글로 푸시
    comments.push(newComment);
  }

  renderComments(); 
  cmtInput.value = "";
};

// 기본 이벤트 등록
likeBtn.addEventListener("click", () => {
  isLikeClicked = !isLikeClicked;
  likeImg.style.display = isLikeClicked ? "none" : "block";
  filLikeImg.style.display = isLikeClicked ? "block" : "none";
  likeNum.textContent = Number(likeNum.textContent) + (isLikeClicked ? 1 : -1);
});

scrapBtn.addEventListener("click", () => {
  isScrapClicked = !isScrapClicked;
  scrapImg.style.display = isScrapClicked ? "none" : "block";
  filScrapImg.style.display = isScrapClicked ? "block" : "none";
  scrapCancel.style.display = isScrapClicked ? "block" : "none";
});

subMitBtn.addEventListener("click", addComment);
menuIcon.addEventListener("click", () => modal.classList.toggle("hidden"));
editBtn.addEventListener("click", () => location.href = "./board-edit.html");

renderComments();


// ==========================================
// 삭제 로직 및 답글 버튼 클릭 로직
// ==========================================
let deleteTargetId = null;

deleteBtn.addEventListener("click", () => {
  modal.classList.add("hidden"); 
  deleteTargetId = 'post'; 
  confirmOverlay.classList.remove("hidden"); 
});

// 이벤트 위임 (점세개 팝업, 삭제 버튼, 답글 버튼 모두 여기서 처리)
commentList.addEventListener('click', (e) => {
  
  // 1. 점세개 클릭 시 팝업 열기
  if (e.target.classList.contains('comment-ellipsis-img')) {
    const targetId = e.target.getAttribute('data-id');
    const targetModal = document.getElementById(`comment-modal-${targetId}`);
    document.querySelectorAll('.comment-modal-wrapper').forEach(p => p.classList.add('hidden'));
    targetModal.classList.toggle('hidden');
  }

  // 2. 팝업 내 삭제하기 클릭 시
  if (e.target.closest('.comment-delete-btn')) {
    const btn = e.target.closest('.comment-delete-btn');
    deleteTargetId = Number(btn.getAttribute('data-id'));
    btn.closest('.comment-modal-wrapper').classList.add('hidden');
    confirmOverlay.classList.remove('hidden');
  }

  // 3. '답글 달기' 버튼 클릭 시 대댓글 모드 활성화
  if (e.target.classList.contains('reply-trigger-btn')) {
    replyTargetId = Number(e.target.getAttribute('data-id'));
    const parentComment = comments.find(c => c.id === replyTargetId);
    
    // 입력창으로 시선을 유도하고 Placeholder 변경
    cmtInput.placeholder = `${parentComment.author}님에게 답글 남기기...`;
    cmtInput.focus();
  }

  if (e.target.classList.contains('comment-like-img')) {
    const targetId = Number(e.target.getAttribute('data-id'));
    
    // 타겟 ID를 가진 댓글(또는 대댓글) 찾기
    let targetComment = comments.find(c => c.id === targetId);
    if (!targetComment) {
      comments.forEach(c => {
        if (c.replies) {
          const reply = c.replies.find(r => r.id === targetId);
          if (reply) targetComment = reply;
        }
      });
    }

    // 해당 댓글의 좋아요 상태와 숫자 토글
    if (targetComment) {
      targetComment.isLiked = !targetComment.isLiked; // 상태 반전 (false -> true -> false)
      targetComment.likes += targetComment.isLiked ? 1 : -1; // true면 +1, false면 -1
      
      renderComments(); // 바뀐 데이터를 화면에 다시 그리기
    }
  }
});

btnYes.addEventListener("click", () => {
  if (deleteTargetId === 'post') {
    alert('게시글이 삭제되었습니다.');
    location.href = '../html/board-list.html'; 
  } else if (deleteTargetId !== null) {
    alert('답변이 삭제되었습니다.');
    comments = comments.filter(c => c.id !== deleteTargetId).map(c => {
      if (c.replies) c.replies = c.replies.filter(r => r.id !== deleteTargetId);
      return c;
    });
    renderComments(); 
    confirmOverlay.classList.add("hidden");
  }
});

btnNo.addEventListener("click", () => confirmOverlay.classList.add("hidden"));

document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('comment-ellipsis-img') && !e.target.closest('.comment-modal-wrapper')) {
    document.querySelectorAll('.comment-modal-wrapper').forEach(p => p.classList.add('hidden'));
  }
});