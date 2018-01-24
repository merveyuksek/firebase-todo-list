var todos = [];

function sendToFirebase() {
  var todosJson = JSON.stringify(todos);
  $.ajax({
    method: "PUT",
    url: "https://merveyuksekcom-24d2d.firebaseio.com/todos.json",
    data: todosJson
  }).done(function(msg) {
    console.log("checked item saved" + msg);
  });
}

function addListItem(selector, isChecked, value) {
  $(selector).append(
    "<li><input class='checkbox' type=\"checkbox\"" +
      isChecked +
      '><p class="todo-item">' +
      value +
      '</p><i class="fa fa-times close-button" aria-hidden="true"></i></li>'
  );
}

function newItem() {
  var inputValue = $("#entered-item").val(); // inputun valuesu al

  var todoJson = {
    done: false,
    text: inputValue
  };
  todos.push(todoJson);
  sendToFirebase();

  addListItem("#todo-list", "", inputValue);
  $("#entered-item").val("");
}

window.onload = function(e) {
  // var olan todo itemlari sunucudan al
  $.ajax({
    method: "GET",
    url: "https://merveyuksekcom-24d2d.firebaseio.com/todos.json"
  }).done(function(msg) {
    for (i = 0; i < msg.length; i++) {
      todos.push(msg[i]);
      if (msg[i].done == false) {
        addListItem("#todo-list", "", msg[i].text);
      } else {
        addListItem(".item-done", "checked", msg[i].text);
      }
    }
  });

  $("#entered-item").keypress(function(e) {
    if (e.which == 13) {
      newItem();
    }
  });

  // Todo item check/uncheck
  $("ul").on("click", ".checkbox", function() {
    var listItem = $(this).parent();

    function setChecked(isChecked) {
      for (i = 0; i < todos.length; i++) {
        if (todos[i].text == listItem.text()) {
          todos[i].done = isChecked;
        }
      }
    }

    if (this.checked) {
      setChecked(true);
      //list itemin ustunu ciz
      listItem.addClass("checked");
      //list itemi asagiya tasi
      var detachedItem = listItem.detach();
      detachedItem.appendTo(".item-done");
    } else {
      setChecked(false);
      //list itemin cizgisini kaldir
      listItem.removeClass("checked");
      //list itemi yukariya tasi
      var detachedItem = listItem.detach();
      detachedItem.appendTo("#todo-list");
    }

    sendToFirebase();
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
        todos.splice(i, 1);
      }
    }
    sendToFirebase();
  });
};
