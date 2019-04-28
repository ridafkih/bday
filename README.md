# bday

You need the birthday's of your favourite celebrities, or other people of interest. Thanks to Google, those are readily available when you search them. This package simply scrapes the Google page, allowing you to get the info you need very easily, and quickly. 

Since Google is used, automatic name correction is standard. 

#### Usage

```js
    const bday = require('bday');
    bday("William Shakespeare").then(info => {
        console.log(info);
    });
```
The above code will return the following JSON, stored as the `info` variable. 

```js
    { 
        name: 'William Shakespeare',
        birthday: 'April 26, 1564',
        date: 1564-04-26T00:00:00.000Z
    }
```