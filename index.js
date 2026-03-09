// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const form = document.querySelector("#weather-form");
const input = document.querySelector("#state-input");
const alertsContainer = document.querySelector("#alerts-display");
const errorMessage = document.querySelector("#error-message");

function clearUI() {
  alertsContainer.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
  errorMessage.classList.remove("error");
}

function showError(message) {
  alertsContainer.innerHTML = "";
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  errorMessage.classList.add("error");
}

function displayAlerts(data) {
  alertsContainer.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = `${data.title}: ${data.features.length}`;
  alertsContainer.appendChild(title);

  const list = document.createElement("ul");

  data.features.forEach((alert) => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    list.appendChild(li);
  });

  alertsContainer.appendChild(list);
}

function fetchWeatherAlerts(state) {
  clearUI();

  return Promise.resolve()
    .then(() => {
      if (!state) {
        throw new Error("Please enter a state abbreviation.");
      }

      if (!/^[A-Z]{2}$/.test(state)) {
        throw new Error("Please enter a valid two-letter state code.");
      }

      return fetch(`${weatherApi}${state}`);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather alerts.");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayAlerts(data);
      input.value = "";
      errorMessage.textContent = "";
      errorMessage.classList.add("hidden");
      errorMessage.classList.remove("error");
    })
    .catch((errorObject) => {
      console.log(errorObject.message);
      showError(errorObject.message);
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const state = input.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
});