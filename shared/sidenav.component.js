ko.components.register('sidenav', {
    viewModel: function (params) {
        // Data: value is either null, 'like', or 'dislike'
        this.navItem = ko.observable([
            { text: 'home', url: '/index.html' },
            { text: 'about', url: '/portfolio.html' },
            { text: 'contact', url: '/' }
        ]);
        // Behaviors
    },
    template:
    '<nav class="hidden-sm-down col-md-3 col-xl-2 sidebar row">\
            <div class="col-12 title">\
                <img src="http://i.imgur.com/P5PGQOj.png?4" alt="logo" style="width:50px;height:102px;" align="middle" hspace"5">\
            </div>\
            <div class="col-12 link-container">\
                <div class="flex-container" style="width:100%; flex-direction:row" data-bind="foreach: navItem"><div><a style="color:#3498db" data-bind="attr:{href: url}, text: text"></a></div></div>\
            </div>\
            <div class="col-12 link-container">\
                <div class="social-profile">\
                    <ul>\
                        <li><a href="https://www.linkedin.com/in/jessicasoe/"><i class="fa fa-linkedin"></i></a></li>\
                        <li><a href="#"><i class="fa fa-dribbble"></i></a></li>\
                        <li><a href="https://www.instagram.com/eossoe/"><i class="fa fa-instagram"></i></a></li>\
                        <li><a href="mailto:jsoe@design.upenn.edu"><i class="fa fa-envelope-o"></i></a></li>\
                    </ul>\
                </div>\
                <div style="width:100%">\  <a>2017 ©  Jessica Soe </a> </div>\
            </div>\
        </nav>'
});

ko.applyBindings();
