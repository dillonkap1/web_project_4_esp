export default class Popup {
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._popupCloseButton = this._popupElement.querySelector(".popup__button-close")
        this._popupOverlay = document.querySelector(".popup__overlay")
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners();

    }

    open(){
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keydown",this._handleEscClose)
    }

    close(){
        this._popupElement.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt){
        if(evt.key === "Escape"){
            this.close();
        }
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener("click", ()=>{
            this.close();
        })
        this._popupOverlay.addEventListener("click", (evt) => {
            if(evt.target === this._popupOverlay){
                this.close();
            }
        })
    }
}