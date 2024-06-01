const defaultClassesData = [
  {
      "name": "Йога",
      "time": "10:00 - 11:00",
      "maxParticipants": 20,
      "currentParticipants": 0
  },
  {
    "name": "Фитнес",
    "time": "10:00 - 11:00",
    "maxParticipants": 15,
    "currentParticipants": 0
},
  {
      "name": "Пилатес",
      "time": "12:00 - 13:00",
      "maxParticipants": 15,
      "currentParticipants": 0
  },
  {
      "name": "Кардиотренировка",
      "time": "14:00 - 15:00",
      "maxParticipants": 25,
      "currentParticipants": 0
  }
];

function getClassesData() {
  const data = localStorage.getItem('classesData');
  if (!data) {
    saveClassesData(defaultClassesData);
    return defaultClassesData;
  }
  return JSON.parse(data);
}

function saveClassesData(data) {
  localStorage.setItem('classesData', JSON.stringify(data));
}

let classesData = getClassesData();

function renderSchedule() {
  const scheduleContainer = document.getElementById('schedule');
  scheduleContainer.innerHTML = '';
  
  classesData.forEach((classData, index) => {
      const classElement = document.createElement('div');
      classElement.className = 'col-md-4 mb-3';
      
      const isFull = classData.currentParticipants >= classData.maxParticipants;
      
      classElement.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${classData.name}</h5>
                  <p class="card-text">Время: ${classData.time}</p>
                  <p class="card-text">Записано участников: ${classData.currentParticipants}/${classData.maxParticipants}</p>
                  <button class="btn btn-primary btn-sm ${isFull ? 'disabled' : ''}" onclick="enroll(${index})">Записаться</button>
                  <button class="btn btn-danger btn-sm" onclick="unenroll(${index})">Отменить запись</button>
              </div>
          </div>
      `;
      
      scheduleContainer.appendChild(classElement);
  });
}

function enroll(index) {
  if (classesData[index].currentParticipants < classesData[index].maxParticipants) {
      classesData[index].currentParticipants += 1;
      saveClassesData(classesData);
      renderSchedule();
  }
}

function unenroll(index) {
  if (classesData[index].currentParticipants > 0) {
      classesData[index].currentParticipants -= 1;
      saveClassesData(classesData);
      renderSchedule();
  }
}

document.addEventListener('DOMContentLoaded', renderSchedule);
