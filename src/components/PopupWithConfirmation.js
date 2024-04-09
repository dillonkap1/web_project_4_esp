import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
        this._handleCancelButtonClick = this._handleCancelButtonClick.bind(this);
    }

    open() {
        super.open(); // Llamamos al método open de la clase base para configurar los listeners y otras tareas necesarias.
    }

    close() {
        super.close(); // Llamamos al método close de la clase base para limpiar los listeners y otras tareas necesarias.

    }

    _handleDeleteButtonClick() {
        // Aquí podrías añadir la lógica para eliminar la tarjeta
        this.close();
    }

    _handleCancelButtonClick() {
        this.close();
    }
}
