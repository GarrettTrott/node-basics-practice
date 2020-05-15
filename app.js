const https = require("https");
const username = "garretttrott";

//prints message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} in javascript`;
  console.log(message);
}

// connect to the api url(http://teamtreehouse.com.garretttrott.json)

const request = https.get(
  `https://teamtreehouse.com/${username}.json`,
  (response) => {
    let body = "";
    response.on("data", (data) => {
      body += data.toString();
    });
    response.on("end", () => {
      const profile = JSON.parse(body);
      printMessage(username, profile.badges.length, profile.points.JavaScript);
    });
    // read the data
    // parse the data
    // print the data
  }
);
