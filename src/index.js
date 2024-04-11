import { buttonAdd, buttonEdit, initialCards, popupPreview, popupProfile, popupFormImage } from "./components/const.js"
import Section from "./components/Section.js"
import Card from "./components/Card.js"
import UserInfo from "./components/UserInfo.js"
import PopupWithForm from "./components/PopupWithForm.js"
import PopupWithImage from "./components/PopupWithImage.js"
import FormValidator from "./components/FormValidator.js"
import "./pages/index.css";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js"
import ChangeAvatarPopup from "./components/ChangeAvatarPopup.js"

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
        console.log("Tarjetas recuperadas:", cards);
        return cards.map(card => {
            return {
                name: card.name,
                link: card.link,
                likes: card.likes.length,
                _id: card._id
            }
        });
    });
}


const confirmationPopup = new PopupWithConfirmation('.popup_delete_card', handleDeleteConfirmation);

function handleDeleteConfirmation(cardID) {
    fetch(`https://around.nomoreparties.co/v1/web_es_11/cards/${cardID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'aeb303a7-85a3-41cc-b9b3-71f2eddd73ac',
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.ok) {
            // Agregar una pausa antes de eliminar la tarjeta del DOM
            setTimeout(() => {
                const cardElement = document.getElementById(cardID);
                if (cardElement) {
                    cardElement.remove();
                    console.log('Tarjeta eliminada exitosamente.');
                } else {
                    console.error('No se encontró la tarjeta en el DOM.');
                }
            }, 100); // Pausa de 100 milisegundos (ajusta según sea necesario)
        } else {
            throw new Error('Error al eliminar la tarjeta.');
        }
    })
    .catch(error => {
        console.error(error.message);
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
                        data.likes
                    );
                    const cardElement = card.generateCard();
                    cardSection.addItem(cardElement);

                    // Selección de botones dentro del renderer
                    const deleteButtons = cardElement.querySelectorAll('.card__delete');
                    deleteButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            console.log("Button clicked. Card ID:", data._id); // Agregar este console.log()
                            confirmationPopup.open(data._id); // Pasar el _id de la tarjeta
                        });
                    });
                }
            },
            ".elements"
        );
        
        cardSection.renderer((data) => {
            const card = new Card(
                data.name,
                data.link,
                "#cardTemplate",
                () => {
                    imagePopup.open(data.link, data.name);
                },
                data.likes,
                data._id
            );
            const cardElement = card.generateCard();
            cardSection.addItem(cardElement);
            const cardID = data._id
        
            // Selección de botones dentro del renderer
            const deleteButtons = cardElement.querySelectorAll('.card__delete');
            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    console.log("Button clicked");
                    confirmationPopup.open(cardID);
                });
            });
        });
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
        profilePopupForm.close(); 
    })
    .catch(error => console.error('Error al actualizar el perfil:', error));
});


const addPopup = new PopupWithForm(".popup-add", (data) => {
    addNewCard(data, cardSection);
});

const cardSection = new Section(
    {
        items: initialCards, 
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
    console.log("Añadiendo nueva tarjeta...");
    console.log("Datos recibidos:", data);

    fetch("https://around.nomoreparties.co/v1/web_es_11/cards", {
        method: "POST",
        headers: {
            authorization: "aeb303a7-85a3-41cc-b9b3-71f2eddd73ac",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            name: data.name,
            link: data.link
        })
    })
    .then(response => {
        console.log("Respuesta recibida:", response);
        return response.json();
    })
    .then(newCard => {
        console.log("Nueva tarjeta creada:", newCard);
        const card = new Card(
            newCard.name,
            newCard.link,
            "#cardTemplate",
            function () {
                imagePopup.open(newCard.link, newCard.name);
            },
            newCard.likes,
            newCard._id
        );
        const cardElement = card.generateCard();
        const cardSection = document.querySelector('.elements');
        const firstCard = cardSection.querySelector('.card');
        cardSection.insertBefore(cardElement, firstCard);
        addPopup.close();
    })
    .catch(error => {
        console.error('Error al agregar la tarjeta:', error);
        console.log('Error:', error.message);
    });
}

const handleAvatarUpdate = async (newAvatarLink) => {
    try {
      await fetch('https://around.nomoreparties.co/v1/web_es_11/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: "aeb303a7-85a3-41cc-b9b3-71f2eddd73ac",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: newAvatarLink
        })
      });
  

      const profileImage = document.querySelector('.profile__image');
      profileImage.src = newAvatarLink; 
  
      console.log('La imagen de perfil se ha actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar la imagen de perfil:', error);
    }
  };
  
const changeAvatarPopup = new ChangeAvatarPopup(".popup-edit-avatar", handleAvatarUpdate);
changeAvatarPopup.setEventListeners();

const avatarEditButton = document.querySelector(".profile__edit")
avatarEditButton.addEventListener("click", () => changeAvatarPopup.open());


const editProfileFormValidator = new FormValidator(formValidationSettings, document.querySelector(".popup-edit form"));
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formValidationSettings, document.querySelector(".popup-add form"));
addCardFormValidator.enableValidation();

