const dns = require("dns");
const axios = require("axios");
const readline = require("readline");

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

    const requestUrl = `https://api.ip2location.io/?key=73A9393FD4D898C0D755C6302C8CD9E1&ip=${ipAddress}`;
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
