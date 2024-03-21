export function openPopup(data) {
    const popupPreviewImage = document.querySelector(".popup_preview_images");
    const popupPreviewImageElement = document.querySelector(".popup__img-container-image");
    const popupPreviewImageTitle = document.querySelector(".popup__img-container-title");
    popupPreviewImageElement.src = data._link;
    popupPreviewImageElement.setAttribute("alt", data._title);
    popupPreviewImageTitle.textContent = data._title;
}