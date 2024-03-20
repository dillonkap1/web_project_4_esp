export default class Card {
    constructor(name,link, templateSelectror, handleCardClick){
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelectror;
        this._handleCardClick = handleCardClick;
    }

    getTemplate(){
        const templateSelectror = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
        return templateSelectror;
    }

    _setEventListeners(cardElement) {
        const buttonLike = cardElement.querySelector(".card__like");
        const buttonLikeDark = cardElement.querySelector(".card__like-dark")
        buttonLike.addEventListener("click", this._toggleLike.bind(this));
        buttonLikeDark.addEventListener("click", this._toggleLike.bind(this));
    
        const buttonDelete = cardElement.querySelector(".card__delete");
        buttonDelete.addEventListener("click", () => {
          const card = buttonDelete.closest(".card");
          card.remove();
        });
    
        const buttonImage = cardElement.querySelector(".card__image");
        buttonImage.addEventListener("click", this._handleCardClick);
      }
    

      _toggleLike(evt) {
        const likeIcon = evt.target;
        const likeIconRegular = this._cardElement.querySelector(".card__like");
        const likeIconDark = this._cardElement.querySelector(".card__like-dark");
    
        if (likeIconRegular && likeIconDark) {
            likeIconRegular.classList.toggle("hide");
            likeIconDark.classList.toggle("hide");
        }
    }
    
    
    
    generateCard(){
        const cardElement = this.getTemplate();
        this._cardElement = cardElement;

        const cardImage = cardElement.querySelector(".card__image");
        const cardTitle = cardElement.querySelector(".card__title")

        cardImage.src = this._link;
        cardImage.alt = this._name;

        cardTitle.textContent = this._name;

        this._setEventListeners(cardElement);

        return cardElement;
    }
}