const rp = require('request-promise-native');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function bday(name, search_engine) {
    let options = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36'
        }
    };

    return new Promise((resolve, reject) => {
        if (!search_engine) search_engine = "google";
        if (search_engine.toLowerCase() == "google") options.uri = "http://google.com/search?q=";
        if (search_engine.toLowerCase() == "bing") options.uri = "http://bing.com/search?q=";
        if (!options.uri) reject("Invalid Search Engine");

        options.uri += `What is ${name}'s birthday?`;

        rp(options).then(html => {
            const { document } = (new JSDOM(html)).window;
            const n = document.querySelector('.b_focusLabel, .GzssTd > span');
            const b = document.querySelector('.b_focusTextLarge, .b_focusTextMedium, .Z0LcW');
            if (!n || !b) return reject("There was an issue getting that person's birthday.");

            const name = n.textContent.replace(" · Born", "");
            const birthday = b.textContent;
            resolve(prep({ name: name, birthday: birthday }));
        }).catch(err => reject(err));
    });
};

function prep(current) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const arr = current.birthday.replace(/[\W_]+/g, " ").split(" ");
    const month_index = months.findIndex(x => x.startsWith(arr[0]));

    const year = arr[2];
    let month = (month_index + 1).toString();
    let day = arr[1];

    if (month.length == 1) month = "0" + month;
    if (day.length == 1) day = "0" + day;

    const date_object = new Date(`${year}-${month}-${day}`);

    return {
        name: current.name,
        birthday: `${months[month_index]} ${day}, ${year}`,
        date: date_object
    };
};

module.exports = bday;