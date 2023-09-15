document.addEventListener("DOMContentLoaded", function(){


    function enableValidation(settings) {
        const forms = document.querySelectorAll(settings.formSelector);
        
        forms.forEach((form) => {
          form.addEventListener('submit', function (evt) {
            evt.preventDefault();
          });
          
          setEventListeners(form, settings);
        });
      }
      
      function setEventListeners(form, settings) {
        const inputs = form.querySelectorAll(settings.inputSelector);
        const submitButton = form.querySelector(settings.submitButtonSelector);
        
        inputs.forEach((input) => {
          input.addEventListener('input', function () {
            isValid(input, settings);
            toggleSubmitButton(inputs, submitButton, settings);
          });
        });
        
        toggleSubmitButton(inputs, submitButton, settings);
      }
      
      function isValid(input, settings) {
        if (!input.validity.valid) {
          showError(input, input.validationMessage, settings);
        } else {
          hideError(input, settings);
        }
      }
      
      function showError(input, errorMessage, settings) {
        const error = input.closest('.popup__container').querySelector(`#${input.id}-error`);
        input.classList.add(settings.inputErrorClass);
        error.textContent = errorMessage;
        error.classList.add(settings.errorClass);
      }
      
      function hideError(input, settings) {
        const error = input.closest('.popup__container').querySelector(`#${input.id}-error`);
        input.classList.remove(settings.inputErrorClass);
        error.classList.remove(settings.errorClass);
        error.textContent = '';
      }
      
      function toggleSubmitButton(inputs, submitButton, settings) {
        if (hasInvalidInput(inputs)) {
          submitButton.setAttribute('disabled', true);
          submitButton.classList.add(settings.inactiveButtonClass);
        } else {
          submitButton.removeAttribute('disabled');
          submitButton.classList.remove(settings.inactiveButtonClass);
        }
      }
      
      function hasInvalidInput(inputs) {
        return Array.from(inputs).some((input) => {
          return !input.validity.valid;
        });
      }
      
      enableValidation({
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button-save, .popup__button-create",
        inactiveButtonClass: "popup__button_disabled",
        inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible"
      });

      function closeAllPopups() {
            const allPopups = document.querySelectorAll(".popup");
            
            allPopups.forEach(popup => {
                if (popup.classList.contains("popup_opened")) {
                    closePopup(popup);
                }
            });
          }
    
        document.addEventListener("click", function(e) {
        if (e.target.classList.contains("popup")) { 
            closePopupImage();
            closePopupProfile(e);
            closePopupPreviewImage();
        }
    });
    
      
      document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            closeAllPopups();
        }
    })
      

})
