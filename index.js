const rp = require('request-promise-native');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function bday(name) {
    let options = {
        method: 'GET',
        uri: "http://google.com/search?q=" + "What is " + name + "'s birthday?",
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36' }
    };

    return new Promise((resolve, reject) => {
        rp(options).then(html => {
            let { document } = (new JSDOM(html)).window;
            let proper_name = document.querySelector('.GzssTd > span');
            let birthday = document.querySelector('.Z0LcW');
            if (!proper_name || !birthday) return resolve({});
            let date = objectify(birthday.textContent);
            resolve({ name: proper_name.textContent, birthday: birthday.textContent, date: date });
        }).catch(err => reject(err));
    });
};

function objectify(string) {
    let arr = string.replace(/[\W_]+/g," ").split(" ");

    let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    let year = arr[2];
    let month = (months.indexOf(arr[0]) + 1).toString();
    let day = arr[1];

    if (month.length == 1) month = "0" + month;
    if (day.length == 1) day = "0" + day;

    return new Date(year + "-" + month + "-" + day);
};

module.exports = bday;