// ajax deletem, to delete the task 
const deleteTask = function (taskID) {
  $.ajax({
  type: 'DELETE',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + taskID + '?api_key=349',
  success: function (response, textStatus) {
    console.log(response);
    getAndAdd();
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
  });
}

// ajax PUT to mark task as completed
var completeTask = function (taskID) {
  $.ajax({
 type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + taskID + '/mark_complete?api_key=349',
    dataType: 'json',
    success: function (response, textStatus) {
      getAndAdd();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

// ajax PUT to mark task as active
var activateTask = function (taskID) {
  $.ajax({
 type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + taskID + '/mark_active?api_key=349',
    dataType: 'json',
    success: function (response, textStatus) {
      getAndAdd();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

// ajax GET, on success → create table row for each task
const getAndAdd = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=349',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#tasks').empty();
      response.tasks.forEach(function (task) {
        $('tbody:last').append(
          '<tr class="task-item" id="' + task.id + '">' +
            '<td><input id="donebox" type="checkbox" class="donebox mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></td>' +
            '<td class="task-content">' + task.content + '</td>' +
            '<td><button class="btn btn-light btn-sm delete" data-id="' + task.id + '">Delete</button></td>' +
          '</tr>');
        if (task.completed) {
          $('tbody tr:last').attr("class", "task-item table-success");
        }
      })
      const main = document.getElementById('tasks');
      sortChildren(main, (a, b) => + a.id - + b.id);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

// ajax POST, transmitting value from input 
const addTask = function() {
  var input = $('#task-input');
  if (input) {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=349',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: input.val(),
        }
      }),
      success: function (response, textStatus) {
      console.log(response);
      input.val('');
      getAndAdd();
      },
      error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
      }
    });
  }
}

// on page ready
$(document).ready(function() {
  getAndAdd();
})

// delete button
$(document).on('click', '.delete', function () {
  deleteTask($(this).data('id'))
});

// trigger on checkbox action
$(document).on('change', '.mark-complete', function () {
  if (this.checked) {
    completeTask($(this).data('id'));
  } else {
    activateTask($(this).data('id'));
  }
});

// add item button
$(document).on('submit', function (event) {
  event.preventDefault();
  addTask();
});

// show all button
$(document).on('click', '.show-all', function () {
  $('button').removeClass('active'); 
  $(this).addClass('active');
  $(".task-item").each(function (i, ele) {
    $(this).show(); 
  });
});

// show done button
$(document).on('click', '.show-done', function () {
  $('button').removeClass('active');
  $(this).addClass('active');
  $(".task-item").each(function (i, ele) {
    if ($(this).find('#donebox').prop("checked"))
    $(this).show();  
    else {
    $(this).hide();  
    }
  });
});  

// show active button
$(document).on('click', '.show-active', function () {
  $('button').removeClass('active');
  $(this).addClass('active');
  $(".task-item").each(function (i, ele) {
    if ($(this).find('#donebox').prop("checked"))
    $(this).hide();  
    else {
    $(this).show();  
    }
  });
});  

// sort elements by ID to ensure the oldest task is on top
function sortChildren(parent, comparator) {
  parent.replaceChildren(...Array.from(parent.children).sort(comparator));
}
