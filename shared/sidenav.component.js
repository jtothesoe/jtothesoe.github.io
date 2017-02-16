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
                <div class="flex-container" style="width:100%; flex-direction:row" data-bind="foreach: navItem"><div><a style="color:3498db" data-bind="attr:{href: url}, text: text"></a></div></div>\
            </div>\
            <div class="col-12 link-container" style="flex-direction:column-reverse !important">\
                <div class="social-profile">\
                    <ul>\
                        <li><a href="https://www.linkedin.com/in/jessicasoe/"><i class="fa fa-linkedin"></i></a></li>\
                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>\
                        <li><a href="https://www.instagram.com/eossoe/"><i class="fa fa-instagram"></i></a></li>\
                        <li><a href="#"><i class="fa fa-dribbble"></i></a></li>\
                    </ul>\
                </div>\
                <div style="width:100%">\  <a>2017 ©  Jessica Soe </a> </div>\
            </div>\
        </nav>'
});

ko.components.register('box', {
    viewModel: function (params) {
        this.id = params.id;
        this.tags = params.tags;
        this.title = params.title;
        this.description = params.description;
        this.imgUrl = params.imgUrl;
        this.projectUrl = params.projectUrl;
    },
    template:
    '<a class="col-sm-12 col-md-6 col-lg-4 col-xl-3 box" data-bind="attr:{id:id, tag:tags, href:projectUrl}">\
        <div class="content">\
            <div class="content-hover">\
                <h4 class="font2" data-bind="text:title"></h4>\
                <div class="box-line" style="padding-bottom:25px"></div>\
                <h5>\
                    <div class="padding-top:25px" data-bind="text:description">\
                    </div>\
                </h5>\
            </div>\
            <img data-bind="src: imgUrl" />\
        </div>\
    </a>'
});

ko.applyBindings();
