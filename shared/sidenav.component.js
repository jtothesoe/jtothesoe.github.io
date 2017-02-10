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
               <img id="myImage" src="pic_bulboff.gif" style="width:100px">
            </div>\
            <div class="col-12 link-container">\
                <div data-bind="foreach: navItem"><a data-bind="attr:{href: url}, text: text"></a></div>\
                <a>Say Hello</a>\
            </div>\
        </nav>'
});

ko.applyBindings();
