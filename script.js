const myURL = "https://makerslab.em-lyon.com/dww/data/shows.json";

// L'ensemble a été réalisé en reprenant exactement les mêmes syntaxes que votre exemple en cours, avec petit à petit des modifications persos. Comme je ne connais pas JavaScript, les modifications perso sont de mon initiative mais la méthode/syntaxe correspondante est donnée par Gemini (moyen le plus rapide pour moi d'apprendre)

// Fonction pour récupérer la donnée
const getData = async (doStuffs) => {
    try {
        const response = await fetch(myURL);
        if (!response.ok) {
            throw new Error("La réponse du network n'est pas ok " + response.statusText);
        }
        const data = await response.json();
        doStuffs(data);
    } catch (error) {
        console.error("problème de récupération de données " + error);
    }
}

// On cible notre conteneur de cartes
const container = document.querySelector("#cards-container");

getData((data) => {
    // On vide le conteneur HTML au cas où
    container.innerHTML = "";
    
    // On crée un compteur pour nos popovers
    let index = 0;

    // On crée un tableau vide pour y stocker tous les spectacles
    const allShows = [];

    // On ajoute (push) chaque catégorie dans notre grand tableau
    data.musicals.forEach(show => {
        allShows.push(show);
    });
    
    data.comedies.forEach(show => {
        allShows.push(show);
    });
    
    data.plays.forEach(show => {
        allShows.push(show);
    });

    // Maintenant on fait notre boucle sur tous les spectacles combinés
    allShows.forEach(show => {
        
        // On récupère les bonnes informations du JSON (ex: show.dates.from)
        const card = `
        <button class="show-card clickable-card" popovertarget="play-popover-${index}">
            <img src="${show.image}" alt="${show.title}" class="show-image">
            <h3 class="card-title">${show.title}</h3>
            
            <div class="card-bottom flex-row-space-between">
                <span class="price-btn">${show.price}€</span>
                <span class="heart-icon">♡</span>
            </div>
        </button>

        <div popover id="play-popover-${index}" class="modal-popover">
            <div class="popover-layout flex-row">
                
                <img src="${show.image}" alt="${show.title}" class="img-placeholder large-img">
                
                <div class="popover-details">
                    <h2>${show.title}</h2>
                    
                    <p class="detail-text underline">${show.location}</p>
                    <p class="detail-text">${show.dates.from} - ${show.dates.to}</p>
                    
                    <p class="description">
                        ${show.description}
                    </p>

                    <button class="book-ticket-btn">Book your ticket - ${show.price}€</button>
                </div>
            </div>
        </div>
        `;
        
        // On ajoute la carte dans l'HTML
        container.innerHTML += card;
        
        // On augmente l'index pour le prochain popover
        index = index + 1;
    });

    // On remet la flèche de fin
    const arrow = `
    <div class="next-arrow">
        <span>></span>
    </div>
    `;
    container.innerHTML += arrow;
});