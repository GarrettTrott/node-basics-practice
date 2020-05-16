const https = require("https");

//prints message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} in javascript`;
  console.log(message);
}

function getProfile(username) {
  // connect to the api url(http://teamtreehouse.com.garretttrott.json)
  const request = https.get(
    `https://teamtreehouse.com/${username}.json`,
    (response) => {
      let body = "";
      // read the data
      response.on("data", (data) => {
        body += data.toString();
      });
      response.on("end", () => {
        // parse the data
        const profile = JSON.parse(body);
        // print the data
        printMessage(
          username,
          profile.badges.length,
          profile.points.JavaScript
        );
      });
    }
  );
}
const users = process.argv.slice(2);

users.forEach(getProfile);
