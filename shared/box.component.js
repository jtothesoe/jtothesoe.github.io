
ko.components.register('box', {
    viewModel: function (id, tags, title, description, imgUrl, projectUrl) {
        this.id = id;
        this.tags = tags;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
        this.projectUrl = projectUrl;
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
