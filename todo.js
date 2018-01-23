var todos = [];

function newItem() {
  var inputValue = $("#entered-item").val(); // inputun valuesu al

  var todoJson = {
    done: false,
    text: inputValue
  };

  todos.push(todoJson);
  console.log(todos);

  $("#todo-list").append(
    '<li><input class=\'checkbox\' type="checkbox"><p class="todo-item">' +
      inputValue +
      '</p><i class="fa fa-times close-button" aria-hidden="true"></i></li>'
  );
  $("#entered-item").val("");

  // sunucuya todo itemi gonder
}

window.onload = function(e) {
  // var olan todo itemlari sunucudan al

  $("#entered-item").keypress(function(e) {
    if (e.which == 13) {
      newItem();
    }
  });

  // Todo item check/uncheck
  $("ul").on("click", ".checkbox", function() {
    var listItem = $(this).parent();
    if (this.checked) {
      for (i = 0; i < todos.length; i++) {
        if (todos[i].text == listItem.text()) {
          todos[i].done = true;
        }
      }
      //list itemin ustunu ciz
      listItem.addClass("checked");
      //list itemi asagiya tasi
      var detachedItem = listItem.detach();
      detachedItem.appendTo(".item-done");
    } else {
      for (i = 0; i < todos.length; i++) {
        if (todos[i].text == listItem.text()) {
          todos[i].done = false;
        }
      }
      //list itemin cizgisini kaldir
      listItem.removeClass("checked");
      //list itemi yukariya tasi
      var detachedItem = listItem.detach();
      detachedItem.appendTo("#todo-list");
    }
  });

  //Todo item delete
  //delete item when click the close button

  $("ul").on("click", ".close-button", function() {
    var listItem = $(this).parent();
    $(this)
      .parent()
      .remove();
    for (i = 0; i < todos.length; i++) {
      if (todos[i].text == listItem.text()) {
        todos.splice(i,1)
      }
    }
  });
};
