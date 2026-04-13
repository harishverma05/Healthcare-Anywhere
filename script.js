let map;

// MAP
window.initMap = function () {
  const loc = { lat: 26.8467, lng: 80.9462 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: loc
  });

  new google.maps.Marker({
    position: loc,
    map: map
  });
};

// LOCATION
function useMyLocation() {
  navigator.geolocation.getCurrentPosition(function(pos) {
    const userLoc = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    };

    map.setCenter(userLoc);

    new google.maps.Marker({
      position: userLoc,
      map: map
    });

    alert("✅ Your location updated on map");
  });
}

// LANGUAGE
function toggleLanguage() {
  const title = document.querySelector("h1");

  if (title.innerText === "HealthBridge") {
    title.innerText = "हेल्थब्रिज";
    alert("🌐 Language changed to Hindi");
  } else {
    title.innerText = "HealthBridge";
    alert("🌐 Language changed to English");
  }
}

// SMS
function sendLocationSMS() {
  const phone = document.getElementById("phone").value;

  if (!phone) {
    alert("⚠ Enter phone number!");
    return;
  }

  navigator.geolocation.getCurrentPosition(function(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    const message = `Emergency! https://maps.google.com/?q=${lat},${lng}`;

    alert("🚨 SOS Sent!\n" + message);
  });
}

// CHAT
function sendMessage() {
  const input = document.getElementById("chatInput");
  const chatBox = document.getElementById("chatBox");

  const msg = input.value;
  if (!msg) return;

  chatBox.innerHTML += `<p><b>You:</b> ${msg}</p>`;

  let reply = "I am your AI assistant 😊";

  if (msg.toLowerCase().includes("fever")) {
    reply = "Take rest and drink fluids.";
  } else if (msg.toLowerCase().includes("pain")) {
    reply = "Consult a doctor.";
  } 
  // NEW CONDITIONS ADDED 👇
  else if (msg.toLowerCase().includes("cold")) {
    reply = "Drink warm fluids and take rest.";
  } else if (msg.toLowerCase().includes("headache")) {
    reply = "Take proper rest and stay hydrated.";
  } else if (msg.toLowerCase().includes("hello") || msg.toLowerCase().includes("hi")) {
    reply = "Hello! How can I help you today?";
  } else if (msg.toLowerCase().includes("thank")) {
    reply = "You're welcome! Stay healthy 😊";
  }

  chatBox.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;

  input.value = "";
}

// Find Doctor
const doctors = [
  { name: "Dr. Amit Sharma", specialty: "Cardiologist", location: "Lucknow", phone: "9876543210" },
  { name: "Dr. Neha Verma", specialty: "Dermatologist", location: "Delhi", phone: "9123456780" },
  { name: "Dr. Raj Patel", specialty: "Orthopedic", location: "Mumbai", phone: "9988776655" },
  { name: "Dr. Anjali Singh", specialty: "Gynecologist", location: "Lucknow", phone: "9012345678" },
  { name: "Dr. Rahul Khan", specialty: "Neurologist", location: "Bangalore", phone: "9090909090" }
];

const searchBox = document.getElementById("searchDoctor");
const dropdown = document.getElementById("dropdown");

// Show list
function showDoctors(list) {
  dropdown.innerHTML = "";
  dropdown.style.display = "block";

  list.forEach(doc => {
    const div = document.createElement("div");
    div.className = "dropdown-item";

    div.innerHTML = `
      <h4>${doc.name}</h4>
      <p>${doc.specialty} | ${doc.location}</p>
      <button class="call-btn" onclick="callDoctor('${doc.phone}')">Call</button>
    `;

    dropdown.appendChild(div);
  });

  if (list.length === 0) {
    dropdown.innerHTML = "<p style='padding:10px'>No doctors found</p>";
  }
}

// Search
searchBox.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = doctors.filter(doc =>
    doc.name.toLowerCase().includes(value) ||
    doc.specialty.toLowerCase().includes(value)
  );

  showDoctors(filtered);
});

// Hide dropdown when clicked outside
document.addEventListener("click", function(e) {
  if (!document.querySelector(".search-container").contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// Call
function callDoctor(phone) {
  alert("Calling " + phone);
}