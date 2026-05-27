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
subMitBtn.addEventListener("click", () => {
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

  commentInput.value = "";
});

likeBtn.addEventListener("click", likeBox);
scrapBtn.addEventListener("click", scrapBox);
