console.log('client.js');

$(document).ready(onReady);

function onReady(){

// event listeners
$('#createTaskButton').on('click', createTask);
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
    } // end ajax success function
  }); // end ajax call to create task
  // empty Task field
  $('#task').val('');
} // end createTask function
