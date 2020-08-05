import images from "./gallery-items.js";

const gallery = document.querySelector(".gallery");
const largeImg = document.querySelector(".lightbox__image");
const modalIcon = document.querySelector(".lightbox");
const btnClose = document.querySelector('button[data-action="close-lightbox"]');
let modalImageUrl;
let modalImageAlt;
let findIndexImage;

const makeItem = ({ preview, original, description, index }) => {
  return `<li class="gallery__item">
    <a
      class="gallery__link"
      href=${original}
    >
      <img
        class="gallery__image"
        src=${preview}
        data-source=${original}
        alt=${description}
        index=${index}
      />
    </a>
  </li>`;
};

const makeGallery = images.reduce((acc, el) => (acc += makeItem(el)), "");

gallery.insertAdjacentHTML("beforeend", makeGallery);

gallery.addEventListener("click", openModal);
function openModal(event) {
  event.preventDefault();
  const targetRef = event.target;

  if (targetRef.nodeName !== "IMG") {
    return;
  }
  modalImageUrl = event.target.dataset.source;
  modalImageAlt = event.target.alt;

  setAttributeImage(modalImageUrl, modalImageAlt);
  modalIcon.classList.add("is-open");
  window.addEventListener("keydown", handlArrowPress);
  window.addEventListener("keydown", closeByEsc);
  btnClose.addEventListener("click", closeModal);
  modalIcon.addEventListener("click", closeByOverley);
}

function setAttributeImage(src, alt) {
  largeImg.setAttribute("src", src);
  largeImg.setAttribute("alt", alt);
}

function closeModal() {
  largeImg.src = "";
  modalIcon.classList.remove("is-open");
  window.removeEventListener("keydown", handlArrowPress);
  window.removeEventListener("keydown", closeByEsc);
  btnClose.removeEventListener("click", closeModal);
  modalIcon.removeEventListener("click", closeByOverley);
}

function closeByOverley() {
  if (event.target.nodeName == "IMG") {
    // leftOrRigthByImg();
    return;
  }
  closeModal();
  return;
}

// function leftOrRigthByImg() {
//   const imageXY = event.target.clientWidth * 0.5;
//   if (event.offsetX > imageXY) {
//     rightImageIndex();
//     return;
//   }
//   if (event.offsetX < imageXY) {
//     leftImageIndex();
//     return;
//   }
// }

function closeByEsc() {
  if (event.keyCode == "27") {
    closeModal();
  }
}

function handlArrowPress(el) {
  if (event.keyCode == "39") {
    rightImageIndex();
  }
  if (event.keyCode == "37") {
    leftImageIndex();
  }
}

function setAttribute() {
  modalImageUrl = images[findIndexImage].original;
  modalImageAlt = images[findIndexImage].description;
  setAttributeImage(modalImageUrl, modalImageAlt);
}

function findIndexImg() {
  findIndexImage = images.findIndex((el) => el.original === modalImageUrl);
}

function leftImageIndex() {
  findIndexImg();
  if (findIndexImage === 0) {
    findIndexImage = images.length - 1;
  } else {
    findIndexImage -= 1;
  }
  setAttribute();
}

function rightImageIndex() {
  findIndexImg();
  if (findIndexImage === images.length - 1) {
    findIndexImage = 0;
  } else {
    findIndexImage += 1;
  }
  setAttribute();
}
