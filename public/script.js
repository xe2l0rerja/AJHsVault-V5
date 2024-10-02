let batteryLevel;

navigator.getBattery().then(function (battery) {
  function getTimeFromSeconds(seconds) {
    if (battery.charging && (seconds === Infinity || battery.level === 1)) {
      return "Fully Charged";
    } else if (seconds < 0) {
      return "Calculating...";
    } else {
      let date = new Date(1970, 0, 1);
      date.setSeconds(seconds);
      return date.toTimeString().substring(0, 5);
    }
  }

  function updateBatteryStatus() {
    let now = new Date();
    let hours = now.getHours();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let currentTime = `${hours}:${minutes} ${ampm}`;

    batteryLevel = Math.round(battery.level * 100);

    let timeString;
    if (battery.charging) {
      timeString = getTimeFromSeconds(battery.chargingTime);
    } else {
      timeString = getTimeFromSeconds(battery.dischargingTime) + " Until Dead";
    }

    let batteryStatus = `Battery: ${batteryLevel}% ${timeString}`;

    document.getElementById("device-time").innerHTML = currentTime;
    document.getElementById("battery-status").innerHTML = batteryStatus;

    setTimeout(updateBatteryStatus, 1000);
  }

  updateBatteryStatus();

  battery.addEventListener("chargingchange", updateBatteryStatus);
  battery.addEventListener("chargingtimechange", updateBatteryStatus);
  battery.addEventListener("dischargingtimechange", updateBatteryStatus);
  battery.addEventListener("levelchange", updateBatteryStatus);
});