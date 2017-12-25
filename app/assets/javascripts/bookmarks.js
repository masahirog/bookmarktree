$(function(){
  // $('.input_url').focus();
  window.onfocus=function(){
  $('.input_url').focus();
  }

  $(".ul-sortable").sortable(
    {cancel : '.stop',
    connectWith: ".bookmarks_ul",
    opacity: 0.7,
    stop: function(event, ui){

      var bookmark_id = ui.item.attr('id')
      //移動後▼
      var directory_id = ui.item.parent().parent().find(".directory_id").text();
      console.log(directory_id)
      $.ajax({
        url: "bookmarks/update_directory/"+bookmark_id,
        type: "GET",
        data: {directory_id: directory_id},
        dataType: "html"
      });
    }
  }
  );
  function reset_row_order(){
    var thisitem = $(this).children().text();
    // $.ajax({
    //     url: "projects/change_session_year",
    //     type: "GET",
    //     data: {year : $(":selected").attr("value"),
    //             id: 1,
    //             mode: 'hoge',
    //             type: 'entry'
    //             },
    //     dataType: "html",
    //     success: function(data) {
    //         alert("success");
    //     },
    //     error: function(data) {
    //         alert("errror");
    //     }
    // });
  };


  // $("#jstree_bookmarks").on("click","a",function(){
  //   $(".bookmarks_select_li").remove();
  //   var id = $(this).parent().attr("id");
  //   var title = $(this).text();
  //
  //   $.ajax({
  //     url: "/bookmarks/get_jstree/" + id,
  //     data: { id : id },
  //     dataType: "json",
  //     async: false
  //   })
  //   .done(function(data){
  //     if (data.bookmark=="") {
  //       $(".right-title").text(title);
  //       $(".bookmarks_select_ul").append("<a href=# class='li_0 bookmarks_select_li col-md-12 list-group-item' target='_blank' style='font-size:15px;'>")
  //       $(".li_0").append(title+"</a>");
  //     };
  //     $.each(data.bookmark, function(index,value){
  //       var name = this.name
  //       var url = this.url
  //       $(".right-title").text(title);
  //       if (name=="") {
  //         $(".bookmarks_select_ul").append("<a href="+url+" class='li_"+index+" bookmarks_select_li col-md-12 list-group-item' target='_blank' style='font-size:15px;'>")
  //         $(".li_"+index).append(url+"</a>")
  //       }else{
  //         $(".bookmarks_select_ul").append("<a href="+url+" class='li_"+index+" bookmarks_select_li col-md-12 list-group-item' target='_blank' style='font-size:15px;'>")
  //         $(".li_"+index).append(name+"</a>")
  //       };
  //     });
  //   });
  // });

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
        console.log(site);
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
