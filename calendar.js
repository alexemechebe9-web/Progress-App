const query = new URLSearchParams(window.location.search);
const username = query.get('username');
const monthLabel = document.querySelector('#month-label');
const dateGrid = document.querySelector('#date-grid');
const weekdayRow = document.querySelector('.weekday-row');
const sidebar = document.querySelector('#sidebar');
const menuToggle = document.querySelector('#menu-toggle');
const todayButton = document.querySelector('#today-button');
const addItemButton = document.querySelector('#add-item-button');
const dialogBackdrop = document.querySelector('#calendar-dialog-backdrop');
const calendarForm = document.querySelector('#calendar-form');
const dialogTitle = document.querySelector('#dialog-title');
const deleteItemButton = document.querySelector('#delete-item');
const itemTitle = document.querySelector('#item-title');
const itemDate = document.querySelector('#item-date');
const itemType = document.querySelector('#item-type');
const itemStart = document.querySelector('#item-start');
const itemEnd = document.querySelector('#item-end');
const itemNotes = document.querySelector('#item-notes');
const completeOption = document.querySelector('#complete-option');
const itemComplete = document.querySelector('#item-complete');
const moreEventsBackdrop = document.querySelector('#more-events-backdrop');
const moreEventsList = document.querySelector('#more-events-list');

const itemTypes = ['Task', 'Assignment', 'Lesson', 'Practice', 'Event', 'Goal Deadline', 'Other'];
let selectedDate = toDateKey(new Date());
let editingId = null;
let calendarItems = JSON.parse(localStorage.getItem('progress-calendar-items') || '[]');

['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((day) => {
  const element = document.createElement('span');
  element.textContent = day;
  weekdayRow.append(element);
});

let displayedDate = new Date();

itemTypes.forEach((type) => {
  const option = document.createElement('option');
  option.value = type;
  option.textContent = type;
  itemType.append(option);
});

function renderCalendar() {
  const year = displayedDate.getFullYear();
  const month = displayedDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  monthLabel.textContent = displayedDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  dateGrid.replaceChildren();

  for (let index = 0; index < firstDay; index += 1) {
    const emptyCell = document.createElement('span');
    emptyCell.className = 'date-cell is-empty';
    emptyCell.setAttribute('aria-hidden', 'true');
    dateGrid.append(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const cell = document.createElement('time');
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    cell.className = 'date-cell';
    cell.dateTime = dateKey;
    cell.tabIndex = 0;
    cell.setAttribute('role', 'button');
    cell.setAttribute('aria-label', `Select ${dateKey}`);
    cell.textContent = day;
    if (dateKey === selectedDate) cell.classList.add('is-selected');
    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
      cell.classList.add('is-today');
    }
    const dayItems = calendarItems.filter((item) => item.date === dateKey);
    dayItems.slice(0, 1).forEach((item) => {
      const event = document.createElement('button');
      event.className = `calendar-event${item.completed ? ' is-complete' : ''}`;
      event.type = 'button';
      event.textContent = `${item.start ? `${item.start} ` : ''}${item.title}`;
      event.addEventListener('click', (eventClick) => {
        eventClick.stopPropagation();
        openItem(item);
      });
      cell.append(event);
    });
    if (dayItems.length > 1) {
      const more = document.createElement('button');
      more.className = 'calendar-more';
      more.type = 'button';
      more.textContent = `+${dayItems.length - 1} more`;
      more.addEventListener('click', (eventClick) => {
        eventClick.stopPropagation();
        openMoreEvents(dateKey, dayItems);
      });
      cell.append(more);
    }
    cell.addEventListener('click', () => selectDate(dateKey));
    cell.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') selectDate(dateKey);
    });
    dateGrid.append(cell);
  }
}

function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function selectDate(dateKey) {
  selectedDate = dateKey;
  renderCalendar();
  openAddItem(dateKey);
}

function openAddItem(dateKey = selectedDate) {
  editingId = null;
  dialogTitle.textContent = 'Add calendar item';
  deleteItemButton.hidden = true;
  completeOption.hidden = true;
  calendarForm.reset();
  itemDate.value = dateKey;
  itemType.value = itemTypes[0];
  dialogBackdrop.hidden = false;
  itemTitle.focus();
}

function openItem(item) {
  editingId = item.id;
  dialogTitle.textContent = 'Calendar item details';
  deleteItemButton.hidden = false;
  completeOption.hidden = false;
  itemTitle.value = item.title;
  itemDate.value = item.date;
  itemType.value = item.type;
  itemStart.value = item.start;
  itemEnd.value = item.end;
  itemNotes.value = item.notes;
  itemComplete.checked = item.completed;
  dialogBackdrop.hidden = false;
  itemTitle.focus();
}

function closeDialog() {
  dialogBackdrop.hidden = true;
  editingId = null;
}

function saveItems() {
  localStorage.setItem('progress-calendar-items', JSON.stringify(calendarItems));
}

function openMoreEvents(dateKey, items) {
  document.querySelector('#more-events-title').textContent = `Events on ${dateKey}`;
  moreEventsList.replaceChildren(...items.map((item) => {
    const event = document.createElement('button');
    event.className = 'more-event-item';
    event.type = 'button';
    event.textContent = `${item.start ? `${item.start} ` : ''}${item.title}`;
    event.addEventListener('click', () => {
      moreEventsBackdrop.hidden = true;
      openItem(item);
    });
    return event;
  }));
  moreEventsBackdrop.hidden = false;
}

document.querySelector('#previous-month').addEventListener('click', () => {
  displayedDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth() - 1, 1);
  renderCalendar();
});

document.querySelector('#next-month').addEventListener('click', () => {
  displayedDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 1);
  renderCalendar();
});

todayButton.addEventListener('click', () => {
  displayedDate = new Date();
  selectedDate = toDateKey(displayedDate);
  renderCalendar();
});

addItemButton.addEventListener('click', () => openAddItem(selectedDate));
document.querySelector('#dialog-close').addEventListener('click', closeDialog);
dialogBackdrop.addEventListener('click', (event) => {
  if (event.target === dialogBackdrop) closeDialog();
});

document.querySelector('#more-events-close').addEventListener('click', () => {
  moreEventsBackdrop.hidden = true;
});

moreEventsBackdrop.addEventListener('click', (event) => {
  if (event.target === moreEventsBackdrop) moreEventsBackdrop.hidden = true;
});

calendarForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(calendarForm);
  const item = {
    id: editingId || crypto.randomUUID(),
    title: formData.get('title').trim(),
    date: formData.get('date'),
    start: formData.get('start'),
    end: formData.get('end'),
    type: formData.get('type'),
    notes: formData.get('notes').trim(),
    completed: itemComplete.checked
  };
  if (editingId) {
    calendarItems = calendarItems.map((existing) => existing.id === editingId ? item : existing);
  } else {
    calendarItems.push(item);
  }
  selectedDate = item.date;
  displayedDate = new Date(`${item.date}T12:00:00`);
  saveItems();
  closeDialog();
  renderCalendar();
});

deleteItemButton.addEventListener('click', () => {
  if (!editingId || !window.confirm('Delete this calendar item?')) return;
  calendarItems = calendarItems.filter((item) => item.id !== editingId);
  saveItems();
  closeDialog();
  renderCalendar();
});

document.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', () => {
    if (item.id === 'calendar-nav') return;
    window.location.href = `dashboard.html?username=${encodeURIComponent(username || '')}`;
  });
});

menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

renderCalendar();
