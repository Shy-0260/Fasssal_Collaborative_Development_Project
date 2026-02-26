// EXAMPLE// REPLACE WITH REAL API 
const data = {
  trains: {
    title: "Trains timetable",
    desc: "This is just an example, more data needed from API.",
    tags: [
      { label: "From", value: "Wolverhampton" },
      { label: "To", value: "City Centre" },
      { label: "Peak", value: "07:30–09:30" }
    ],
    items: [
      { name: "08:05 → City Centre", sub: "Platform 2 • GET DATA FROM API", badge: "On time" },
      { name: "08:22 → City Centre", sub: "Platform 1 • GET DATA FROM API", badge: "Boarding" },
      { name: "08:40 → City Centre", sub: "Platform 3 • GET DATA FROM API", badge: "5 min late" },
      { name: "09:05 → City Centre", sub: "Platform 2 • GET DATA FROM API", badge: "On time" }
    ]
  },

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

const viewEl = document.getElementById("view");
const buttons = Array.from(document.querySelectorAll(".cardBtn"));
const activeBadge = document.getElementById("activeBadge");

function render(viewKey){
  const section = data[viewKey];
  activeBadge.textContent = section.title;

  const tagsHtml = section.tags.map(t =>
    `<span class="tag"><b>${t.label}:</b> ${t.value}</span>`
  ).join("");

  const listHtml = section.items.map(it =>
    `<div class="item">
      <div class="left">
        <p class="name">${it.name}</p>
        <p class="sub">${it.sub}</p>
      </div>
      <span class="badge">${it.badge}</span>
    </div>`
  ).join("");

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

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.view);
  });
});

// Clock pill
const clockText = document.getElementById("clockText");
function updateClock(){
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  clockText.textContent = `${hh}:${mm}`;
}
updateClock();
setInterval(updateClock, 1000 * 10);

// Initial view
render("trains");