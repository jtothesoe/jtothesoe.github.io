ko.components.register('sidenav', {
    viewModel: function(params) {
        // Data: value is either null, 'like', or 'dislike'
        // Behaviors
    },
    template:
        '<nav class="hidden-sm-down col-md-3 col-xl-2 sidebar row">\
            <div class="col-12 title">\
                Title\
            </div>\
            <div class="col-12 link-container">\
                <a href="index.html">Portfolio</a>\
                <a>Say Hello</a>\
            </div>\
        </nav>'
});