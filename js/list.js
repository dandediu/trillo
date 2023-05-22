export default class List {
    #list;

    constructor() {
        this.#list = [];
    }

    getList() {
        return this.#list;
    }

    clearList() {
        this.#list = [];
    }

    addItemToList(listItem) {
        this.#list.push(listItem);
    }

    updateList(list) {
        this.#list = this.#list.concat(list);
    }
}
