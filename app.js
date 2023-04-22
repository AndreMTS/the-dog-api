function getBreeds() {
    fetch('https://api.thedogapi.com/v1/breeds')
        .then(response => response.json())
        .then(data => {
            let breeds = data.map(breed => {
                return {
                    name: breed.name,
                    image: breed.image.url,
                    temperament: breed.temperament,
                    life_span: breed.life_span,
                    height: breed.height.metric,
                    weight: breed.weight.metric
                }
            });
            //Obtem o Id do local onde vai ser mostrado no html a lista com dados dos Doguinhos
            let breedList = document.getElementById('breed-list');

            breeds.forEach(breed => {
                let card = document.createElement('div');
                card.classList.add('card', 'mb-3', 'col-md-3', 'col-sm-6', 'col-xs-12', 'p-3', 'm-2','card-style');
                let row = document.createElement('div');
                row.classList.add('row', 'g-0');
                let col = document.createElement('div');
                col.classList.add('col-md-4');
                let img = document.createElement('img');
                img.src = breed.image;
                img.classList.add('img-fluid');
                img.alt = breed.name;

                col.appendChild(img);
                row.appendChild(col);
                col = document.createElement('div');
                col.classList.add('col-md-8');
                let cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                let cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = breed.name;
                cardBody.appendChild(cardTitle);
                card.addEventListener('click', () => showDetails(breed));
                col.appendChild(cardBody);
                row.appendChild(col);
                card.appendChild(row);
                breedList.appendChild(card);
            });
        })
        .catch(error => console.error(error));
}

function showDetails(breed) {
    let modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'breed-modal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-hidden', 'true');
    let modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    let modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    let modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = breed.name;
    let closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    let modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    let img = document.createElement('img');
    img.src = breed.image;
    img.classList.add('img-fluid');
    img.alt = breed.name;
    modalBody.appendChild(img);
    let temperament = document.createElement('p');
    temperament.classList.add('card-text');
    temperament.innerHTML = `<strong>Temperamento:</strong> ${breed.temperament}`;
    modalBody.appendChild(temperament);
    let lifeSpan = document.createElement('p');
    lifeSpan.classList.add('card-text');
    lifeSpan.innerHTML = `<strong>Expectativa de vida:</strong> ${breed.life_span}`;
    modalBody.appendChild(lifeSpan);
    let height = document.createElement('p');
    height.classList.add('card-text');
    height.innerHTML = `<strong>Altura:</strong> ${breed.height} cm`;
    modalBody.appendChild(height);
    let weight = document.createElement('p');
    weight.classList.add('card-text');
    weight.innerHTML = `<strong>Peso:</strong> ${breed.weight} kg`;
    modalBody.appendChild(weight);
    modalContent.appendChild(modalBody);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    document.body.appendChild(modal);
    let modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

window.onload = function () {
    getBreeds();
}