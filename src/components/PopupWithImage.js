import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector(".popup__img-container-image");
        this._popupTitle = this._popupElement.querySelector(".popup__img-container-title")
    }

    open(link, name){
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupTitle.textContent = name;
        super.open();
    }
}