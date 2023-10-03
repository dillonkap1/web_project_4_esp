export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleKeyDown);
}

export function closePopup(popupElement) {
    if (popupElement && popupElement.classList.contains('popup_opened')) {
        popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', handleKeyDown);
    }
}
export function handleKeyDown(event) {
    if (event.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("popup")) {
        const openedPopup = document.querySelector(".popup_opened");
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
});

export function openPopupProfile(popupProfile, title, nameInput, subtitle, textInput) {
    openPopup(popupProfile);
    nameInput.value = title.textContent;
    textInput.value = subtitle.textContent;
}

export function closePopupImage() {
    const popupFormImage = document.querySelector('.popup-add');
    closePopup(popupFormImage);
}