// require https module
const https = require("https");

//require http module
const http = require("http");

function printError(error) {
  console.error(error.message);
}

//prints message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} in javascript`;
  console.log(message);
}

function get(username) {
  try {
    // connect to the api url(http://teamtreehouse.com.garretttrott.json)
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      (response) => {
        if (response.statusCode === 200) {
          let body = "";
          // read the data
          response.on("data", (data) => {
            body += data.toString();
          });
          response.on("end", () => {
            try {
              // parse the data
              const profile = JSON.parse(body);
              // print the data
              printMessage(
                username,
                profile.badges.length,
                profile.points.JavaScript
              );
            } catch (error) {
              printError(error);
            }
          });
        } else {
          const message = `There was a problem getting the profile for ${username} (${
            http.STATUS_CODES[response.statusCode]
          })`;
          const statusCodeError = new Error(message);
          printError(statusCodeError);
        }
      }
    );
    request.on("error", (error) =>
      console.error(`Problem with request: ${error.message}`)
    );
  } catch (error) {
    printError(error);
  }
}

module.exports.get = get;
