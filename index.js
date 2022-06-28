const maps = document.querySelector("#map");
const form = document.querySelector(".form");
const place = document.querySelector(".place");
const dates = document.querySelector(".dates");
const btn = document.querySelector(".btn");

let Placetext = document.querySelector(".place").value;

let map, mapEvent;

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}z`);

    const coords = [latitude, longitude];

    map = L.map("map").setView(coords, 13);
    // console.log(map);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on("click", function (mapE) {
      mapEvent = mapE;
      form.classList.remove("hidden");
      place.focus();
    });

    L.marker(coords)
      .addTo(map)
      .bindPopup(
        L.popup({
          autoClose: false,
          closeOnClick: false,
          className: "yourname",
        })
      )
      .setPopupContent("Your Location")
      .openPopup();
  },
  function () {
    alert("could not get your location");
  }
);

btn.addEventListener("click", function () {
  popuptext = document.querySelector(".place").value;
  popupDate = document.querySelector(".dates").value;

  console.log(Placetext);
  dates.value = place.value = " ";
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidh: 100,
        autoClose: false,
        closeOnClick: false,
      })
    )
    .setPopupContent(`Travel: ${popuptext} <br> Date:${popupDate}`)
    .openPopup();
});
