// This class defines the structure of a task with its properties
class Task {
  // Constructor is called when a new Task is created
  // It sets up the initial properties of the task
  constructor(itemName, description, importance, deadline = new Date(), customImage = null) {
    // Create a unique ID for each task using the current timestamp
    // This ensures each task has a distinct identifier
    this.id = Date.now();
    
    // Store the name of the task
    this.itemName = itemName;
    
    // Store a description of the task
    this.description = description;
    
    // Set the importance level of the task (used for sorting and priority)
    this.importance = importance;
    
    // Set the deadline for the task (defaults to current date if not specified)
    this.deadline = deadline;
    
    // Track whether the task is completed or not
    this.isCompleted = false;
    
    // Set the image for the task
    // If no custom image is provided, use the default task image
    this.customImage = customImage || '/images/task.png';
  }
}

// Predefined images for sample tasks
const taskImages = {
  task1: '/images/dog.png',
  task2: '/images/grocery.png',
  task3: '/images/meeting.png',
  task4: '/images/gym.png',
  task5: '/images/task.png'
};

// Initial list of tasks
// These are example tasks that will be displayed when the app first loads
const items = [
  new Task(
    "Take Dog for Walk",
    "Morning walk around the neighborhood park",
    3,
    new Date('2024-01-27'),
    '/images/dog.png'
  ),
  new Task(
    "Grocery Shopping",
    "Weekly groceries including fresh produce",
    0,
    new Date('2024-01-28'),
    '/images/grocery.png'
  ),
  new Task(
    "Team Meeting",
    "Weekly sprint planning meeting",
    1,
    new Date('2024-01-29'),
    '/images/meeting.png'
  ),
  new Task(
    "Gym Session",
    "Cardio and strength training",
    5,
    new Date('2024-01-27'),
    '/images/gym.png'
  ),
  new Task(
    "Project Deadline",
    "Complete client presentation",
    0,
    new Date('2024-01-30'),
    '/images/task.png'
  )
];

// Helper function to determine the color of the importance badge
// This makes it easy to visually understand task priority
function getImportanceClass(importance) {
  // Low importance tasks get a green badge
  if (importance <= 1) return 'bg-success';
  
  // Medium importance tasks get a yellow badge
  if (importance <= 3) return 'bg-warning';
  
  // High importance tasks get a red badge
  return 'bg-danger';
}

// Helper function to format dates in a more readable way
function formatDate(date) {
  // Convert the date to a localized string format
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Function to create a visual card representation of a task
function createTaskCard(task) {
  // Create a column to hold the task card
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4';
  col.dataset.taskId = task.id;
  
  // Create the card container
  const card = document.createElement('div');
  card.className = `card h-100 ${task.isCompleted ? 'bg-light' : ''}`;
  
  // Add a header with a dropdown menu for task actions
  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header d-flex justify-content-between align-items-center';
  cardHeader.innerHTML = `
    <span class="task-tag">Task</span>
    <div class="dropdown">
      <button class="btn btn-link" data-bs-toggle="dropdown">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Edit</a></li>
        <li><a class="dropdown-item" href="#">Share</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item text-danger delete-task-dropdown" href="#">Delete</a></li>
      </ul>
    </div>
  `;
  
  // Add event listener to delete task from dropdown
  const dropdownDeleteBtn = cardHeader.querySelector('.delete-task-dropdown');
  dropdownDeleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Find the index of the task in the items array
    const index = items.findIndex(t => t.id === task.id);
    if (index !== -1) {
      // Remove the task from the array
      items.splice(index, 1);
      // Re-render the tasks to update the display
      renderItems();
    }
  });

  // Create container for task image
  const imgContainer = document.createElement('div');
  imgContainer.className = 'card-img-container';
  
  // Add image to the container
  const img = document.createElement('img');
  img.src = task.customImage;
  img.alt = task.itemName;
  img.className = 'card-img-top';
  imgContainer.appendChild(img);
  
  // Create card body with task details
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  
  // Add task title
  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = task.itemName;
  
  // Add task description
  const description = document.createElement('p');
  description.className = 'card-text';
  description.textContent = task.description;
  
  // Add task deadline
  const details = document.createElement('div');
  details.className = 'mb-3';
  details.innerHTML = `
    <p class="mb-1"><small class="text-muted"><i class="far fa-calendar-alt me-1"></i>Due: ${formatDate(task.deadline)}</small></p>
  `;
  
  // Create card footer with importance and action buttons
  const cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer bg-transparent';
  
  const footerContent = document.createElement('div');
  footerContent.className = 'd-flex justify-content-between align-items-center';
  
  // Create importance indicator
  const importanceContainer = document.createElement('div');
  importanceContainer.className = 'd-flex align-items-center';
  
  const importanceBtn = document.createElement('button');
  importanceBtn.className = 'btn btn-outline-primary btn-sm';
  importanceBtn.innerHTML = '<i class="fas fa-flag me-1"></i>Priority';
  
  const importanceBadge = document.createElement('span');
  importanceBadge.className = `importance-badge ${getImportanceClass(task.importance)}`;
  importanceBadge.textContent = task.importance;
  
  // Create action buttons for delete and complete
  const actionButtons = document.createElement('div');
  actionButtons.className = 'card-actions';
  actionButtons.innerHTML = `
    <button class="btn btn-danger btn-sm delete-task"><i class="fas fa-trash-alt"></i></button>
    <button class="btn btn-success btn-sm complete-task">${task.isCompleted ? 'Undo' : 'Complete'}</button>
  `;
  
  // Add delete task functionality
  const deleteButton = actionButtons.querySelector('.delete-task');
  deleteButton.addEventListener('click', () => {
    const index = items.findIndex(t => t.id === task.id);
    if (index !== -1) {
      items.splice(index, 1);
      renderItems();
    }
  });

  // Add complete/undo task functionality
  const completeButton = actionButtons.querySelector('.complete-task');
  completeButton.addEventListener('click', () => {
    task.isCompleted = !task.isCompleted;
    renderItems();
  });

  // Add functionality to increase task importance
  importanceBtn.addEventListener('click', () => {
    if (task.importance < 5) {
      task.importance++;
      importanceBadge.textContent = task.importance;
      importanceBadge.className = `importance-badge ${getImportanceClass(task.importance)}`;
    }
  });
  
  // Assemble all card components
  importanceContainer.appendChild(importanceBtn);
  importanceContainer.appendChild(importanceBadge);
  footerContent.appendChild(importanceContainer);
  footerContent.appendChild(actionButtons);
  cardFooter.appendChild(footerContent);
  
  cardBody.appendChild(title);
  cardBody.appendChild(description);
  cardBody.appendChild(details);
  
  card.appendChild(cardHeader);
  card.appendChild(imgContainer);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  
  col.appendChild(card);
  return col;
}

// Function to render tasks in the container
function renderItems(sortedItems = items) {
  // Get the container where tasks will be displayed
  const container = document.getElementById('itemsContainer');
  
  // Clear any existing tasks
  container.innerHTML = '';
  
  // Create and append a card for each task
  sortedItems.forEach(item => {
    container.appendChild(createTaskCard(item));
  });
}

// Add event listener for sorting tasks
document.getElementById('sortSelect').addEventListener('change', (e) => {
  let sortedItems;
  // Determine sorting method based on selected option
  switch(e.target.value) {
    case 'importance':
      // Sort by importance in descending order
      sortedItems = [...items].sort((a, b) => b.importance - a.importance);
      break;
    case 'deadline':
      // Sort by deadline in ascending order
      sortedItems = [...items].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      break;
    case 'name':
      // Sort alphabetically by task name
      sortedItems = [...items].sort((a, b) => a.itemName.localeCompare(b.itemName));
      break;
    default:
      // If no sorting is selected, use original items
      sortedItems = items;
  }
  // Re-render tasks with new sorting
  renderItems(sortedItems);
});

// Add event listener for "Add Task" button
document.getElementById('addTaskBtn').addEventListener('click', () => {
  // Show the modal for adding a new task
  const addTaskModal = new bootstrap.Modal(document.getElementById('addTaskModal'));
  addTaskModal.show();
});

// Add event listener for saving a new task
document.getElementById('saveTaskBtn').addEventListener('click', () => {
  // Get values from input fields
  const taskName = document.getElementById('taskName').value;
  const taskDescription = document.getElementById('taskDescription').value || ''; // Optional, default to empty string
  const taskDeadlineInput = document.getElementById('taskDeadline').value;
  
  // Get the priority value, default to 0 if not provided
  const taskPriority = document.getElementById('taskPriority').value 
    ? parseInt(document.getElementById('taskPriority').value) 
    : 0;

  // Get the custom image file
  const taskImageInput = document.getElementById('taskImage');
  
  // Validate task name (which is now required)
  if (taskName) {
    // Function to handle task creation with or without custom image
    const createTask = (imageUrl = null) => {
      // Determine the deadline - use today's date if no date is selected
      const taskDeadline = taskDeadlineInput 
        ? new Date(taskDeadlineInput) 
        : new Date(); // Default to today's date if no deadline specified

      // Create a new task with provided details
      const newTask = new Task(
        taskName,
        taskDescription,
        taskPriority,  
        taskDeadline,
        imageUrl || '/images/task.png' // Use custom image or default image (images/task.png)
      );

      // Add task to the items array
      items.push(newTask);
      
      // Re-render tasks to show the new task
      renderItems();

      // Hide the modal
      const addTaskModal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
      addTaskModal.hide();

      // Reset the form
      document.getElementById('addTaskForm').reset();
    };

    // Check if a custom image is uploaded
    if (taskImageInput.files.length > 0) {
      // Read the uploaded image file
      const reader = new FileReader();
      reader.onload = function(e) {
        // Create task with the uploaded image URL
        createTask(e.target.result);
      };
      reader.readAsDataURL(taskImageInput.files[0]);
    } else {
      // Create task with default image
      createTask();
    }
  }
});

// Initial rendering of tasks when the page loads
renderItems();