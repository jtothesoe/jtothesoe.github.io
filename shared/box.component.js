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
    '<a class="col-sm-12 col-md-6 col-lg-4 col-xl-3 box" data-bind="id:id, tag:tags, href:projectUrl">\
        <div class="content">\
            <div class="content-hover">\
                <h4 class="font2" data-bind="value:title"></h4>\
                <div class="box-line" style="padding-bottom:25px"></div>\
                <h5>\
                    <div class="padding-top:25px" data-bind="value:description">\
                    </div>\
                </h5>\
            </div>\
            <img data-bind="src: imgUrl" />\
        </div>\
    </a>'
});

ko.applyBindings();
