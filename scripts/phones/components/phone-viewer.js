import Component from '../../shared/component.js';

export default class PhoneViewer extends Component {
    constructor({ element }) {
        super({element});

        this.on('click', event => {
            let backButton = event.target.closest('[data-element="button-back"]');
            if (!backButton) return;

            let customEvent = new CustomEvent('back');
            this._element.dispatchEvent(customEvent);
        });

        this.on('click', '[data-element="button-add-to-basket"]', event => {
            let phone = this._phone;

            this._trigger('add', phone.id);
        });


        this.on('click', '[data-element="thumb-image"]', event => this._onThumbClick(event));

    }

    _onThumbClick(event) {
        let largeImage = this._largeImage;
        largeImage.src = event.delegateTarget.href;
        event.preventDefault();
    }

    showPhone(phone) {
        this._phone = phone;
        this._render();
        this._initLargeImage( this._element.querySelector('[data-element="large-image"]') );
        super.show();
    }

    _initLargeImage(largeImage) {
        this._largeImage = largeImage;
    }

    _render() {
        const { _phone: phone } = this;

        this._element.innerHTML = `
            <img class="phone" src="${phone.images[0]}" alt="${phone.name}" data-element="large-image">

            <button data-element="button-back">Back</button>
            <button data-element="button-add-to-basket">Add to basket</button>
        
        
            <h1>${phone.name}</h1>
        
            <p>${phone.description}</p>
        
            <ul class="phone-thumbs">
                ${phone.images.map(imageSrc => `
                    <li>
                        <a href="${imageSrc}" data-element="thumb-image">
                            <img src="${imageSrc}" alt="${phone.name}">
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;
    }
}