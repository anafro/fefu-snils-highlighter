const ADMISSION_TABLE_BODY_SELECTOR = "#abitur > tbody";
const SNILS_CELL_INDEX_IN_ADMISSION_ROWS = 1;
const SNILS_STORAGE_KEY_NAME = "code";
const HIGHLIGHTED_HTML_ATTRIBUTE_NAME = "data-highlighted";
const HIGHLIGHTED_HTML_ATTRIBUTE_VALUE = "yes";

const highlightCode = () => {
    chrome.storage.local.get([SNILS_STORAGE_KEY_NAME]).then((storage) => {
        const snils = storage[SNILS_STORAGE_KEY_NAME];
        const tableEl = document.querySelector(ADMISSION_TABLE_BODY_SELECTOR);

        if (!tableEl) {
            return;
        }

        for (const rowEl of [...tableEl.children]) {
            const snilsCellText = rowEl.children[SNILS_CELL_INDEX_IN_ADMISSION_ROWS].innerText;
            toggleAttribute(rowEl, HIGHLIGHTED_HTML_ATTRIBUTE_NAME, HIGHLIGHTED_HTML_ATTRIBUTE_VALUE, snilsCellText.startsWith(snils));
        }
    });

}

(function main() {
    setInterval(highlightCode, 1000);
})();

// --- Utilities ---

function toggleAttribute(htmlElement, attributeName, attributeValue, booleanCondition) {
    if (booleanCondition) {
        htmlElement.setAttribute(attributeName, attributeValue);
    } else {
        htmlElement.removeAttribute(attributeName);
    }
}
