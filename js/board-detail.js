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

let isLikeClicked = false;
let isScrapClicked = false;

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

likeBtn.addEventListener("click", likeBox);
scrapBtn.addEventListener("click", scrapBox);
