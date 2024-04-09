export default class Card {
    constructor(name,link, templateSelectror, handleCardClick, likes, cardId){
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelectror;
        this._handleCardClick = handleCardClick;
        this._likes = likes;
        this._liked= false;
        this._id = cardId;
    }

    getTemplate(){
        const templateSelectror = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
        return templateSelectror;
    }

    _handleLikeClick() {
        if (!this._liked) { 
            this._liked = true;
            this._likes++;
        } else {
            this._liked = false;
            this._likes--;
        }

        this._updateLikes();
        this._updateLikesOnServer()
    }

    _disableLikeButton() {
        if (this._element) { // Verificar si _element no es undefined
            this._element.querySelector('.card__like').removeEventListener('click', this._toggleLike.bind(this));
        }
    }
    


    _updateLikes(){
        this._cardElement.querySelector(".card__likes").textContent = this._likes
    }

    _updateLikesOnServer() {
        fetch(`https://around.nomoreparties.co/v1/web_es_11/cards/likes/${this._id}`, {
            method: 'PUT',
            headers: {
                authorization: "aeb303a7-85a3-41cc-b9b3-71f2eddd73ac",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                likes: this._likes
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Contador de likes actualizado en el servidor');
            } else {
                throw new Error('Error al actualizar el contador de likes en el servidor');
            }
        })
        .catch(error => {
            console.error(error);
            
        });
    }


    _setEventListeners(cardElement) {
        const buttonLike = cardElement.querySelector(".card__like");
        const buttonLikeDark = cardElement.querySelector(".card__like-dark")
        buttonLike.addEventListener("click", this._toggleLike.bind(this));
        buttonLikeDark.addEventListener("click", this._toggleLike.bind(this));
    
        const buttonImage = cardElement.querySelector(".card__image");
        buttonImage.addEventListener("click", this._handleCardClick);
      }
    

      _toggleLike(evt) {
        this._handleLikeClick()

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
        const cardLikes = cardElement.querySelector(".card__likes")

        cardImage.src = this._link;
        cardImage.alt = this._name;

        cardTitle.textContent = this._name;
        cardLikes.textContent = this._likes;

        this._setEventListeners(cardElement);

        return cardElement;
    }
    
}

