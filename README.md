# bday

With Google and Bing, finding people's birthday is easy as long as they're
an individual of great interest, scientists, artists, authors, etc. 
are easy to find information about. This library scrapes those pages
in order to find their birthday for you. 

#### Usage

```js
const bday = require('bday');

bday("willy shakespeare").then(info => {
    console.log(`${info.name} was born on ${info.birthday}`);
    const long_ago = Math.floor((new Date() - info.date) / 1000 / 60 / 60 / 24);
    console.log(`That was about ${long_ago.toLocaleString()} days ago!`);
    
    /* OUTPUT:
        William Shakespeare's birthday is on April 26, 1564
        That was 166,188 days ago!
    */
});
```

##### Search Engine Selection

You have the option of scraping Bing, or Google. If you use Bing as your
primary search engine you should use Google, and vice versa. This is to 
prevent rate limitations. 

```js
bday("John Cena", "bing").then(info => {
    console.log(info);
}).catch(err => console.log(err));

/*  OUTPUT:
    { name: 'John Cena',
    birthday: 'April 23, 1977',
    date: 1977-04-23T00:00:00.000Z } */
```

```js
bday("John Cena", "google").then(info => {
    console.log(info);
}).catch(err => console.log(err));

/*  OUTPUT:
    { name: 'John Cena',
    birthday: 'April 23, 1977',
    date: 1977-04-23T00:00:00.000Z } */
```

If you do not provide a search engine, the script will automatically scrape
Google. 

```js
bday("John Cena").then(info => {
    console.log(info);
}).catch(err => console.log(err));

/*  OUTPUT:
    { name: 'John Cena',
    birthday: 'April 23, 1977',
    date: 1977-04-23T00:00:00.000Z } */
```

The script will automatically autocorrect just as Google, or Bing would.

```js
bday("John Cna").then(info => {
    console.log(info);
}).catch(err => console.log(err));

/*  OUTPUT:
    { name: 'John Cena',
    birthday: 'April 23, 1977',
    date: 1977-04-23T00:00:00.000Z } */
```

The script will reject the promise if the name provided is invalid, make 
sure to CATCH YOUR FUNCTIONS!

```js
bday("Billy Bob Joe").then(info => {
    console.log(info);
}).catch(err => console.log(err));

/*  OUTPUT:
    There was an issue getting that person's birthday. */
```

While providing no search engine will default to Google, providing an
invalid search engine will throw an error. 

```js
bday("Billy Bob Joe", "booble").then(info => {
    console.log(info);
}).catch(err => console.log(err)); 

/*  OUTPUT:
    Invalid Search Engine */
```