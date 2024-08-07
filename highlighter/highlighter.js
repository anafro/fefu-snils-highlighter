const highlightCode = () => {
    chrome.storage.local.get(["code"]).then(({code}) => {
        const table = document.querySelector("#abitur > tbody");

        if (!table) {
            return;
        }

        const rows = [...table.children];
        rows.filter(row => {
            row.removeAttribute("data-highlighted");
            const codeCellText = row.children[1].innerText;
            return codeCellText.startsWith(code);
        }).forEach(row => {
            row.setAttribute("data-highlighted", "yes");
        });
    });

}

setInterval(highlightCode, 1000);
