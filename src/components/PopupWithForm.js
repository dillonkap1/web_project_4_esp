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
        if (data && data.length > 0) {
            const form = this._popupElement.querySelector(".popup__form");
            const inputs = form.querySelectorAll(".popup__container-input");
            inputs.forEach((input, index) => {
                if (data[index]) {
                    input.value = data[index];
                }
            });
        }
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
