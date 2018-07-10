// Define variables:
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();
// Load all event listeners
function loadEventListeners(){

    form.addEventListener('submit', addTask);
}

// Add Task
function addTask(e){
    if((taskInput === '') || (taskInput.value.search(/[\S]/) === -1)) {
        alert('Please add a task!');
    } else {
        
        // Create <li> element from input
        const li = document.createElement('li');
        
        // Add class to <li>
        li.className = 'collection-item';
        
        // Create text content from input
        li.appendChild(document.createTextNode(taskInput.value));

        // create link for removing <li>
        const link = document.createElement('a');

        // Add class to link
        link.className = 'delete-item secondary-content';

        // Add FA icon to <a>
        link.innerHTML = '<i class="fas fa-times"></i>';

        // Append remove link to list-item
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);


        // Clear input
        taskInput.value = '';

    }



    e.preventDefault();
} 
