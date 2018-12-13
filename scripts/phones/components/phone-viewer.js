import Component from '../../shared/component.js';

export default class PhoneViewer extends Component {
    constructor({ element }) {
        super({ element });

        this.on('click', event => {
            let backButton = event.target.closest('[data-element="button-back"]');
            if (!backButton) return;

            let custumEvent = new CustomEvent('back');
            this._element.dispatchEvent(custumEvent);
        });

        this.on('click', '[data-element="button-add-to-basket"]', event => {
            let phone = this._phone;

            this._trigger('add', phone.id);
        });
    }

    showPhone(phone) {
        this._phone = phone;
        this._render();

        super.show();
    }

    _render() {
        const { _phone: phone } = this;

        this._element.innerHTML = `
            <img class="phone" src="${phone.images[0]}" alt="${phone.name}">

            <button data-element="button-back">Back</button>
            <button data-element="button-add-to-basket">Add to basket</button>
        
        
            <h1>${phone.name}</h1>
        
            <p>${phone.description}</p>
        
            <ul class="phone-thumbs">
                ${phone.images.map(imageSrc => `
                    <li>
                        <img src="${imageSrc}" alt="${phone.name}">
                    </li>
                `).join('')}
            </ul>
        `;
    }
}