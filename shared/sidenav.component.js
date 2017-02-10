ko.components.register('sidenav', {
    viewModel: function(params) {
        // Data: value is either null, 'like', or 'dislike'
        this.navItem = ko.observable([
            {text:'home', url:'/index.html'}, 
            {text:'about', url:'/portfolio.html'}, 
            {text:'contact', url:'/'}
        ]);
        // Behaviors
    },
    template:
        '<nav class="hidden-sm-down col-md-3 col-xl-2 sidebar row">\
            <div class="col-12 title">\
                Title\
            </div>\
<img src="http://i.imgur.com/P5PGQOj.png?4" alt="logo" style="width:50px;height:102px;>\
            <div class="col-12 link-container">\
                <div data-bind="foreach: navItem"><a data-bind="attr:{href: url}, text: text"></a></div>\
                <a>Say Hello</a>\
            </div>\
        </nav>'
});

ko.applyBindings();
