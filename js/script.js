class Task {
  constructor(itemName, description, importance, deadline = new Date(), customImage = null) {
    this.id = Date.now();
    this.itemName = itemName;
    this.description = description;
    this.importance = importance;
    this.deadline = deadline;
    this.isCompleted = false;
    this.customImage = customImage || 'images/task.png';
  }
}

const taskImages = {
  task1: 'images/dog.png',
  task2: 'images/grocery.png',
  task3: 'images/meeting.png',
  task4: 'images/gym.png',
  task5: 'images/task.png'
};

const items = [
  new Task(
    "Take Dog for Walk",
    "Morning walk around the neighborhood park",
    3,
    new Date('2024-01-27'),
    'images/dog.png'
  ),
  new Task(
    "Grocery Shopping",
    "Weekly groceries including fresh produce",
    0,
    new Date('2024-01-28'),
    'images/grocery.png'
  ),
  new Task(
    "Team Meeting",
    "Weekly sprint planning meeting",
    1,
    new Date('2024-01-29'),
    'images/meeting.png'
  ),
  new Task(
    "Gym Session",
    "Cardio and strength training",
    5,
    new Date('2024-01-27'),
    'images/gym.png'
  ),
  new Task(
    "Project Deadline",
    "Complete client presentation",
    0,
    new Date('2024-01-30'),
    'images/task.png'
  )
];

function getImportanceClass(importance) {
  if (importance <= 1) return 'bg-success';
  if (importance <= 3) return 'bg-warning';
  return 'bg-danger';
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function createTaskCard(task) {
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4';
  col.dataset.taskId = task.id;

  const card = document.createElement('div');
  card.className = `card h-100 ${task.isCompleted ? 'bg-light' : ''}`;

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

  const dropdownDeleteBtn = cardHeader.querySelector('.delete-task-dropdown');
  dropdownDeleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const index = items.findIndex(t => t.id === task.id);
    if (index !== -1) {
      items.splice(index, 1);
      renderItems();
    }
  });

  const imgContainer = document.createElement('div');
  imgContainer.className = 'card-img-container';

  const img = document.createElement('img');
  img.src = task.customImage;
  img.alt = task.itemName;
  img.className = 'card-img-top';
  imgContainer.appendChild(img);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = task.itemName;

  const description = document.createElement('p');
  description.className = 'card-text';
  description.textContent = task.description;

  const details = document.createElement('div');
  details.className = 'mb-3';
  details.innerHTML = `
    <p class="mb-1"><small class="text-muted"><i class="far fa-calendar-alt me-1"></i>Due: ${formatDate(task.deadline)}</small></p>
  `;

  const cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer bg-transparent';

  const footerContent = document.createElement('div');
  footerContent.className = 'd-flex justify-content-between align-items-center';

  const importanceContainer = document.createElement('div');
  importanceContainer.className = 'd-flex align-items-center';

  const importanceBtn = document.createElement('button');
  importanceBtn.className = 'btn btn-outline-primary btn-sm';
  importanceBtn.innerHTML = '<i class="fas fa-flag me-1"></i>Priority';

  const importanceBadge = document.createElement('span');
  importanceBadge.className = `importance-badge ${getImportanceClass(task.importance)}`;
  importanceBadge.textContent = task.importance;

  const actionButtons = document.createElement('div');
  actionButtons.className = 'card-actions';
  actionButtons.innerHTML = `
    <button class="btn btn-danger btn-sm delete-task"><i class="fas fa-trash-alt"></i></button>
    <button class="btn btn-success btn-sm complete-task">${task.isCompleted ? 'Undo' : 'Complete'}</button>
  `;

  const deleteButton = actionButtons.querySelector('.delete-task');
  deleteButton.addEventListener('click', () => {
    const index = items.findIndex(t => t.id === task.id);
    if (index !== -1) {
      items.splice(index, 1);
      renderItems();
    }
  });

  const completeButton = actionButtons.querySelector('.complete-task');
  completeButton.addEventListener('click', () => {
    task.isCompleted = !task.isCompleted;
    renderItems();
  });

  importanceBtn.addEventListener('click', () => {
    if (task.importance < 5) {
      task.importance++;
      importanceBadge.textContent = task.importance;
      importanceBadge.className = `importance-badge ${getImportanceClass(task.importance)}`;
    }
  });

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

function renderItems(sortedItems = items) {
  const container = document.getElementById('itemsContainer');
  container.innerHTML = '';
  sortedItems.forEach(item => {
    container.appendChild(createTaskCard(item));
  });
}

document.getElementById('sortSelect').addEventListener('change', (e) => {
  let sortedItems;
  switch(e.target.value) {
    case 'importance':
      sortedItems = [...items].sort((a, b) => b.importance - a.importance);
      break;
    case 'deadline':
      sortedItems = [...items].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      break;
    case 'name':
      sortedItems = [...items].sort((a, b) => a.itemName.localeCompare(b.itemName));
      break;
    default:
      sortedItems = items;
  }
  renderItems(sortedItems);
});

document.getElementById('addTaskBtn').addEventListener('click', () => {
  const addTaskModal = new bootstrap.Modal(document.getElementById('addTaskModal'));
  addTaskModal.show();
});

document.getElementById('saveTaskBtn').addEventListener('click', () => {
  const taskName = document.getElementById('taskName').value;
  const taskDescription = document.getElementById('taskDescription').value || '';
  const taskDeadlineInput = document.getElementById('taskDeadline').value;

  const taskPriority = document.getElementById('taskPriority').value
    ? parseInt(document.getElementById('taskPriority').value)
    : 0;

  const taskImageInput = document.getElementById('taskImage');

  if (taskName) {
    const createTask = (imageUrl = null) => {
      const taskDeadline = taskDeadlineInput
        ? new Date(taskDeadlineInput)
        : new Date();

      const newTask = new Task(
        taskName,
        taskDescription,
        taskPriority,
        taskDeadline,
        imageUrl || 'images/task.png'
      );

      items.push(newTask);
      renderItems();

      const addTaskModal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
      addTaskModal.hide();

      document.getElementById('addTaskForm').reset();
    };

    if (taskImageInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
        createTask(e.target.result);
      };
      reader.readAsDataURL(taskImageInput.files[0]);
    } else {
      createTask();
    }
  }
});

renderItems();
