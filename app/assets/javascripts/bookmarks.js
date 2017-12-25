$(function(){
  $('.input_url').focus();
  window.onfocus = function(){
  $('.input_url').focus();
  }

  $(".directory_create").on("click",function(){
    $(".directory_create_area").show();
  });
$(".directory_create_hidden").on("click",function(){
  $(".directory_create_area").hide();
})

  $(".bookmarks_select_li").hover(function() {
    $(this).children(".dd-image").show();
    $(this).children(".dd-image").css("cursor","move");
  }, function() {
    $(this).children(".dd-image").hide();
  });
  $(".bookmarks_select_li").on("click",function() {
    $(this).children(".link-div")
  });

  $(".ul-sortable").sortable(
    {cancel : '.stop',
    connectWith: ".bookmarks_ul",
    opacity: 0.7,
    stop: function(event, ui){
      var bookmark_id = ui.item.attr('id')
      //移動後▼
      var directory_id = ui.item.parent().parent().find(".directory_id").text();
      $.ajax({
        url: "bookmarks/update_directory/"+bookmark_id,
        type: "GET",
        data: {directory_id: directory_id},
        dataType: "html"
      });
    }
  }
  );


  $(".input_url").on("change",function(){
    var url = $(".input_url").val();
    var id = 1
    $.ajax({
      url: "/bookmarks/get_title/"+id,
      type:"POST",
      data: {url:url},
      dataType: "json",
      async: false
    }).done(function(data){
      var title = data.bookmark.title;
      $(".input_title").val(title);
    });
  });

    $(".all-open").on("click",function(){
      var this_ul = $(this).parent().parent().find(".bookmarks_select_li")
      var lilen = this_ul.length
      if (lilen > 9) {
        if(!confirm(lilen+"個のタブひらきまっせ？")){
            return false;
          }else{
          };
      };
      this_ul.each(function(){
        var site = $(this).attr("href")
        window.open(site)
      });
    });
    $(".directory_name").on("click",function(){
      var bmul = $(this).parent().parent().children(".bookmarks_ul")
      if (bmul.is(':visible')) {
        bmul.hide();
        $(this).siblings(".glyphicon-folder-open").hide();
        $(this).siblings(".glyphicon-folder-close").show();
        $(this).siblings(".all-open").hide();
      } else {
        bmul.show();
        $(this).siblings(".glyphicon-folder-open").show();
        $(this).siblings(".glyphicon-folder-close").hide();
        $(this).siblings(".all-open").show();
      }
    });

});
