const SNILS_REGEX = /^\d{3}-\d{3}-\d{3} \d{2}$/;
const BAD_INPUT_VALUE_CLASS_NAME = "bad";
const SNILS_STORAGE_KEY_NAME = "code";

function hydrateInterface() {
    const snilsInputEl = document.getElementById("snils-input");

    chrome.storage.local.get([SNILS_STORAGE_KEY_NAME]).then((storage) => {
        const snils = storage[SNILS_STORAGE_KEY_NAME];

        if (snils === undefined) {
            return;
        }

        snilsInputEl.value = snils;
    });

    snilsInputEl.addEventListener("input", () => {
        const snils = snilsInputEl.value;

        if (SNILS_REGEX.test(snils)) {
            snilsInputEl.classList.remove(BAD_INPUT_VALUE_CLASS_NAME);
            chrome.storage.local.set({ code: snils });
        } else {
            snilsInputEl.classList.add(BAD_INPUT_VALUE_CLASS_NAME);
        }
    })
}

document.addEventListener('DOMContentLoaded', hydrateInterface, false);