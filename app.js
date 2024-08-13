const dns = require("dns");
const axios = require("axios");
const readline = require("readline");
const api = require("./api");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter a domain name: ", (hostname) => {
  dns.lookup(hostname, (err, ipAddress) => {
    if (err) {
      console.error("Error:", err);
      rl.close();
      return;
    }

    const requestUrl = `${api}=${ipAddress}`;
    axios
      .get(requestUrl)
      .then((response) => {
        const geolocation = response.data;

        for (let [key, value] of Object.entries(geolocation)) {
          console.log(`${key} : ${value}`);
        }

        rl.close();
      })
      .catch((error) => {
        console.error("Error fetching geolocation data:", error.message);
        rl.close();
      });
  });
});
