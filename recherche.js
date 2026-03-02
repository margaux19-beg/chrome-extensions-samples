document.getElementById("valider").addEventListener("click", function() {
    const numero = document.getElementById("numero").value;
    const adresse = document.getElementById("adresse").value;

    // Envoi des infos au serveur Python local
    fetch("http://127.0.0.1:5000/generer_reponse", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({numero: numero, adresse: adresse})
    })
    .then(response => response.json())
    .then(data => {
        const texte = data.texte_reponse;

        // Injecte le texte dans le champ de réponse Gmail actif
        chrome.scripting.executeScript({
            target: {tabId: chrome.tabs.TAB_ID_HERE}, // l'extension détectera le bon onglet
            func: (texte) => {
                // Sélectionne le champ de réponse Gmail et remplit le texte
                document.querySelector("div[aria-label='Message Body']").innerText = texte;
            },
            args: [texte]
        });
    })
    .catch(err => alert("Erreur : " + err));
});
