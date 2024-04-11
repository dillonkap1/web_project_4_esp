import Popup from "./Popup.js";
import { título, subtítulo } from "./const.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
    }

    _getInputValues() {
        const form = this._popupElement.querySelector(".popup__form");
        const inputs = form.querySelectorAll(".popup__container-input");
        const valores = {};

        inputs.forEach((input) => {
            valores[input.name] = input.value;
        });
        console.log("Datos recogidos:", valores);
        return valores;

    }

    setInputValues(data) {
        super.setEventListeners();
        const form = this._popupElement.querySelector(".popup__form");
        const inputs = form.querySelectorAll(".popup__container-input");
    
        // Comprobar si data está definido y es un array
        if (!data || !Array.isArray(data)) {
            console.error("Data no está definido o no es un array");
            return;
        }
    
        // Comprobar si la longitud de data es igual a la longitud de inputs
        if (data.length !== inputs.length) {
            console.error("La longitud de 'data' no coincide con la cantidad de inputs");
            return;
        }
    
        inputs.forEach((input, index) => {
            input.value = data[index];
        });
    }
    

    setEventListeners() {
        super.setEventListeners();
        const form = this._popupElement.querySelector(".popup__form");
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        const form = this._popupElement.querySelector(".popup__form");
        form.reset();
    }
}
