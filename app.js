// Train data will later be replaced with a real API.


const data = {

  // TRAIN DATA (TEMPORARY - WILL BE REPLACED WITH API)
  trains: {
    title: "Trains timetable",
    desc: "This is just an example, more data needed from API.",

    // Information tags shown at the top of the section
    tags: [
      { label: "From", value: "Wolverhampton" },
      { label: "To", value: "City Centre" },
      { label: "Peak", value: "07:30–09:30" }
    ],

    // Example train departures
    items: [
      { name: "08:05 → City Centre", sub: "Platform 2 • GET DATA FROM API", badge: "On time" },
      { name: "08:22 → City Centre", sub: "Platform 1 • GET DATA FROM API", badge: "Boarding" },
      { name: "08:40 → City Centre", sub: "Platform 3 • GET DATA FROM API", badge: "5 min late" },
      { name: "09:05 → City Centre", sub: "Platform 2 • GET DATA FROM API", badge: "On time" }
    ]
  },


  
  // GYM OPENING TIMES
  

  gym: {
    title: "Gym opening times",
    desc: "Hours shown are typical for term-time.",

    tags: [
      { label: "Location", value: "Sports Centre" },
      { label: "Opening time", value: "30 mins before close" },
      { label: "Busy time", value: "16:00–19:00" }
    ],

    items: [
      { name: "Monday–Friday", sub: "06:30 – 22:00", badge: "Open" },
      { name: "Saturday", sub: "08:00 – 20:00", badge: "Open" },
      { name: "Sunday", sub: "09:00 – 18:00", badge: "Open" },
      { name: "Bank holidays", sub: "Reduced hours (check posters)", badge: "Varies" }
    ]
  },


  
  // LIBRARY OPENING TIMES
 

  library: {
    title: "Library opening times",
    desc: "Example, Description will go here",

    tags: [
      { label: "Location", value: "1–3" },
      { label: "Support desk", value: "10:00–16:00" },
      { label: "Tip", value: "Book group rooms early" }
    ],

    items: [
      { name: "Monday–Thursday", sub: "08:00 – 00:00", badge: "Open late" },
      { name: "Friday", sub: "08:00 – 21:00", badge: "Open" },
      { name: "Saturday", sub: "10:00 – 18:00", badge: "Weekend" },
      { name: "Sunday", sub: "12:00 – 20:00", badge: "Weekend" }
    ]
  },


  
  // STUDENT EVENTS
  

  events: {
    title: "Student events",
    desc: "Example, Real list will go below",

    tags: [
      { label: "This week", value: "4 events" },
      { label: "Type", value: "Social + Academic" },
      { label: "Book", value: "Union website" }
    ],

    items: [
      { name: "Freshers Quiz Night", sub: "Wed 19:00 • Students’ Union", badge: "Social" },
      { name: "CV & LinkedIn Workshop", sub: "Thu 15:00 • Careers Hub", badge: "Career" },
      { name: "Badminton Social", sub: "Fri 18:30 • Sports Hall", badge: "Sport" },
      { name: "Coding Society Meetup", sub: "Sat 14:00 • Lab B2", badge: "Tech" }
    ]
  }
};



// DOM ELEMENT REFERENCES
// These connect JavaScript to the HTML elements


const viewEl = document.getElementById("view"); // Main content container
const buttons = Array.from(document.querySelectorAll(".cardBtn")); // Sidebar buttons
const activeBadge = document.getElementById("activeBadge"); // Badge showing active section



// RENDER FUNCTION
// Dynamically displays the selected section content


function render(viewKey){

  // Get the selected section from the data object
  const section = data[viewKey];

  // Update the active section badge
  activeBadge.textContent = section.title;

  // Generate HTML for the tag labels
  const tagsHtml = section.tags.map(t =>
    `<span class="tag"><b>${t.label}:</b> ${t.value}</span>`
  ).join("");

  // Generate HTML for each list item
  const listHtml = section.items.map(it =>
    `<div class="item">
      <div class="left">
        <p class="name">${it.name}</p>
        <p class="sub">${it.sub}</p>
      </div>
      <span class="badge">${it.badge}</span>
    </div>`
  ).join("");

  // Insert generated HTML into the page
  viewEl.innerHTML = `
    <div class="hero">
      <h3>${section.title}</h3>
      <p>${section.desc}</p>
      <div class="row">${tagsHtml}</div>
    </div>

    <div class="list" role="list">
      ${listHtml}
    </div>
  `;
}



// BUTTON CLICK EVENTS
// Handles switching between sections


buttons.forEach(btn => {

  btn.addEventListener("click", () => {

    // Remove active class from all buttons
    buttons.forEach(b => b.classList.remove("active"));

    // Add active class to the clicked button
    btn.classList.add("active");

    // Render the selected view
    render(btn.dataset.view);

  });

});



// CLOCK FUNCTION
// Displays the current time in the header


const clockText = document.getElementById("clockText");

function updateClock(){

  const now = new Date();

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  clockText.textContent = `${hh}:${mm}`;
}

// Run clock immediately
updateClock();

// Update every 10 seconds
setInterval(updateClock, 1000 * 10);



// INITIAL PAGE LOAD
// Shows train timetable first when app opens


render("trains");