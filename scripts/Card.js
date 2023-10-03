import { handleKeyDown } from './utils.js';


export default class Card {
    constructor(data, templateSelectror){
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelectror;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
        return cardElement;
    }
    

    _toggleLike(evt) {
        const likeIcon = evt.target;
        const likeIconRegular = this._element.querySelector(".card__like");
        const likeIconDark = this._element.querySelector(".card__like-dark");
    
        if (likeIconRegular && likeIconDark) {
            likeIconRegular.classList.toggle("hide");
            likeIconDark.classList.toggle("hide");
        }
    }
    
    

    _deleteCard(){
        this._element.remove();
    }

    _openPopupImage(){
        const popupPreview = document.querySelector(".popup_preview_images");
        popupPreview.classList.add("popup_opened");

        const imagePopUp = popupPreview.querySelector("#img-card-popup");
        const titlePopUp = popupPreview.querySelector("#title-card-popup");

        imagePopUp.setAttribute("src", this._link);
        imagePopUp.setAttribute("alt", `Imagen de ${this._name}`);
        titlePopUp.textContent = this._name;

        document.addEventListener("keydown", handleKeyDown);
    }

    _setEventListeners(){
        this._element.querySelector(".card__like").addEventListener("click", this._toggleLike.bind(this));
        this._element.querySelector(".card__like-dark").addEventListener("click", this._toggleLike.bind(this));
        this._element.querySelector(".card__delete").addEventListener("click", this._deleteCard.bind(this));
        this._element.querySelector(".card__image").addEventListener("click", this._openPopupImage.bind(this));
    }

    generateCard(){
        this._element = this._getTemplate();
        this._element.querySelector(".card__image").src = this._link;
        this._element.querySelector(".card__image").alt = `Imagen de ${this._name}`
        this._element.querySelector(".card__title").textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}