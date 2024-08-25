const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
   let browser;
   try {
       browser = await puppeteer.launch({ headless: false });
       const page = await browser.newPage();
       console.log('Browser launched, navigating to the page...');


       const url = 'https://www.iplt20.com/stats/2023/most-runs';
       await page.goto(url, { waitUntil: 'networkidle2' });


       await page.waitForSelector('.st-team-wrp');
       console.log('Page loaded, starting data extraction...');


       const data = await page.evaluate(() => {
           try {
               const rows = Array.from(document.querySelectorAll('tr[ng-repeat]'));
               console.log(`Found ${rows.length} rows in the table.`);


               return rows.map((row) => {
                   const playerNameElement = row.querySelector('.st-ply-name');
                   const teamNameElement = row.querySelector('.st-ply-tm-name');
                   const playerImageElement = row.querySelector('.pbi img');
                   const runsElement = row.querySelector('.np-tableruns');
                   const foursElement = row.querySelector('.np-tabl4s'); // Update selectors if needed
                   const sixesElement = row.querySelector('.np-tabl6s'); // Update selectors if needed


                   const playerName = playerNameElement?.innerText.trim() || 'Unknown Player';
                   const teamName = teamNameElement?.innerText.trim() || 'Unknown Team';
                   const playerImageURL = playerImageElement?.src || '';
                   const runs = parseInt(runsElement?.innerText.trim() || '0');
                   const fours = parseInt(foursElement?.innerText.trim() || '0');
                   const sixes = parseInt(sixesElement?.innerText.trim() || '0');


                   return {
                       playerName,
                       teamName,
                       playerImageURL,
                       runs,
                       fours,
                       sixes
                   };
               });
           } catch (error) {
               console.error('Error during data extraction:', error);
               return [];
           }
       });


       console.log('Data extraction completed:', data);


       fs.writeFileSync('most_runs.json', JSON.stringify(data, null, 2));
       console.log('Data saved to most_runs.json');


   } catch (error) {
       console.error('Error in the main block:', error);
   } finally {
       if (browser) {
           await browser.close();
           console.log('Browser closed');
       }
   }
})();




