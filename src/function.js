const API_URL = 'https://rickandmortyapi.com/api/character';
const cardsContainer = document.getElementById('cardsContainer');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

async function fetchCharacters(name = '', status = '') {
      try {
        const response = await fetch(`${API_URL}/?name=${name}&status=${status}`);
        if (!response.ok) throw new Error('Personaje no encontrado');
        
        const data = await response.json();
        renderCards(data.results);
      } catch (error) {
        cardsContainer.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; color: var(--accent-pink); font-size: 1.1rem; padding: 2rem;">
            ✨ No se encontraron personajes interdimensionales con esos criterios.
          </div>
        `;
      }
    }
    function renderCards(characters) {
      cardsContainer.innerHTML = characters.map(char => {
        const statusClass = char.status.toLowerCase() === 'alive' ? 'status-alive' 
                          : char.status.toLowerCase() === 'dead' ? 'status-dead' 
                          : 'status-unknown';

        return `
          <article class="card">
            <div class="card-img-container">
              <img src="${char.image}" alt="${char.name}" loading="lazy">
            </div>
            <div class="card-body">
              <h2 class="card-title">${char.name}</h2>
              <div class="status-badge">
                <span class="status-dot ${statusClass}"></span>
                ${char.status} - ${char.species}
              </div>
              <p class="card-info">
                Última ubicación:<br>
                <span>${char.location.name}</span>
              </p>
            </div>
          </article>
        `;
      }).join('');
    }

    // Escuchadores de eventos para filtrado en tiempo real
    searchInput.addEventListener('input', () => {
      fetchCharacters(searchInput.value.trim(), statusFilter.value);
    });

    statusFilter.addEventListener('change', () => {
      fetchCharacters(searchInput.value.trim(), statusFilter.value);
    });

    // Carga inicial al abrir la página
    fetchCharacters();