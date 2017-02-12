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
<img src="http://i.imgur.com/P5PGQOj.png?4" alt="logo" style="width:50px;height:102px;" align="middle">\
</div>\
            <div class="col-12 link-container">\
             
                <a>All © Reserved Jessica Soe</a>\  
                            </div>\
            <div class="social-profile">\
                <ul>\
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>\
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>\
                    <li><a href="#"><i class="fa fa-instagram"></i></a></li>\
                    <li><a href="#"><i class="fa fa-dribbble"></i></a></li>\
                </ul>\
            </div>\
              </div>\
        </nav>'
});

ko.applyBindings();
