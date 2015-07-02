var app = require('ampersand-app');
var _ = require('lodash');
var $ = require('jquery');
var config = require('clientconfig');
var Router = require('./router');
var MainView = require('./views/main');
var Me = require('./models/me');
var Filters = require('./models/filter-collection');
var Widgets = require('./models/widget-collection');
var domReady = require('domready');
var dc = require('dc');

// attach our app to `window` so we can
// easily access it from the console.
window.app = app;

// Extends our main app singleton
app.extend({
    me: new Me(),
    filters: new Filters(),
    router: new Router(),
    widgets: new Widgets(),
    // This is where it all starts
    init: function() {
        // Create and attach our main view
        this.mainView = new MainView({
            model: this.me,
            el: document.body
        });

        // this kicks off our backbutton tracking (browser history)
        // and will cause the first matching handler in the router
        // to fire.
        this.router.history.start({ pushState: true });

        // Load the filters
        this.filters.fetch();
        this.filters.sort();
   
        // Load the actual data, and add it to the crossfilter when ready
        $.ajax({url: 'data/data.json',
            success: function(data) {
                window.app.crossfilter = dc.crossfilter(data);

                var preselect = ['GREEN', 'URBAN', 'UHI50P', 'UHI95P'];
                for (var i in preselect) {
                    var k = preselect[i];
                    var f = window.app.filters.get(k);

                    // FIXME: data keys are assumed to be lower case, but this is not checked/ensured
                    f._dx = window.app.crossfilter.dimension( function(d) {return d[k.toLowerCase()];} );
                    f.active = true;
                }
            },
        });

    },
    // This is a helper for navigating around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url pathname for example: "/costello/settings"
    navigate: function(page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {
            trigger: true
        });
    }
});

// run it on domReady
domReady(_.bind(app.init, app));