page.js-body-parser.js [![Gittip](http://img.shields.io/gittip/kethinov.png)](https://www.gittip.com/kethinov/)
===

A plugin for [page.js](http://visionmedia.github.io/page.js/) which extends it to handle forms as well.

Form data is populated in the `req` object provided by page.js in a manner similar to how [body-parser](https://github.com/expressjs/body-parser) populates the `req` object provided by [Express](http://expressjs.com/).

Example usage
===

```js
page('/some_form_action', function(req) {

  // the form data is in the object req.body
  console.log(req.body);
});
```

Installation
===

Either download the file from here or use [bower](http://bower.io/):

```
bower install page.js-body-parser
```

Initialization
===

Load `page.js-body-parser.js` after loading `page.js`.

Then initialize it by calling: 

```js
pageBodyParser();
```

Sample app
===

Check out `sampleApp.html` for simple demonstration of how this works.

To run it, follow these steps:

Clone this repo:

```
git clone https://github.com/kethinov/page.js-body-parser.js.git
```

Install page.js:

```
cd page.js-body-parser.js
bower install page.js
```

Start a simple web server (example assumes you have python installed, but you could use any web server):

```
python -m SimpleHTTPServer
```

Then open [http://localhost:8000/sampleApp.html](http://localhost:8000/) in your browser.

License
===

All original code in this library is licensed under the [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0)</a>. Commercial and noncommercial use is permitted with attribution.