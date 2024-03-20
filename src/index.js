import { buttonAdd, buttonEdit, initialCards, popupPreview, popupProfile,popupFormImage } from "./scripts/const.js"
import Section from "./scripts/Section.js"
import Card from "./scripts/Card.js"
import UserInfo from "./scripts/UserInfo.js"
import PopupWithForm from "./scripts/PopupWithForm.js"
import PopupWithImage from "./scripts/PopupWithImage.js"
import FormValidator from "./scripts/FormValidator.js"
import "./pages/index.css";

const formValidationSettings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-save, .popup__button-create",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-type-error",
    errorClass: "popup__error-visible"
  };

buttonEdit.addEventListener("click", () => {
    profilePopupForm.setInputValues();
    profilePopupForm.open();
})

buttonAdd.addEventListener("click", ()=> {
    addPopup.open();
})

const cardSection = new Section(
    {
        items: initialCards,
        renderer: (data) => {
            const card = new Card(
                data.name,
                data.link,
                "#cardTemplate",
                function(){
                    imagePopup.open(data.link, data.name);
                }
            );
            const cardElement = card.generateCard();
            cardSection.addItem(cardElement);
        }
    },
    ".elements"
);
cardSection.renderer();

const userInfo = new UserInfo(".profile__name", ".profile__name");

const profilePopupForm = new PopupWithForm(popupProfile, (data) => {
    userInfo.setUserInfo(data);
})

const addPopup = new PopupWithForm(popupFormImage, (data) => {
    const newCard = new Card(
        data.title,
        data.url,
        "#cardTemplate",
        function(){
            imagePopup.open(data.url, data.name);
        }
    )
    const cardElement = newCard.generateCard();
    cardSection.addItem(cardElement,true);
})


const imagePopup = new PopupWithImage(popupPreview);

const editProfileFormValidator = new FormValidator(formValidationSettings, document.querySelector(".popup-edit form"));
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formValidationSettings, document.querySelector(".popup-add form"));
addCardFormValidator.enableValidation();