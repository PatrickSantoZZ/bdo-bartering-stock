'use strict';

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 * @url https://stackoverflow.com/a/35385518
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 * @url https://stackoverflow.com/a/35385518
 */
function htmlToNodeList(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

export { htmlToElement, htmlToNodeList };