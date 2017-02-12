$(document).ready(function() {
    setBoxHeight();
    setBackgroundTextHeight();
    w3IncludeHTML();
});

$(window).on('resize', function(){
    setBoxHeight();
    setBackgroundTextHeight();
});

function setBoxHeight(){
    $(".box").each(function(){
            $(this).height($(this).width());
        })
}

function setBackgroundTextHeight(){
    $("#background-text-spacer").height($("#background-text-area").height());
}

function filterBox(filter){
    console.log(filter);
    if(filter === undefined){
        $(".box").each(function(){
            $(this).css("display","block");
        })
    }
    else{
        $(".box").each(function(){
            if($(this).attr("tag").toLowerCase().indexOf(filter)>=0){
                $(this).css("display", "block");
            }
            else{
                $(this).css("display", "none");
            }
        })
    }
}
