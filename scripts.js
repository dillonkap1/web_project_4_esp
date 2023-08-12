const buttonEdit = document.querySelector(".button__edit");
const buttonAdd = document.querySelector(".button__add");
const buttonClose = document.querySelector(".popup__button-close");
const buttonCloseImages = document.querySelector(".popup__button-close");

const likeIcon = document.querySelectorAll(".card__like");
const likeIconDark = document.querySelectorAll(".card__like-dark");
const title = document.querySelector(".profile__info-name");
const subtitle =document.querySelector(".profile__info-text");
let nameInput = document.querySelector(".popup__container-input-name");
let textInput = document.querySelector(".popup__container-input-text");
const popupProfile = document.querySelector(".popup__edit");
const saveButton = document.querySelector(".save__button");
const cardImage = document.querySelectorAll(".card__image");
const buttonCloseCard = document.querySelector(".popup__container-btn-closed_images")
const popupFormImage = document.querySelector(".popup__add");


likeIcon.forEach((like) => {
    like.addEventListener("click", (evt) => {
      const element = evt.target;
      const elementDark = element.nextElementSibling;
      element.classList.add("hide");
      element.classList.remove("hide");
      elementDark.classList.add("show");
      elementDark.classList.remove("hide");
    });
  });

likeIconDark.forEach((likeDark) => {
    likeDark.addEventListener("click", (evt) => {
      const elementDark = evt.target;
      const element = elementDark.previousElementSibling;
      element.classList.remove("hide");
      element.classList.add("show");
      elementDark.classList.add("hide");
      elementDark.classList.remove("show");
    });
  });

function openPopupProfile(){
    popupProfile.classList.add("popup_opened");

    nameInput.value = title.textContent;
    textInput.value = subtitle.textContent;
}

function closePopupProfile(){
    const buttonClose = document.querySelector(".popup__edit");
    popupProfile.classList.remove("popup_opened");
}

function openPopupImage(){
    popupFormImage.classList.add("popup_opened");
}

function closePopupImage(){
    const buttonCloseImages = document.querySelector(".popup");
    popupFormImage.classList.remove("popup_opened");
}

function buttonProfileSubmit(e){
    e.preventDefault(); 
    
    title.textContent = nameInput.value;
    subtitle.textContent = textInput.value;
    popupProfile.classList.remove("popup_opened");
}

buttonEdit.addEventListener("click", openPopupProfile);
buttonAdd.addEventListener("click", openPopupImage)
buttonClose.addEventListener("click", closePopupProfile);
buttonCloseImages.addEventListener("click", closePopupImage);
saveButton.addEventListener("click", buttonProfileSubmit);
buttonCloseCard.addEventListener("click", closePopupPreviewImage);


cardImage.forEach((card) => {
    card.addEventListener("click", (e) => {
      const routeImage = e.target.src;
      const altImage = e.target.alt;
      const popUpFormImages = document.querySelector(".popup_preview_images");
      popUpFormImages.classList.add("popup_opened");
      const imagePopUp = document.getElementById("img-card-popup");
      imagePopUp.setAttribute("src", routeImage);
      imagePopUp.setAttribute("alt", altImage);
    });
  });

  function closePopupPreviewImage() {
    const popupPreview = document.querySelector(".popup_preview_images");
    popupPreview.classList.remove("popup_opened");
  }