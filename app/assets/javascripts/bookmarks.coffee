# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
  $('#jstree_bookmarks').jstree({
    'core' : {
      'check_callback' : true,
      'data' : {
        'url' : (node) ->
          return 'bookmarks.json' # GET /bookmarks.json を実行する
      }
    },
    "plugins" : [ "dnd" ]
  })

  # カテゴリを移動させたときに呼ばれるイベント
  $('#jstree_bookmarks').on "move_node.jstree", (e, node) ->
    id            = node.node.id
    parent_id     = node.parent
    new_position  = node.position

    # PATCH /bookmarks/id.json
    $.ajax({
      'type'    : 'PATCH',
      'data'    : { 'bookmark' : { 'parent_id' : parent_id, 'new_position' : new_position } },
      'url'     : "/bookmarks/#{id}.json"
    })

  # 選択されているノードの子として新しいノードを作成する
  $('#create_bookmark').on 'click', ->
    jstree = $('#jstree_bookmarks').jstree(true)
    selected = jstree.get_selected()
    return false if (!selected.length)
    selected = selected[0]

    # POST /bookmarks.json
    $.ajax({
      'type'    : 'POST',
      'data'    : { 'bookmark' : { 'name' : 'New node', 'parent_id' : selected } },
      'url'     : '/bookmarks.json',
      'success' : (res) ->
        selected = jstree.create_node(selected, res)
        jstree.edit(selected) if (selected)
    })


  # 選択されているノードの名前を変更する
  $('#rename_bookmark').on 'click', ->
    jstree = $('#jstree_bookmarks').jstree(true)
    selected = jstree.get_selected()
    return false if (!selected.length)

    selected = selected[0]
    jstree.edit(selected);


  # ノードの名前の変更が確定されたときに呼ばれるイベント
  $('#jstree_bookmarks').on 'rename_node.jstree', (e, obj) ->
    id           = obj.node.id
    renamed_name = obj.text

    # PATCH /bookmarks/id.json
    $.ajax({
      'type'    : 'PATCH',
      'data'    : { 'bookmark' : { 'name' : renamed_name } },
      'url'     : "/bookmarks/#{id}.json"
    })


  # 選択されているノードを削除する
  $('#delete_bookmark').on 'click', ->
    jstree = $('#jstree_bookmarks').jstree(true)
    selected = jstree.get_selected()
    return false if (!selected.length)

    selected = selected[0]
    id = selected

    # DELETE /bookmarks/id.json
    $.ajax({
      'type'    : 'DELETE',
      'url'     : "/bookmarks/#{id}.json",
      'success' : ->
        jstree.delete_node(selected)
    })
