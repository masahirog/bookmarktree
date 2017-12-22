$(function(){

  $("#jstree_bookmarks").on("click","a",function(){
    $(".bookmarks_select_li").remove();
    var id = $(this).parent().attr("id");
    var title = $(this).text();

    $.ajax({
      url: "/bookmarks/get_jstree/" + id,
      data: { id : id },
      dataType: "json",
      async: false
    })
    .done(function(data){
      if (data.bookmark=="") {
        $(".right-title").text(title);
        $(".bookmarks_select_ul").append("<a href=# class='li_0 bookmarks_select_li col-md-12 list-group-item' target='_blank' style='font-size:15px;'>")
        $(".li_0").append(title+"</a>");
      };
      $.each(data.bookmark, function(index,value){
        var name = this.name
        var url = this.url
        $(".right-title").text(title);
        if (name=="") {
          $(".bookmarks_select_ul").append("<a href="+url+" class='li_"+index+" bookmarks_select_li col-md-12 list-group-item' target='_blank' style='font-size:15px;'>")
          $(".li_"+index).append(url+"</a>")
        }else{
          $(".bookmarks_select_ul").append("<a href="+url+" class='li_"+index+" bookmarks_select_li col-md-12 list-group-item' target='_blank' style='font-size:15px;'>")
          $(".li_"+index).append(name+"</a>")
        };
      });
    });
  });

  $(".input_url").on("keyup",function(){
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
    })
    });

    $(".btn-all-open").on("click",function(){
      var lilen = $(".bookmarks_select_li").length
      if (lilen > 10) {
        if(!confirm(lilen+"個のタブひらきまっせ？")){
            return false;
          }else{
          };
      };
      $(".bookmarks_select_li").each(function(){
        var site = $(this).attr("href")
        window.open(site)
      });
    });

});
