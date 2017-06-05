console.log('client.js');

$(document).ready(onReady);

function onReady(){

// event listeners
$('#createTaskButton').on('click', createTask);
$(document).on('click', '#completeTaskButton',completeTask);
$(document).on('click', '#deleteTaskButton', deleteTask);

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
} // end onReady function

// function to get tasks
function getTasks(){
  console.log('in getTasks function');
  $.ajax({
    url:'/getTasks',
    type: 'GET',
    success: function(response){
      $('#tasksContainer').empty();
      for (var i = 0; i < response.length; i++) {
        // show tasks on DOM
        $('#tasksContainer').append('<p>' + response[i].task + ' <button id="completeTaskButton">Complete</button> ' + ' <button id="deleteTaskButton">Delete</button> ' + '</p>');
        console.log('appending tasks to DOM');
      } // end for loop to append tasks and buttons to DOM
    } // end success function
  }); // end ajax for getTasks function
} // end getTasks function

// function to complete task
function completeTask(){
  console.log('in completeTask function');
  // task completed to send
  var completedTask = {
    id: $(this).data('id'),
  }; // end task completed to send
  $.ajax({
    url: '/completeTask',
    type: 'POST',
    data: completedTask,
    success: function(response){
      console.log('completed task');
      $('p').css('color', 'red');
      $('p').append('✔');
    } // end ajax success function
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
