import { buttonAdd, buttonEdit, initialCards, popupPreview, popupProfile, popupFormImage } from "./components/const.js"
import Section from "./components/Section.js"
import Card from "./components/Card.js"
import UserInfo from "./components/UserInfo.js"
import PopupWithForm from "./components/PopupWithForm.js"
import PopupWithImage from "./components/PopupWithImage.js"
import FormValidator from "./components/FormValidator.js"
import "./pages/index.css";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js"

const formValidationSettings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-save, .popup__button-create",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-type-error",
    errorClass: "popup__error-visible"
};

const imagePopup = new PopupWithImage('.popup_preview_images');


buttonEdit.addEventListener("click", () => {
    profilePopupForm.setInputValues();
    profilePopupForm.open();
});

buttonAdd.addEventListener("click", ()=> {
    addPopup.open();
});

function fetchInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/web_es_11/cards", {
        headers: {
            authorization: "aeb303a7-85a3-41cc-b9b3-71f2eddd73ac"
        }
    })
    .then(res =>  res.json())
    .then(cards => {
        return cards.map(card => {
            return {
                name: card.name,
                link: card.link,
                likes: card.likes.length
            }
        });
    });
}

fetchInitialCards()
.then(cards => {
    if (Array.isArray(cards)) {
        const cardSection = new Section(
            {
                items: cards,
                renderer: (data) => {
                    const card = new Card(
                        data.name,
                        data.link,
                        "#cardTemplate",
                        () => {
                            imagePopup.open(data.link, data.name);
                        },
                        data.likes // Pasar el número de "me gusta" como argumento
                    );
                    const cardElement = card.generateCard();
                    cardSection.addItem(cardElement);
                }
            },
            ".elements"
        );
        cardSection.renderer();// Pasar cardSection como argumento
    } else {
        console.error("El resultado de fetchInitialCards no es un array:", cards);
    }
})
.catch(error => {
    console.error("Error fetching initial cards:", error);
});

const userInfo = new UserInfo(".profile__name", ".profile__text", ".profile__image");

fetch("https://around.nomoreparties.co/v1/web_es_11/users/me", {
    headers: {
        authorization: "aeb303a7-85a3-41cc-b9b3-71f2eddd73ac"
    }
})
.then(res => res.json())
.then((userData) => {
    console.log(userData);
    userInfo.setUserInfo(userData); 
})
.catch(error => console.error('Error:', error));


const profilePopupForm = new PopupWithForm(".popup-edit", (formData) => {
    if (!formData.name || !formData.about) {
        console.error("El nombre y la descripción no pueden estar vacíos.");
        return; 
    }

    fetch("https://around.nomoreparties.co/v1/web_es_11/users/me", {
        method: "PATCH",
        headers: {
            authorization: "aeb303a7-85a3-41cc-b9b3-71f2eddd73ac",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: formData.name,
            about: formData.about
        })
    })
    .then(response => response.json())
    .then(updatedUserData => {
        console.log("Perfil actualizado:", updatedUserData);
        userInfo.setUserInfo(updatedUserData);
        profilePopupForm.close(); // Opcional: cierra el popup después de enviar el formulario
    })
    .catch(error => console.error('Error al actualizar el perfil:', error));
});


const addPopup = new PopupWithForm(".popup-add", (data) => {
    addNewCard(data, cardSection); // Pasar cardSection como argumento
});

const cardSection = new Section(
    {
        items: initialCards, // Suponiendo que initialCards está definido previamente
        renderer: (data) => {
            const card = new Card(
                data.name,
                data.link,
                "#cardTemplate",
                () => {
                    imagePopup.open(data.link, data.name);
                }
            );
            const cardElement = card.generateCard();
            cardSection.addItem(cardElement);
        }
    },
    ".elements"
);

function addNewCard(data, cardSection) {
    fetch("https://around.nomoreparties.co/v1/web_es_11/cards", {
        method: "POST",
        headers: {
            authorization: "aeb303a7-85a3-41cc-b9b3-71f2eddd73ac",
            "Content-Type": "application/json" // Añadir Content-Type
        },
        body: JSON.stringify({
            name: data.name,
            link: data.link
        })
    })
    .then(response => response.json())
    .then(newCard => {
        const card = new Card(
            newCard.name,
            newCard.link,
            "#cardTemplate",
            function () {
                imagePopup.open(newCard.link, newCard.name);
            },
            newCard.likes, // Pasar los likes de la nueva tarjeta
            newCard._id // Pasar el ID de la nueva tarjeta
        );
        const cardElement = card.generateCard();
        cardSection.addItem(cardElement);
        addPopup.close(); // Opcional: cierra el popup después de agregar la tarjeta
    })
    .catch(error => console.error('Error al agregar la tarjeta:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("Opening PopupWithConfirmation...");
    const deleteCardButtons = document.querySelectorAll(".card__delete");
    const deleteConfirmationPopup = new PopupWithConfirmation(".popup_delete_card");

    deleteCardButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", () => {
            deleteConfirmationPopup.open();
        });
    });
});

const editProfileFormValidator = new FormValidator(formValidationSettings, document.querySelector(".popup-edit form"));
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formValidationSettings, document.querySelector(".popup-add form"));
addCardFormValidator.enableValidation();
