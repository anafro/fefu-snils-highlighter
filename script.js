document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById("snils-input");

    chrome.storage.local.get(["code"]).then(({code}) => {
        input.value = code;
    });

    console.log("yo")
    input.addEventListener("input", () => {
        console.log("Nice!")
        const code = input.value;
        const regex = /^\d{3}-\d{3}-\d{3} \d{2}$/;

        if (regex.test(code)) {
            input.classList.remove("bad");
            chrome.storage.local.set({ code });
        } else {
            input.classList.add("bad");
        }
    })
}, false);