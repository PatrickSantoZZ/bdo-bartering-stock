'use strict';

import { htmlToElement, htmlToNodeList } from './modules/utils.mjs';
import BarterItem from './modules/BarterItem.js';

const iconRoot = (window.origin.indexOf('127.0.0.1') !== -1 ?
    './icon/' :
    '//github.com/yutsuku/bdo-bartering-stock/raw/master/icon/'
);

const itemData = [
    new BarterItem("00800058", "[Level 5] 37 Year Old Herbal Wine", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800011", "[Level 5] 102 Year Old Golden Herb", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800019", "[Level 5] Azure Quartz", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800068", "[Level 5] Elixir of Youth", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800014", "[Level 5] Faded Gold Dragon Figurine", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800039", "[Level 5] Golden Fish Scale", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800055", "[Level 5] Luxury Patterned Fabric", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800009", "[Level 5] Mysterious Rock", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800057", "[Level 5] Octagonal Box", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800067", "[Level 5] Portrait of the Ancient", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800046", "[Level 5] Statue's Tear", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800028", "[Level 5] Supreme Gold Candlestick", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800005", "[Level 5] Taxidermied Morpho Butterfly", BarterItem.GRADES.ORANGE, false),
    new BarterItem("00800064", "[Level 5] Taxidermied White Caterpillar", BarterItem.GRADES.ORANGE, false),
];

// load presistent data
for (let i = 0; i < itemData.length; i++) {
    let storageCount = localStorage.getItem(`item-${itemData[i].id}`);
    if (storageCount) {
        storageCount = Number(storageCount);
        if (storageCount > 0) {
            itemData[i].count = storageCount;
        }
    }
}

function buttonRemoveHandler(event) {
    let itemData = event.currentTarget.itemData;
    let itemIndex = event.currentTarget.itemIndex;
    let itemContainer = event.currentTarget.itemContainer;

    itemData[itemIndex].count--

    if (itemData[itemIndex].count < 0) {
        itemData[itemIndex].count = 0;
    }

    localStorage.setItem(`item-${itemData[itemIndex].id}`, itemData[itemIndex].count);
    updateItemData(itemContainer, itemData);
}

function buttonAddHandler(event) {
    let itemData = event.currentTarget.itemData;
    let itemIndex = event.currentTarget.itemIndex;
    let itemContainer = event.currentTarget.itemContainer;

    itemData[itemIndex].count++;

    localStorage.setItem(`item-${itemData[itemIndex].id}`, itemData[itemIndex].count);
    updateItemData(itemContainer, itemData);
}

/**
 * 
 * @param {Node} itemContainer
 * @param {BarterItem[]} itemData
 */
function updateItemData(itemContainer, itemData) {
    let item = itemData.find(item => item.id === itemContainer.dataset.item);
    let itemIndex = itemData.findIndex(item => item.id === itemContainer.dataset.item);
    let itemsDom = itemContainer.querySelector('.trade-items');
    let buttonAdd = itemContainer.querySelector('[data-step="add"]');
    let buttonRemove = itemContainer.querySelector('[data-step="remove"]');

    while (itemsDom.firstChild) {
        itemsDom.firstChild.remove();
    }

    for (let i = 0; i < item.count; ++i) {
        let html = htmlToElement(`
        <div class="trade-item">
            <img src="${iconRoot}${item.id}.png"
                title="${item.name}"
                alt="${item.name}" />
        </div>`);
        itemsDom.appendChild(html);
    }

    delete buttonAdd.itemData;
    delete buttonAdd.itemContainer;
    delete buttonAdd.itemIndex;

    delete buttonRemove.itemData;
    delete buttonRemove.itemContainer;
    delete buttonRemove.itemIndex;

    buttonAdd.removeEventListener('click', buttonAddHandler, false);
    buttonRemove.removeEventListener('click', buttonRemoveHandler, false);

    buttonAdd.addEventListener('click', buttonAddHandler, false);
    buttonRemove.addEventListener('click', buttonRemoveHandler, false);

    buttonAdd.itemData = itemData;
    buttonAdd.itemContainer = itemContainer;
    buttonAdd.itemIndex = itemIndex;

    buttonRemove.itemData = itemData;
    buttonRemove.itemContainer = itemContainer;
    buttonRemove.itemIndex = itemIndex;
}

/**
 * @param {BarterItem[]} itemData
 */
function updateAllItems(itemData) {
    let itemsDom = document.querySelectorAll('[data-item]');

    const translationGrade = [
        BarterItem.GRADES.WHITE = 'white',
        BarterItem.GRADES.GREEN = 'green',
        BarterItem.GRADES.BLUE = 'blue',
        BarterItem.GRADES.YELLOW = 'yellow',
        BarterItem.GRADES.ORANGE = 'orange',
    ]

    itemsDom.forEach( (itemContainer) => {
        // prepare headers (thanks github/lfs, ugh)
        const item = itemData.find(item => item.id === itemContainer.dataset.item);
        let html = htmlToElement(`
        <p class="flex">
            <img src="${iconRoot}${item.id}.png" />
            <span class="grade-${translationGrade[item.grade]}">${item.name}</span>
        </p>`);
        itemContainer.prepend(html);

        // load data
        updateItemData(itemContainer, itemData);
    });
}


/** start */
updateAllItems(itemData)
