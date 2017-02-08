ko.components.register('sidenav', {
    viewModel: function(params) {
        // Data: value is either null, 'like', or 'dislike'
        this.navItem = [
            {text:'Portfolio', url:'/index.html'},
            {text:'About Me', url:'/portfolio.html'},
            {text:'Say Hello', url:'/'}
        ]
        // Behaviors
    },
    template:
        '<nav class="hidden-sm-down col-md-3 col-xl-2 sidebar row">\
            <div class="col-12 title">\
                Title\
            </div>\
            <div class="col-12 link-container">\
                <a data-bind="foreach: navItem" data-bind="href: url" data-bind="text: text"></a>\
                <a>Say Hello</a>\
            </div>\
        </nav>'
});

ko.applyBindings();