console.log('client.js');

$(document).ready(onReady);

function onReady(){
getTasks();

// event listeners
$('#createTaskButton').on('click', createTask);
$(document).on('click', '#completeTaskButton',completeTask);
$(document).on('click', '#deleteTaskButton', deleteTask);
} // end onReady function

// function to run on click to create new task
function createTask(){
  console.log('create task');

  // create taskObject
  var taskObject = {
  task: $('#task').val(),
}; // end taskObject

  // ajax call to send taskObject
  $.ajax({
    url: '/createTask',
    type: 'POST',
    data: taskObject,
    success: function(data){
      console.log('create task ->', data);
      // empty Task field
      $('#task').val('');
      getTasks();
    } // end ajax success function
  }); // end ajax call for createTask function
} // end createTask function

// function to get tasks
function getTasks(){
  console.log('in getTasks function');
  $.ajax({
    url:'/getTasks',
    type: 'GET',
    success: function(response){
      $('#tasksContainer').empty();
      for (var i = 0; i < response.length; i++) {
        var $p = $('<p class = "task">');
        $p.data('id', response[i].id);
        $p.append(response[i].task);
        $p.append('<button id="deleteTaskButton">Delete</button>');

        if ( response[i].complete === true){
          $p.addClass('completed');
          $p.append('✔');
        } else {
          $p.append('<button id="completeTaskButton">Complete</button>');
        }
        $('#tasksContainer').append($p);
        console.log('appending tasks to DOM');
      } // end for loop to append tasks and buttons to DOM
    } // end success function
  }); // end ajax for getTasks function
} // end getTasks function

// function to complete task
function completeTask(){
  console.log('in completeTask function');
  var $button = $(this);
  var id = $button.parent().data('id');
  console.log(id);
  // task completed to send
  var completedTask = {
    id: $(this).parent().data('id'),
  }; // end task completed to send
  $.ajax({
    url: '/completeTask',
    type: 'PUT',
    data: completedTask,
    success: getTasks
  }); // end ajax call for completeTask function
} // end completeTask function

function deleteTask(){
  console.log('in deleteTask function');
  // task deleted to send
  var deletedTask = {
    id: $(this).data('id'),
  }; // end task deleted to send
  $.ajax({
    url: '/deleteTask',
    type: 'DELETE',
    data: deletedTask,
    success: function(response){
      $('p').empty();
    } // end ajax success function
  }); // end ajax call to delete task
} // end deleteTask function
