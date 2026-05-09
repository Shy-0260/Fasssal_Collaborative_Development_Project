document.addEventListener("DOMContentLoaded", () => {
  const view = document.getElementById("view");
  const buttons = document.querySelectorAll(".cardBtn");
  const activeBadge = document.getElementById("activeBadge");
  const clockText = document.getElementById("clockText");

  function updateClock() {
    const now = new Date();

    clockText.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  setInterval(updateClock, 1000);
  updateClock();

  function showError(message) {
    view.innerHTML = `
      <div class="infoCard">
        <h4>Something went wrong</h4>
        <p>${message}</p>
      </div>
    `;
  }

  async function loadTrains() {
    try {
      const response = await fetch("/api/trains");
      const trains = await response.json();

      view.innerHTML = `
        <h3 class="sectionTitle">Wolverhampton Train Timetable</h3>

        ${trains.map(train => `
          <div class="infoCard">
            <div class="cardHeader">
              <h4>${train.departure_time} → ${train.destination}</h4>
              <span class="platformBadge">Platform ${train.platform}</span>
            </div>

            <div class="cardGrid">
              <div class="miniCard">
                <span class="label">Operator</span>
                <span>${train.operator}</span>
              </div>

              <div class="miniCard">
                <span class="label">Running</span>
                <span>${train.days_running}</span>
              </div>
            </div>

            ${train.notes ? `<div class="notes">${train.notes}</div>` : ""}
          </div>
        `).join("")}
      `;
    } catch (error) {
      showError("Could not load train timetable. Make sure server.js is running.");
    }
  }

  async function loadFacility(name) {
    try {
      const response = await fetch(`/api/facilities/${name}`);
      const data = await response.json();

      view.innerHTML = `
        <h3 class="sectionTitle">${name} Opening Times</h3>

        ${data.map(item => `
          <div class="infoCard">
            <div class="cardHeader">
              <h4>${item.day_type}</h4>
            </div>

            <div class="cardGrid">
              <div class="miniCard">
                <span class="label">Open</span>
                <span>${item.open_time}</span>
              </div>

              <div class="miniCard">
                <span class="label">Close</span>
                <span>${item.close_time}</span>
              </div>
            </div>

            ${item.notes ? `<div class="notes">${item.notes}</div>` : ""}
          </div>
        `).join("")}
      `;
    } catch (error) {
      showError(`Could not load ${name} opening times.`);
    }
  }

  async function loadEvents() {
    try {
      const response = await fetch("/api/events");
      const events = await response.json();

      view.innerHTML = `
        <h3 class="sectionTitle">Student Events</h3>

        ${events.map(event => `
          <div class="infoCard">
            <div class="cardHeader">
              <h4>${event.title}</h4>
              <span class="eventType">${event.event_type}</span>
            </div>

            <div class="cardGrid">
              <div class="miniCard">
                <span class="label">Location</span>
                <span>${event.location}</span>
              </div>

              <div class="miniCard">
                <span class="label">Date</span>
                <span>${new Date(event.event_date).toLocaleString()}</span>
              </div>
            </div>

            <div class="notes">${event.description || ""}</div>
          </div>
        `).join("")}
      `;
    } catch (error) {
      showError("Could not load student events.");
    }
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const section = button.dataset.view;

      activeBadge.textContent = button.querySelector("strong").textContent;

      if (section === "trains") loadTrains();
      if (section === "gym") loadFacility("Gym");
      if (section === "library") loadFacility("Library");
      if (section === "events") loadEvents();
    });
  });

  activeBadge.textContent = "Trains timetable";
  loadTrains();
});