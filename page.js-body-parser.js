;(function() {

  // bind forms
  function pageBodyParser() {
    window.removeEventListener('click', bodyParser, false);
    window.removeEventListener('keypress', bodyParser, false);
    window.addEventListener('click', bodyParser, false);
    window.addEventListener('keypress', bodyParser, false);
  }

  // handle forms in a manner similar to body-parser
  function bodyParser(e) {
    var el = e.target,
        form = el,
        nodeName = el.nodeName,
        keycode = (e.keyCode ? e.keyCode : e.which),
        link,
        proto,
        path,
        orig,
        body = {},
        i,
        l,
        control;
    
    if (e.type === 'keypress') {
      if (keycode === 13) {
        if (nodeName !== 'INPUT') {
          return; // enter key only valid when a form is focused
        }
      }
      else {
        return; // ignore other keypresses
      }
    }
    else {
      if (nodeName !== 'INPUT' && nodeName !== 'BUTTON') {
        return; // something other than a submit button was clicked
      }
      else if (nodeName === 'INPUT' && el.type !== 'submit') {
        return; // input was clicked that is not a submit button
      }
    }
    
    // find parent form
    while (form && 'FORM' !== form.nodeName) {
      form = form.parentNode;
    }

    // no parent form
    if (!form) {
      return;
    }

    link = form.action;

    // strip protocol
    proto = link.split('://');
    if (proto) {
      if (proto[1]) {
        link = proto[1];
        form.pathname = link = proto[1].replace(location.host, '');
      }
    }

    // normalize hash / search
    if (!form.hash) {
      form.hash = '';
    }
    if (!form.search) {
      form.search = '';
    }

    // ensure non-hash for the same path
    if (form.pathname === location.pathname && (form.hash || '#' === link)) return;

    // x-origin
    if (!sameOrigin(form.action)) return;

    // rebuild path
    path = form.pathname + form.search + (form.hash || '');

    // same page
    orig = path + form.hash;

    // build req.body
    l = form.elements.length;
    for (i = 0; i < l; i++) {
      control = form.elements[i];
      if (control.type === 'checkbox') {
        if (control.name) {
          body[control.name] = control.checked;
        }
        else if (control.id) {
          body[control.id] = control.checked;
        }
      }
      else if (control.nodeName !== 'BUTTON' && control.type !== 'submit') {
        if (control.type !== 'radio' || control.checked) {
          if (control.name) {
            body[control.name] = control.value;
          }
          else if (control.id) {
            body[control.id] = control.value;
          }
        }
      }
    }
    if (el.name) {
      body[el.name] = el.value;
    }
    else if (el.id) {
      body[el.id] = el.value;
    }

    e.preventDefault();
    page.show(orig, {body: body});  
  }

  // overload page.js show method to add support for body parser
  page.show = function(path, state, dispatch){
    var ctx = new page.Context(path, state);
    if (state && state.body) ctx.body = state.body;
    if (false !== dispatch) page.dispatch(ctx);
    if (!ctx.unhandled) ctx.pushState();
    return ctx;
  };
  
  // needed because https://github.com/visionmedia/page.js/issues/125
  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 == href.indexOf(origin)));
  }

  // expose pageBodyParser
  if ('undefined' == typeof module) {
    window.pageBodyParser = pageBodyParser;
  }
  else {
    module.exports = pageBodyParser;
  }

})();