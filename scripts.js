const buttonEdit = document.querySelector(".profile__button-edit");
const buttonAdd = document.querySelector(".profile__button-add");
const closeButtons = document.querySelectorAll(".popup__button-close");

const likeIcon = document.querySelectorAll(".card__like");
const likeIconDark = document.querySelectorAll(".card__like-dark");
const title = document.querySelector(".profile__name");
const subtitle =document.querySelector(".profile__text");
const nameInput = document.querySelector(".popup__input-name");
const textInput = document.querySelector(".popup__input-text");
const popupProfile = document.querySelector(".popup-edit");
const saveButton = document.querySelector(".popup__button-save");
const cardImage = document.querySelectorAll(".card__image");
const buttonCloseCard = document.querySelector(".popup__button-close-images")
const popupFormImage = document.querySelector(".popup-add");

const titleInput = document.querySelector(".popup__input-title");
const imageUrlInput = document.querySelector(".popup__input-image");
const createNewPlaceButton = document.querySelector(".popup__button-create");

closeButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closePopup(popup);
  });
});

function closePopup(popup) {
  if (popup.classList.contains("popup-edit")) {
    closePopupProfile();
  } else if (popup.classList.contains("popup-add")) {
    closePopupImage();
  } else if (popup.classList.contains("popup_preview_images")) {
    closePopupPreviewImage();
  }
}


function openPopupProfile(){
    popupProfile.classList.add("popup_opened");

    nameInput.value = title.textContent;
    textInput.value = subtitle.textContent;
}

function closePopupProfile(){
  popupProfile.classList.remove("popup_opened");
}


function openPopupImage(){
    popupFormImage.classList.add("popup_opened");
}

function closePopupImage(){
    popupFormImage.classList.remove("popup_opened");

    inputName.value = '';
    inputImageLink.value = '';
}


function submitButtonProfile(e){
    e.preventDefault(); 
    
    title.textContent = nameInput.value;
    subtitle.textContent = textInput.value;
    popupProfile.classList.remove("popup_opened");
}

buttonEdit.addEventListener("click", openPopupProfile);
buttonAdd.addEventListener("click", openPopupImage);
saveButton.addEventListener("click", submitButtonProfile);
buttonCloseCard.addEventListener("click", closePopupPreviewImage);


  function closePopupPreviewImage() {
    const popupPreview = document.querySelector(".popup_preview_images");
    popupPreview.classList.remove("popup_opened");
  }


  const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
      name: "Parque la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
  ];
  const elementContainer = document.querySelector(".elements");

  function createCard(cardData){
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const createCardImage = document.createElement("img");
    createCardImage.classList.add("card__image");
    createCardImage.src = cardData.link;
    createCardImage.alt = `Imagen de ${cardData.name}`;

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card__title");
    cardTitle.textContent = cardData.name;

    const cardDelete = document.createElement("img");
    cardDelete.classList.add("card__delete");
    cardDelete.src = "/images/Trash.svg";
    cardDelete.alt = "Icono para eliminar";

    const cardLike = document.createElement("img");
    cardLike.classList.add("card__like");
    cardLike.src = "/images/Group.svg";
    cardLike.alt = "Icono de Like";

    const cardLikeDark = document.createElement('img');
    cardLikeDark.classList.add('card__like', 'card__like-dark');
    cardLikeDark.src = "/images/Union.svg";
    cardLikeDark.alt = "Icono de like pulsado";

    cardLike.addEventListener("click", (evt) => {
      const element = evt.target;
      const elementDark = element.nextElementSibling;
      element.classList.add("hide");
      elementDark.classList.remove("hide");
      elementDark.classList.add("show");
    });

    cardLikeDark.addEventListener("click", (evt) => {
      const elementDark = evt.target;
      const element = elementDark.previousElementSibling;
      elementDark.classList.remove("show");
      elementDark.classList.add("hide");
      element.classList.add("show");
    });

    cardDelete.addEventListener("click", function(){
      cardElement.remove();
    })

    createCardImage.addEventListener('click', function() {
      const popUpFormImages = document.querySelector(".popup_preview_images");
      popUpFormImages.classList.add("popup_opened");
      const imagePopUp = document.getElementById("img-card-popup");
      const titlePopUp = document.getElementById("title-card-popup");

      imagePopUp.setAttribute("src", createCardImage.src);
      imagePopUp.setAttribute("alt", createCardImage.alt);

      titlePopUp.textContent = cardData.name;
  });

    cardElement.appendChild(createCardImage);
    cardElement.appendChild(cardTitle);
    cardElement.appendChild(cardDelete);
    cardElement.appendChild(cardLike);
    cardElement.appendChild(cardLikeDark);

    return cardElement;
  }

  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData);
    elementContainer.insertBefore(cardElement, elementContainer.firstChild);
  })

  const addButton = document.querySelector(".profile__button-add");
  const inputName = document.querySelector(".popup__input-title"); 
  const inputImageLink = document.querySelector(".popup__input-image");
  const createButton = document.querySelector(".popup__button-create")
  createButton.addEventListener("click", addNewCard);

  function addNewCard(e) {
    e.preventDefault();
    const cardData = {
      name: inputName.value,
      link : inputImageLink.value
    };

    const cardElement = createCard(cardData);
    elementContainer.insertBefore(cardElement, elementContainer.firstChild);

    closePopupImage();
  }