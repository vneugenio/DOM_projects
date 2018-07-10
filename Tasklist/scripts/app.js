// Define variables:
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    // Add new tasks
    form.addEventListener('submit', addTask);

    // Delete tasks one-by-one
    taskList.addEventListener('click', removeItem);

    // Clear all tasks on the list
    clearBtn.addEventListener('click', removeAll);

    // Filter Event
    filter.addEventListener('input', filterTasks);
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



        // add event listener for removing <li> by clicking on <a>
        link.addEventListener('click', removeTask);


        // Clear input
        taskInput.value = '';

    }

    e.preventDefault();
} 

// Remove each item on the list one-by-one
function removeTask(e) {
    e.stopPropagation();
    /*
        e.target || this === <i class="fas fa-times"></i>
        e.target.parentElement === <a class="delete-item secondary-content">
        e.target.parentElement.parentElement === <li>
    */
    if(confirm('Are you sure?') === true) {  
        e.target.parentElement.parentElement.remove();               
    }
}


// alternative method for removing <li>
function removeItem(e) {
    // <a class="delete-item secondary-content">
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?') === true) { 
            e.target.parentElement.parentElement.remove();
        }
    }
}


function removeAll(e) {
    e.preventDefault();
    e.stopPropagation();
    // easiest way:
    // taskList.innerHTML = '';

    // faster runtime as per
    // https://jsperf.com/innerhtml-vs-removechild 
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

}

function filterTasks(e) {
    const keyword = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        
        /*
            hide an <li> if its text content in lowercase 
            is not equivalent to the lowercase value of input  
            in the filter (keyword)
        */

        if(item.toLowerCase().indexOf(keyword) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}