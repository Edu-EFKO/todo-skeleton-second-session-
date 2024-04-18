document.addEventListener('DOMContentLoaded', (event) => {
    const draggables = document.querySelectorAll('.task-item');
    const columns = document.querySelectorAll('.kanban__column');
   

    const addButton = document.querySelectorAll('.kanban__icon--add');
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });
  
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });
  
    columns.forEach(column => {
      column.addEventListener('dragover', e => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        column.querySelector('.kanban__list').appendChild(draggable);
      });
    });

    addButton.forEach(button => {
        button.addEventListener('click', (event) => {
            const column = event.target.closest('.kanban__column');
            const taskList = column.querySelector('.kanban__list');
            createNewTask(taskList);
        });
    });

    
});

function createNewTask(taskList) {
    const taskTitle = prompt('Введите название задачи:');
    const taskDescription = prompt('Введите описание задачи:');
    const taskDate = prompt('Введите дату завершения задачи (формат ГГГГ-ММ-ДД):');
  
    if (taskTitle && taskDescription && taskDate) {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.setAttribute('draggable', 'true');
  
      const complexityClass = getComplexityClass(taskDate);
  
      taskItem.innerHTML = `
        <h3 class="task-item__title">${taskTitle}</h3>
        <p class="task-item__description">${taskDescription}</p>
        <div class="task-item__info">
          <div class="task-item__complexity complexity">
            <span class="complexity__dot ${complexityClass}"></span>
            <span class="complexity__dot ${complexityClass}"></span>
            <span class="complexity__dot ${complexityClass}"></span>
          </div>
          <div class="task-item__client">${taskDate}</div>
        </div>
      `;
      taskList.appendChild(taskItem);
    }
  }
  
  function getComplexityClass(taskDate) {
    const currentDate = new Date();
    const dueDate = new Date(taskDate);
    const timeDiff = dueDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    if (daysDiff <= 7) {
      return 'complexity__dot--high';
    } else if (daysDiff <= 14) {
      return 'complexity__dot--medium';
    } else {
      return 'complexity__dot--low';
    }
  }
