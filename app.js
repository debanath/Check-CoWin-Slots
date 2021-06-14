/* 
! First attempt it runs but not neat
fetch(
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=782446&date=11-06-2021"
  )
    .then(res => res.json())
    .then(data => {
      let availablePlaces = [];
      for (let i = 0; i < data["sessions"].length; i++) {
        let res = data["sessions"][i];

        if (res["min_age_limit"] > 18 && res["available_capacity_dose1"] > 0) {
          availablePlaces.push(res);
        }
      }
      availablePlaces.length > 0
        ? console.log(availablePlaces)
        : console.log("Sorry no slots available");
    }); */
let pincode = "";
let date = "";
function startSearch() {
  pincode = document.getElementById("pincode").value;
  date = document.getElementById("date").value;

  //format DD-MM-YYYY
  let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`;
  checkAvailability();

  setInterval(checkAvailability, 30000);

  async function checkAvailability() {
    const res = await fetch(url);
    //console.log(url);
    let availablePlaces = [];
    const data = await res.json();
    for (let i = 0; i < data["sessions"].length; i++) {
      let res = data["sessions"][i];

      if (res["min_age_limit"] >= 18 && res["available_capacity_dose1"] > 0) {
        availablePlaces.push(res);
      }
    }
    availablePlaces.length > 0
      ? console.log(availablePlaces)
      : console.log("No slots available");
  }
}
