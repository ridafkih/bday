const bday = require('.');

bday("Kevin Hart").then(info => {
    console.log(`${info.name} was born on ${info.birthday}`);
    const long_ago = Math.floor((new Date() - info.date) / 1000 / 60 / 60 / 24);
    console.log(`That was about ${long_ago.toLocaleString()} days ago!`);
    
    /* OUTPUT:
        William Shakespeare's birthday is on April 26, 1564
        That was 166,188 days ago!
    */
});