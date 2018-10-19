const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


module.exports = {
  requestflights: function(req, res, next) {
    request('https://www.lyonaeroports.com/vols-et-destinations/les-vols-temps-reel#time=0&direction=departures&displayMode=tables', (error, response, html) => {
        if (!error && response.statusCode == 200) {
    
          fs.unlink('scrap/flights.json', (err) => {
            if (err) throw err;
           console.log('succesfully deleted flights.json');
          });
     
    
          const $ = cheerio.load(html);
    
          $('.rtf-container').each((i, el) => {
            const dest = $(el).find('.dest').children('meta').attr('content');
            // console.log(dest);
    
            const time = $(el).find('.time').text().replace(/\s/g, "");
            // console.log(time);
    
            const number = $(el).find('.number').text().replace(/\s/g, "");
            // console.log(number);
    
            const company = $(el).find('img').attr('alt');
            // console.log(company);
    
            const situation = $(el).find('.situation').children('span').text();
            // console.log(situation);
    
            let flight = {
              dest: dest,
              time: time,
              number: number,
              company: company,
              situation: situation
            };
    
              
            if (i == 0) {
              let data = '[' + JSON.stringify(flight) + ',';
              fs.writeFileSync('scrap/flights.json', data);
            } else if (i == $('.rtf-container').length - 1) {
              let data = JSON.stringify(flight) + ']';
              fs.appendFile('scrap/flights.json', data, 'utf8', (err) => {
                if (err) throw err;
              });
            } else {
              let data = JSON.stringify(flight) + ',';
              fs.appendFile('scrap/flights.json', data, 'utf8', (err) => {
                if (err) throw err;
              });
            }
    
          });
        }
    });
    console.log('Successfully create flights.json')
  }  
}


/**
 * fs.exists('flights.json', (exists) => {
        if (exists) {
          fs.unlink('flights.json', (err) => {
            if (err) throw err;
            console.log('succesfully deleted flights.json');
        })
      }
      });
 */
