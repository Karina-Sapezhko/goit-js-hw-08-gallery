import gallery from "./gallery-items.js";
// ===================================================creatingList===========================================
const listGalleryRef = document.querySelector(".js-gallery");

// let addItemGallery = (elOriginal, elSrc, elAlt) => {
//   listGalleryRef.insertAdjacentHTML(
//     "beforeend",
//     `<li class="gallery__item"><a class="gallery__link" href="${elOriginal}"><img class="gallery__image" src="${elSrc}" data-source="${elOriginal}" alt="${elAlt}"></a></li>`
//   );
// };

// gallery.map((obj) =>
//   addItemGallery(obj.original, obj.preview, obj.description)
// );

// ----------------------------------------------------variant 2--------------------
let addItemGallery = (elOriginal, elSrc, elAlt) => {
  let item = document.createElement("li");
  let link = document.createElement("a");
  let img = document.createElement("img");
  link.setAttribute("href", elOriginal);
  img.setAttribute("src", elSrc);
  img.setAttribute("data-source", elOriginal);
  img.setAttribute("alt", elAlt);
  item.classList.add("gallery__item");
  link.classList.add("gallery__link");
  img.classList.add("gallery__image");
  item.append(link);
  link.append(img);

  return item;
};
const items = gallery.map((obj) =>
  addItemGallery(obj.original, obj.preview, obj.description)
);

listGalleryRef.append(...items);
// =================================================GalleryClick======================================
const lightBoxImage = document.querySelector(".lightbox__image");

listGalleryRef.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  const largeImg = event.target.dataset.source;
  const largeAlt = event.target.alt;

  setLargeImg(largeImg, largeAlt);
}

function setLargeImg(url, alt) {
  lightBoxImage.src = url;
  lightBoxImage.alt = alt;
}

// ==============================================================Modal================================

const refs = {
  modal: document.querySelector(".lightbox"),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  openModal: document.querySelector(".js-gallery"),
  backdrop: document.querySelector(".lightbox__content"),
};

refs.openModal.addEventListener("click", openModal);
refs.closeModalBtn.addEventListener("click", closeModalBtn);
refs.backdrop.addEventListener("click", closeModalBackdrop);

function openModal(event) {
  window.addEventListener("keydown", onEscape);
  if (event.target.nodeName !== "IMG") {
    return;
  }
  refs.modal.classList.add("is-open");
}

function closeModalBtn() {
  window.removeEventListener("keydown", onEscape);
  refs.modal.classList.remove("is-open");
  setLargeImg("", "");
}

function closeModalBackdrop(event) {
  window.removeEventListener("keydown", onEscape);
  if (event.target === event.currentTarget) {
    refs.modal.classList.remove("is-open");
    setLargeImg("", "");
  }
}

function onEscape(event) {
  if (event.code === "Escape") {
    closeModalBtn();
    setLargeImg("", "");
  }
}
