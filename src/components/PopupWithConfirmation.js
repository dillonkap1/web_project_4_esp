import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, deleteCallback) {
        super(popupSelector);
        this._deleteCallback = deleteCallback;
        this._handleDelete = this._handleDelete.bind(this);
    }

    open(cardId) {
        super.open();
        this._cardId = cardId; // Guardamos el ID de la tarjeta
        this._popupElement.querySelector('.popup__button-delete').addEventListener('click', this._handleDelete);
    }

    close() {
        super.close();
        this._popupElement.querySelector('.popup__button-delete').removeEventListener('click', this._handleDelete);
    }

    _handleDelete() {
        // Llamamos al callback deleteCallback y pasamos el ID de la tarjeta
        this._deleteCallback(this._cardId);
        this.close();
    }
}