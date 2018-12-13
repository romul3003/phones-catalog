import Component from '../../shared/component.js';

export default class PhoneViewer extends Component {
    constructor({ element }) {
        super({ element });

        this.on('click', event => {
            let backButton = event.target.closest('[data-element="button-back"]');
            if (!backButton) return;

            let customEvent = new CustomEvent('back');
            this._element.dispatchEvent(customEvent);
        });

        this.on('click', '[data-element="thumb-image"]', event => this._onThumbClick(event));
    }

    _onThumbClick(event) {
        let largeImage = this._element.querySelector('[data-element="large-image"]');
        largeImage.src = event.delegateTarget.href;
        event.preventDefault();
    }

    showPhone(phone) {
        this._phone = phone;
        this._render();

        super.show();
    }

    _render() {
        const { _phone: phone } = this;

        this._element.innerHTML = `
            <img class="phone" src="${phone.images[0]}" alt="${phone.name}" data-element="large-image">

            <button data-element="button-back">Back</button>
            <button>Add to basket</button>
        
        
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