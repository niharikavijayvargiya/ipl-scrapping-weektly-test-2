const fs = require('fs');


// Load the scraped data
const rawData = fs.readFileSync('most_runs.json');
const data = JSON.parse(rawData);


// Example: Cleaning up data or formatting
const cleanedData = data.map(player => ({
   player: player.playerName,
   runs: parseInt(player.runs),
   team: player.teamName,
   playerImage: player.playerImageURL
}));


// Save cleaned data
fs.writeFileSync('cleaned_most_runs.json', JSON.stringify(cleanedData, null, 2));




