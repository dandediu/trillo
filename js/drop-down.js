import { DROPDOWN_SELECTORS } from '../utils/selectors.js';
import uid from '../utils/uid.js';

export class DropDown {
    #element = null;
    #list = null;
    #label = null;
    #id = null;
    #isButtonActive = null;

    constructor(element) {
        if (!(element instanceof HTMLElement)) {
            throw new TypeError('The element must be an HTML element.');
        }

        this.#element = element;
        this.#label = this.#element.querySelector(
            'button[data-toggle="dropdown"]'
        );
        this.#list = this.#element.querySelector(`.${DROPDOWN_SELECTORS.list}`); // todo: create list if it doesn't exist

        if (this.#list) {
            this.#list.addEventListener('click', () => this.#close());
        }

        if (this.#label) {
            const id = this.#label.id ? this.#label.id : uid();

            this.#isButtonActive = this.#label.getAttribute('data-active');
            this.#id = `${DROPDOWN_SELECTORS.general}__${id}`;
            this.#element.id = this.#id;
            this.#label.addEventListener('click', () => {
                this.#toggle();
            });
        }

        document.addEventListener('click', (event) => {
            if (!this.#element.contains(event.target)) {
                this.#close();
            }
        });
    }

    getId() {
        return this.#id;
    }

    getList() {
        return this.#list;
    }

    #toggle() {
        this.#list.classList.toggle(DROPDOWN_SELECTORS.open);
        this.#label.classList.toggle(this.#isButtonActive);
    }

    #close() {
        this.#label?.classList?.remove(this.#isButtonActive);
        this.#list?.classList?.remove(DROPDOWN_SELECTORS.open);
    }
}
