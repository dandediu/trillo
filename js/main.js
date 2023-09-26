import { DropDown } from '../js/drop-down.js';
import List from './list.js';
import ListItem from './list-item.js';
import uid from '../utils/uid.js';
import { CHATS_DROPDOWN_LIST } from '../utils/constants.js';
import { DROPDOWN_SELECTORS } from '../utils/selectors.js';

// Launch app
const initApp = () => {
    /****** Event Listers ******/
    // close drop-down on outside click
    document.addEventListener('click', (event) => {
        if (event.target.closest(`.${DROPDOWN_SELECTORS.general}`)) return;

        // activeDropDown.close();s
    });

    // Procedural
    refreshThePage();
    renderElements();
};

/* EVENT LISTENERS */
document.addEventListener('readystatechange', (event) => {
    // DOM is fully loaded
    if (event.target.readyState === 'complete') {
        // Init our App
        initApp();
    }
});

/* Elements Init */
// const chatListSelector = document.querySelector(CHATS_SELECTORS.list);
// const chatList = new List(chatListSelector);
// const dropDownSelector = document.querySelector(`.${DROPDOWN_SELECTORS.all}`);
// const activeDropDown = new DropDown(dropDownSelector);

const refreshThePage = () => {
    // todo1: close modal
    // todo2: close drop-down
    // todo3:
};

const renderElements = () => {
    // renderDorpDownList();
    initDropdowns();
    renderChatsDorpDownList();
};

const initDropdowns = () => {
    const allDropdowns = document.querySelectorAll(
        `.${DROPDOWN_SELECTORS.general}`
    );

    allDropdowns.forEach((item) => {
        new DropDown(item);
        // console.log(item);
    });
};

const renderChatsDorpDownList = () => {
    // todo: render list from array of objects  (ex: {link: '*', label: 'Home' } ).
    // const list = chatList.getList();

    const list = CHATS_DROPDOWN_LIST.map((item) => {
        const listItem = new ListItem();
        listItem.setId(uid());
        listItem.setItem(item);

        return buildListItem(listItem);
    });
    const chatsDropdown = document.querySelector(
        `#${DROPDOWN_SELECTORS.general}__chats`
    );
    const items = chatsDropdown.querySelector(`.${DROPDOWN_SELECTORS.list}`);
    list.forEach((item) => items.appendChild(item));
};

const buildListItem = (item) => {
    const listItem = document.createElement('li');
    listItem.id = item.getId();
    listItem.classList.add(`${DROPDOWN_SELECTORS.listItem}`);

    const link = document.createElement('li');
    link.href = item.getItem()?.href || '#';
    link.classList.add(`${DROPDOWN_SELECTORS.link}`);

    const userName = document.createElement('span');
    userName.classList.add(`${DROPDOWN_SELECTORS.name}`);
    userName.textContent = item.getItem().label;

    const description = document.createElement('span');
    description.classList.add(`${DROPDOWN_SELECTORS.details}`);
    description.textContent = item.getItem().description;

    link.appendChild(userName);
    link.appendChild(description);
    listItem.appendChild(link);

    return listItem;
};
