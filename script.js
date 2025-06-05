    // Fetch Irish stations
    fetch("https://fi1.api.radio-browser.info/json/stations/search?limit=1000&countrycode=IE&hidebroken=true")
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById("station-list");
        const irishStations = data.filter(s => s.countrycode === "IE" && s.language !== "arabic");

        // list items
        irishStations.forEach( (station, index) => {
          const div = document.createElement("div");
          // add class to div
          div.className = "station";
          // add index to div
          div.id = `station${index}`;
          // add data-url to div
          div.setAttribute("data-url", station.url_resolved);

          div.innerHTML = `

           <svg class="play-button" viewBox="0 0 200 200" alt="Play video" width="30" height="30">
              <circle cx="100" cy="100" r="90" fill="none" stroke-width="9" stroke="#000"/>
              <polygon points="70, 55 70, 145 145, 100" fill="#000"/>
            </svg>

            <svg class="stop-button" viewBox="0 0 200 200" width="30" height="30">
              <circle cx="100" cy="100" r="90" fill="none" stroke-width="9" stroke="#CC0000"/>
              <rect x="63" y="60" width="75" height="80" fill="#CC0000"/>
            </svg>

            <div class="sound-wave">
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>

            <div class="play-stop-button" style="background-image: url(${station.favicon ? station.favicon : 'images/radio-placeholder.png'})">
              &nbsp;
            </div>

            <span class="line"></span>

            <p>${station.name}</p>
            <p style="display:none">${station.lastchecktime}</p> 
            <a href="${station.homepage}" title="Go to ${station.homepage}" target="_blank">
              Visit website
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
              </svg>
            </a>
          `;
      
          list.appendChild(div);
          });
        })
      .catch(error => {
        console.error("Error loading stations:", error);
        document.getElementById("station-list").innerHTML = "<li>Failed to load stations</li>";
      });

  let currentSound = null;




// Function to play station
function playStation(url) {
  // Stop and unload previous sound
  if (currentSound) {
    currentSound.stop();
    currentSound.unload();
  }

  // Create new Howl instance
  currentSound = new Howl({
    src: [url],
    html5: true, // Needed for live streaming
    format: ['mp3', 'aac'] // Optional hint
  });

  currentSound.play();
}

// Event listener for play/stop
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("play-stop-button")) {
      const parent = event.target.parentElement;
      const isActive = parent.classList.toggle("active");

      // Remove "active" class from sibling elements
      const siblings = [...parent.parentElement.children].filter(el => el !== parent);
      siblings.forEach(sib => sib.classList.remove("active"));

      if (isActive) {
        const url = parent.getAttribute("data-url");
        if (url) {
          playStation(url);
        }
      } else {
        if (typeof currentSound !== "undefined") {
          currentSound.stop();
          currentSound.unload();
        }
      }
    }
  });
});

// search functionality
document.getElementById('search-box').addEventListener('input', function () {
  const searchBox = document.getElementById('search-box');
  const query = this.value.toLowerCase();
  const stations = document.querySelectorAll('.station');
  const suggestionsBox = document.getElementById('search-box-suggestions');
  suggestionsBox.innerHTML = '';

  // show or hide suggestions box based on search input
  if (searchBox.value.length > 0) {
    searchBox.classList.add('active');
    suggestionsBox.style.display = 'block';
  } else  {
    searchBox.classList.remove('active');
    suggestionsBox.style.display = 'none';
  }

  if (query.length === 0) {
    suggestionsBox.innerHTML = '';
    return;
  }

  stations.forEach(station => {
    const nameEl = station.querySelector('p');
    const stationName = nameEl ? nameEl.textContent.toLowerCase() : '';

    if (stationName.includes(query)) {
      const suggestion = document.createElement('div');
      suggestion.textContent = nameEl.textContent;
      suggestion.classList.add('suggestion');

      suggestion.onclick = () => {
        station.scrollIntoView({ behavior: 'smooth', block: 'start' });
        station.classList.add('station-searched-for');
        setTimeout(() => (station.classList.remove('station-searched-for')), 3000);
        resetSearch();
      } 
      suggestionsBox.appendChild(suggestion);
    }
  });

  // If no suggestions found, show "Sorry, no station found" message
  if (suggestionsBox.children.length === 0) {
    const noResults = document.createElement('div');
    noResults.textContent = 'Sorry, no station found';
    noResults.classList.add('no-search-results');
    suggestionsBox.appendChild(noResults);
  }
});

// click on .clear-search button to clear search input box and suggestions
document.querySelector('.clear-search').addEventListener('click', function () {
  resetSearch()
});

// click on .suggestion to clear search input box and suggestions
document.getElementById('search-box-suggestions').addEventListener('click', function (event) {
  if (event.target.classList.contains('suggestion')) {
    resetSearch();
  }
});

//clear search input box and suggestions
function resetSearch() {
  document.getElementById('search-box').value = '';
  document.getElementById('search-box-suggestions').innerHTML = '';
  document.getElementById('search-box-suggestions').style.display = 'none';
  document.getElementById('search-box').classList.remove('active');
};


// Back to top button functionality
const backToTopBtn = document.querySelector('.arrow-up');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
