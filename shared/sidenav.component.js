ko.components.register('sidenav', {
    viewModel: function(params) {
        // Data: value is either null, 'like', or 'dislike'
        this.navItem = ko.observable([
            {text:'Portfolio', url:'/index.html'},
            {text:'About Me', url:'/portfolio.html'},
            {text:'Say Hello', url:'/'}
        ]);
        // Behaviors
    },
    template:
        '<nav class="hidden-sm-down col-md-3 col-xl-2 sidebar row">\
            <div class="col-12 title">\
                Title\
            </div>\
            <div class="col-12 link-container">\
                <div data-bind="foreach: navItem"><a data-bind="href: url" data-bind="text: text"></a></div>\
                <a>Say Hello</a>\
            </div>\
        </nav>'
});

ko.applyBindings();