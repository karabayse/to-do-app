console.log('client.js');

$(document).ready(onReady);

function onReady(){

// event listeners
$('#createTaskButton').on('click', createTask);


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
  }); // end ajax call to create task
} // end createTask function

// ajax call to get tasks
function getTasks(){
  console.log('in getTasks function');
  $.ajax({
    url:'/getTasks',
    type: 'GET',
    success: function(response){
      for (var i = 0; i < response.length; i++) {
        // show tasks on DOM
        $('#tasksContainer').append('<p>' + response[i].task + ' <button id="completeButton">Complete</button> ' + ' <button id="deleteButton">Delete</button> ' + '</p>');
        console.log('appending tasks to DOM');
      } // end for loop to append tasks and buttons to DOM
    } // end success function
  }); // end ajax call to get tasks
} // end getTasks function
} // end onReady function
