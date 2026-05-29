//좋아요 영역, 하트 이미지, 좋아요 갯수
const likeBtn = document.querySelector(".like-box");
const likeImg = document.querySelector(".like-img");
const filLikeImg = document.querySelector(".like-img-fill");
const likeNum = document.querySelector(".like-num");

//스크랩 영역, 스크랩 이미지
const scrapBtn = document.querySelector(".scrap-box");
const scrapImg = document.querySelector(".scrap-img");
const filScrapImg = document.querySelector(".scrap-img-fill");
const scrapText = document.querySelector(".scrap-text");
const scrapCancel = document.querySelector(".scrap-text-none");

//댓글 입력창, 댓글 input, 등록 버튼
const cmtBox = document.querySelector(".input-comment-box");
const cmtInput = document.querySelector(".input-comment");
const subMitBtn = document.querySelector(".submit");

//뎃글 총 갯수
const cmtCount = document.querySelector(".comment-count");
const commentNum = document.querySelector(".comment-num");

//댓글 없을 때 영역
const emptyComment = document.querySelector(".empty-comment");
const commentList = document.querySelector(".comment-list");

//수정/삭제 모달
const menuIcon = document.querySelector(".post-menu-icon");

const modal = document.querySelector(".post-modal");
const editBtn = document.querySelector(".edit-button");
const deleteBtn = document.querySelector(".delete-button");

const confirmOverlay = document.querySelector('.delete-confirm-overlay');
const btnNo = document.querySelector('.btn-no');
const btnYes = document.querySelector('.btn-yes');

let isLikeClicked = false;
let isScrapClicked = false;

let comments = [];

//좋아요 버튼 구현
const likeBox = () => {
  if (isLikeClicked === false) {
    isLikeClicked = true;
    likeImg.style.display = "none";
    filLikeImg.style.display = "block";
    likeNum.textContent = Number(likeNum.textContent) + 1;
  } else {
    isLikeClicked = false;
    likeImg.style.display = "block";
    filLikeImg.style.display = "none";
    likeNum.textContent = Number(likeNum.textContent) - 1;
  }
};

//스크랩 버튼 구현
const scrapBox = () => {
  if (isScrapClicked === false) {
    isScrapClicked = true;
    scrapImg.style.display = "none";
    filScrapImg.style.display = "block";
    scrapCancel.style.display = "block";
  } else {
    isScrapClicked = false;
    scrapImg.style.display = "block";
    filScrapImg.style.display = "none";
    scrapCancel.style.display = "none";
  }
};

//댓글 구현
const addComment = () => {
  const commentValue = cmtInput.value.trim();

  if (commentValue === "") {
    alert("댓글을 입력해주세요.");
    return;
  }

  //입력값 확인용 - 연동 전 수정 예정입니다.
  alert(commentValue);

  comments.push(commentValue);

  emptyComment.classList.add("hidden");
  commentList.classList.remove("hidden");

  cmtCount.textContent = `답변 ${comments.length}개`;
  commentNum.textContent = comments.length;

  cmtInput.value = "";
};

//수정/삭제 모달 띄우기
const toggleModal = () => {
  modal.classList.toggle("hidden");
};

//수정 버튼 페이지 이동
editBtn.addEventListener("click", () => {
  location.href = "./board-edit.html";
});

likeBtn.addEventListener("click", likeBox);
scrapBtn.addEventListener("click", scrapBox);
subMitBtn.addEventListener("click", addComment);
menuIcon.addEventListener("click", toggleModal);

// 삭제 모달 기능 구현
deleteBtn.addEventListener("click", () => {
  modal.classList.add("hidden"); // 점세개 팝업은 닫고
  confirmOverlay.classList.remove("hidden"); // 삭제 확인 모달 열기
});

btnNo.addEventListener("click", () => {
  confirmOverlay.classList.add("hidden"); // 삭제 취소 (모달 닫기)
});

btnYes.addEventListener("click", () => {
  alert('게시글이 삭제되었습니다.');
  confirmOverlay.classList.add("hidden");
  location.href = '../html/board-list.html'; // 삭제 후 게시판 목록으로 이동
});