import Popup from "./Popup.js";

export default class ChangeAvatarPopup extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popupElement.querySelector(".popup__container-avatar");
    this._avatarLinkInput = this._form.querySelector("#avatar_link");

    // Verificar si se encontraron los elementos del formulario
    if (!this._form) {
      console.error("Formulario no encontrado en el popup");
    }
    if (!this._avatarLinkInput) {
      console.error("Campo de enlace de avatar no encontrado");
    }
    
    // Llamar al método setEventListeners después de que la superclase se haya inicializado completamente
    this.setEventListeners();
  }

  _getAvatarLink() {
    return this._avatarLinkInput.value.trim();
  }

  setEventListeners() {
    // Verificar si se encontraron los elementos del formulario
    if (this._form && this._avatarLinkInput) {
      super.setEventListeners();
      this._form.addEventListener("submit", this._handleSubmit.bind(this));
    }
  }

  _handleSubmit(event) {
    event.preventDefault();
    const newAvatarLink = this._getAvatarLink();
    this._submitCallback(newAvatarLink);
    this.close();
  }

  open() {
    super.open();
    if (this._avatarLinkInput) {
      this._avatarLinkInput.value = ""; // Limpiar el campo de enlace cada vez que se abre el popup
    }
  }
}
