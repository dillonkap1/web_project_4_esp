export const buttonAdd = document.querySelector(".profile__button-add");
export const buttonEdit = document.querySelector(".profile__button-edit")
export const closeButtons = document.querySelectorAll(".popup__button-close");

export const likeIcon = document.querySelectorAll(".card__like");
export const likeIconDark = document.querySelectorAll(".card__like-dark");
export const title = document.querySelector(".profile__name");
export const subtitle =document.querySelector(".profile__text");
export const nameInput = document.querySelector(".popup__input-name");
export const textInput = document.querySelector(".popup__input-text");
export const popupProfile = ".popup-edit";
export const saveButton = document.querySelector(".popup__button-save");
export const cardImage = document.querySelectorAll(".card__image");
export const buttonCloseCard = document.querySelector(".popup__button-close-images")
export const popupFormImage = ".popup-add";
export const popupPreview = ".popup_preview_images"

export const titleInput = document.querySelector(".popup__input-title");
export const imageUrlInput = document.querySelector(".popup__input-image");
export const createNewPlaceButton = document.querySelector(".popup__button-create");

import valleYosemite from "../dist/valleYosemite.png";
import washington from "../images/Washington.jpg";
import newYork from "../images/newyork.jpg";
import montanasCalvas from "../images/montanasCalvas.png";
import lagoLouise from "../images/lagoLouise.png"
import chicago from "../images/chicago.jpg"

export const initialCards = [
    {
        name : "Valle Yosemite",
        link : valleYosemite
    },
    {
        name: "Washington",
        link: washington
    },
    {
        name: "New York",
        link: newYork
    },
    {
        name: "Montañas Calvas",
        link: montanasCalvas
    },
    {
        name: "Lago Louise",
        link: lagoLouise
    },
    {
        name: "Chicago",
        link: chicago
    }
]