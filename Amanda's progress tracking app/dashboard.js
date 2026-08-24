const usernameElement = document.querySelector('#username');
const username = new URLSearchParams(window.location.search).get('username');
const categoryGrid = document.querySelector('#category-grid');
const detailView = document.querySelector('#detail-view');
const categorySection = document.querySelector('.category-section');
const choiceView = document.querySelector('#choice-view');
const choiceGrid = document.querySelector('#choice-grid');
const choiceLabel = document.querySelector('#choice-label');
const choiceCount = document.querySelector('#choice-count');
const detailEmoji = document.querySelector('#detail-emoji');
const detailLabel = document.querySelector('#detail-label');
const detailTitle = document.querySelector('#detail-title');
const detailSummary = document.querySelector('#detail-summary');
const detailScroll = document.querySelector('#detail-scroll');
const backButton = document.querySelector('#back-button');
const choiceBack = document.querySelector('#choice-back');
const menuToggle = document.querySelector('#menu-toggle');
const sidebar = document.querySelector('#sidebar');
const calendarNav = document.querySelector('#calendar-nav');

const activityEmojis = {
  Gymnastics: '🤸', Dance: '💃', Ballet: '🩰', Soccer: '⚽', Basketball: '🏀', Volleyball: '🏐', Tennis: '🎾', Swimming: '🏊', Diving: '🤿', 'Track & Field': '🏃', 'Cross Country': '🏃', Cheerleading: '📣', 'Figure Skating': '⛸️', 'Ice Hockey': '🏒', Baseball: '⚾', Softball: '🥎', Football: '🏈', Golf: '⛳', Wrestling: '🤼', Boxing: '🥊', 'Martial Arts': '🥋', 'Rock Climbing': '🧗', Skateboarding: '🛹', Surfing: '🏄', Cycling: '🚴', Badminton: '🏸', 'Table Tennis': '🏓', Lacrosse: '🥍', 'Field Hockey': '🏑', Rowing: '🚣',
  Mathematics: '➗', Algebra: '📐', Geometry: '📏', Calculus: '∫', Statistics: '📊', Science: '🔬', Biology: '🧬', Chemistry: '⚗️', Physics: '⚛️', 'Earth Science': '🌍', English: '📖', Reading: '📚', Writing: '✍️', Grammar: '📝', History: '🏺', 'World History': '🌐', Geography: '🗺️', Economics: '📈', Government: '🏛️', 'Computer Science': '💻', 'Foreign Languages': '🗣️', Spanish: '🇪🇸', French: '🇫🇷', German: '🇩🇪', 'Public Speaking': '🎙️', 'Study Skills': '📓', 'Test Preparation': '✅',
  Python: '🐍', JavaScript: '🟨', HTML: '🌐', CSS: '🎨', TypeScript: '🔷', Java: '☕', 'C++': '⚙️', 'C#': '🔧', 'Web Development': '🖥️', 'App Development': '📱', 'Game Development': '🎮', 'Software Engineering': '🛠️', Cybersecurity: '🔐', 'Artificial Intelligence': '🧠', Robotics: '🤖', 'Data Science': '📊', Databases: '🗄️', Git: '🔀', 'UI/UX Design': '🖌️',
  Drawing: '✏️', Painting: '🖌️', 'Digital Art': '🖥️', Illustration: '🖼️', Animation: '🎞️', 'Graphic Design': '🔶', Photography: '📷', 'Video Editing': '🎬', '3D Modeling': '🧊', Sculpting: '🗿', 'Creative Writing': '🖋️', Storytelling: '📜', Acting: '🎭', Filmmaking: '🎥', 'Fashion Design': '👗',
  Piano: '🎹', Guitar: '🎸', Violin: '🎻', Viola: '🎻', Cello: '🎻', Drums: '🥁', Flute: '🪈', Clarinet: '🎶', Saxophone: '🎷', Trumpet: '🎺', Singing: '🎤', Songwriting: '🎼', 'Music Theory': '🎼', 'Music Production': '🎧', Composition: '🎵', Journaling: '📔', Poetry: '📜', 'Essay Writing': '📄', Mandarin: '🀄', Japanese: '🗾', 'American Sign Language': '🤟', Cooking: '🍳', Baking: '🧁', Organization: '🗂️', 'Time Management': '⏰', Communication: '💬', Leadership: '🧭', Memory: '🧩', Meditation: '🧘', Gardening: '🌱', Sewing: '🧵', Crafting: '🧶', Entrepreneurship: '💡', Business: '💼', 'Financial Literacy': '💰'
};

const activityImages = {
  Gymnastics: null, Dance: null, Ballet: null, Soccer: null, Basketball: null, Volleyball: null, Tennis: null, Swimming: null, Diving: null, 'Track & Field': null, 'Cross Country': null, Cheerleading: null, 'Figure Skating': null, 'Ice Hockey': null, Baseball: null, Softball: null, Football: null, Golf: null, Wrestling: null, Boxing: null, 'Martial Arts': null, 'Rock Climbing': null, Skateboarding: null, Surfing: null, Cycling: null, Badminton: null, 'Table Tennis': null, Lacrosse: null, 'Field Hockey': null, Rowing: null,
  Mathematics: null, Algebra: null, Geometry: null, Calculus: null, Statistics: null, Science: null, Biology: null, Chemistry: null, Physics: null, 'Earth Science': null, English: null, Reading: null, Writing: null, Grammar: null, History: null, 'World History': null, Geography: null, Economics: null, Government: null, 'Computer Science': null, 'Foreign Languages': null, Spanish: null, French: null, German: null, 'Public Speaking': null, 'Study Skills': null, 'Test Preparation': null,
  Python: null, JavaScript: null, HTML: null, CSS: null, TypeScript: null, Java: null, 'C++': null, 'C#': null, 'Web Development': null, 'App Development': null, 'Game Development': null, 'Software Engineering': null, Cybersecurity: null, 'Artificial Intelligence': null, Robotics: null, 'Data Science': null, Databases: null, Git: null, 'UI/UX Design': null,
  Drawing: null, Painting: null, 'Digital Art': null, Illustration: null, Animation: null, 'Graphic Design': null, Photography: null, 'Video Editing': null, '3D Modeling': null, Sculpting: null, 'Creative Writing': null, Storytelling: null, Acting: null, Filmmaking: null, 'Fashion Design': null,
  Piano: null, Guitar: null, Violin: null, Viola: null, Cello: null, Drums: null, Flute: null, Clarinet: null, Saxophone: null, Trumpet: null, Singing: null, Songwriting: null, 'Music Theory': null, 'Music Production': null, Composition: null,
  Journaling: null, Poetry: null, 'Essay Writing': null, Mandarin: null, Japanese: null, 'American Sign Language': null, Cooking: null, Baking: null, Organization: null, 'Time Management': null, Communication: null, Leadership: null, Memory: null, Meditation: null, Gardening: null, Sewing: null, Crafting: null, Entrepreneurship: null, Business: null, 'Financial Literacy': null
};

const categories = [
  {
    name: 'Sports',
    activity: 'Gymnastics',
    choices: ['Gymnastics', 'Dance', 'Ballet', 'Soccer', 'Basketball', 'Volleyball', 'Tennis', 'Swimming', 'Diving', 'Track & Field', 'Cross Country', 'Cheerleading', 'Figure Skating', 'Ice Hockey', 'Baseball', 'Softball', 'Football', 'Golf', 'Wrestling', 'Boxing', 'Martial Arts', 'Rock Climbing', 'Skateboarding', 'Surfing', 'Cycling', 'Badminton', 'Table Tennis', 'Lacrosse', 'Field Hockey', 'Rowing'],
    accent: '#e58b8c',
    summary: 'Build strength, flexibility, balance, and confidence through purposeful movement.',
    details: ['Gymnastics brings together strength, coordination, flexibility, and focus. Each movement is a chance to understand what your body can do.', 'Start with a small skill, notice the details, and let steady practice turn effort into progress.']
  },
  {
    name: 'Academics', activity: 'Mathematics', choices: ['Mathematics', 'Algebra', 'Geometry', 'Calculus', 'Statistics', 'Science', 'Biology', 'Chemistry', 'Physics', 'Earth Science', 'English', 'Reading', 'Writing', 'Grammar', 'History', 'World History', 'Geography', 'Economics', 'Government', 'Computer Science', 'Foreign Languages', 'Spanish', 'French', 'German', 'Public Speaking', 'Study Skills', 'Test Preparation'], accent: '#d7a05d', summary: 'Explore patterns and ideas by turning curiosity into clear understanding.', details: ['Mathematics is a way to spot patterns, ask better questions, and explain how ideas connect.', 'Give yourself time to work through each step.']
  },
  {
    name: 'Coding & Technology', activity: 'Web Development', choices: ['Python', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'C++', 'C#', 'Web Development', 'App Development', 'Game Development', 'Software Engineering', 'Cybersecurity', 'Artificial Intelligence', 'Robotics', 'Data Science', 'Databases', 'Git', 'UI/UX Design'], accent: '#78a8c7', summary: 'Turn ideas into useful, expressive things by learning how the web works.', details: ['Coding rewards curiosity and iteration. Small experiments can become useful tools, playful experiences, or creative work.', 'Begin with one clear idea and improve it one step at a time.']
  },
  {
    name: 'Art & Creativity', activity: 'Drawing', choices: ['Drawing', 'Painting', 'Digital Art', 'Illustration', 'Animation', 'Graphic Design', 'Photography', 'Video Editing', '3D Modeling', 'Sculpting', 'Creative Writing', 'Storytelling', 'Acting', 'Filmmaking', 'Fashion Design'], accent: '#c78bb4', summary: 'Practice seeing closely and expressing what you notice in your own way.', details: ['Drawing is a practice of observation. Lines, shapes, and marks become a language for the way you see.', 'There is no single right way to begin.']
  },
  {
    name: 'Music', activity: 'Piano', choices: ['Piano', 'Guitar', 'Violin', 'Viola', 'Cello', 'Drums', 'Flute', 'Clarinet', 'Saxophone', 'Trumpet', 'Singing', 'Songwriting', 'Music Theory', 'Music Production', 'Composition'], accent: '#8e9bc8', summary: 'Find rhythm and expression by making consistent practice feel personal.', details: ['Music grows through listening, repetition, and expression. A short, focused practice can create a meaningful change over time.', 'Let curiosity guide what you play next.']
  },
  {
    name: 'Writing', activity: 'Creative Writing', choices: ['Creative Writing', 'Journaling', 'Poetry', 'Storytelling', 'Essay Writing'], accent: '#df9b76', summary: 'Shape thoughts into words and discover where your imagination can lead.', details: ['Writing gives ideas somewhere to land. Play with details, voice, and structure until the piece sounds like you.', 'A first draft is simply a place to begin.']
  },
  {
    name: 'Languages', activity: 'Spanish', choices: ['Spanish', 'French', 'Mandarin', 'German', 'Japanese', 'American Sign Language'], accent: '#8db5a1', summary: 'Build connection and confidence through everyday words and conversation.', details: ['A language becomes familiar through frequent, meaningful contact. Learn a phrase, use it, and return to it often.', 'Small moments of practice add up.']
  },
  {
    name: 'Life & Other Skills', activity: 'Photography', choices: ['Cooking', 'Baking', 'Organization', 'Time Management', 'Public Speaking', 'Communication', 'Leadership', 'Memory', 'Reading', 'Meditation', 'Gardening', 'Sewing', 'Crafting', 'Entrepreneurship', 'Business', 'Financial Literacy'], accent: '#b591c2', summary: 'Develop useful skills and a personal eye by noticing what helps you grow.', details: ['Everyday skills become stronger through small, repeatable choices. Explore what makes your life, work, and creativity feel more capable.', 'Your point of view is part of the process.']
  }
];

if (username) {
  usernameElement.textContent = username;
}

calendarNav.addEventListener('click', () => {
  window.location.href = `calendar.html?username=${encodeURIComponent(username || '')}`;
});

categories.forEach((category) => {
  const card = document.createElement('button');
  card.className = 'category-card';
  card.type = 'button';
  card.textContent = category.name;
  card.style.setProperty('--card-accent', category.accent);
  card.addEventListener('click', () => showChoices(category));
  categoryGrid.append(card);
});

let activeCategory;

function showChoices(category) {
  activeCategory = category;
  choiceLabel.textContent = category.name;
  choiceCount.textContent = `${category.choices.length} choices`;
  choiceGrid.replaceChildren(...category.choices.map((choice, index) => {
    const element = document.createElement('button');
    element.className = `choice-cloud choice-cloud-${(index % 5) + 1}`;
    element.type = 'button';
    const image = document.createElement('img');
    image.className = 'choice-image';
    image.src = getActivityImage(choice);
    image.alt = `${choice} image coming soon`;
    image.loading = 'lazy';
    const emoji = document.createElement('span');
    emoji.className = 'choice-emoji';
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = activityEmojis[choice] || '✨';
    const label = document.createElement('span');
    label.textContent = choice;
    element.append(image, emoji, label, document.createElement('i'), document.createElement('i'), document.createElement('i'));
    element.addEventListener('click', () => showDetails(category, choice));
    return element;
  }));
  categorySection.hidden = true;
  detailView.hidden = true;
  choiceView.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDetails(category, activityName) {
  detailEmoji.textContent = activityEmojis[activityName] || '✨';
  detailLabel.textContent = category.name;
  detailTitle.textContent = activityName;
  detailSummary.textContent = activityName === category.activity ? category.summary : `Build your ${category.name.toLowerCase()} skills through focused practice and steady progress.`;
  const details = activityName === category.activity ? category.details : [`${activityName} is a rewarding way to grow your ${category.name.toLowerCase()} skills. Explore the fundamentals, notice what interests you, and make the next small step your own.`, 'Return often, celebrate small improvements, and let consistent practice shape your confidence.'];
  const sectionHeading = document.createElement('h3');
  sectionHeading.textContent = 'What you can learn';
  const detailParagraphs = details.map((paragraph) => {
    const element = document.createElement('p');
    element.textContent = paragraph;
    return element;
  });
  detailScroll.replaceChildren(sectionHeading, ...detailParagraphs);
  categorySection.hidden = true;
  choiceView.hidden = true;
  detailView.hidden = false;
  detailTitle.focus?.();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getActivityImage(activityName) {
  if (!(activityName in activityImages)) {
    throw new Error(`Missing controlled image entry for ${activityName}`);
  }

  return activityImages[activityName] || createImagePlaceholder();
}

function createImagePlaceholder() {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420"><rect width="600" height="420" fill="#f7e8d9"/><circle cx="300" cy="175" r="74" fill="#fff8ee"/><path d="M165 290c25-50 71-60 105-25 28-72 126-75 157 0 40-31 104-7 108 45H65c5-31 39-47 70-20 6-24 17-32 30-35Z" fill="#e2bad1" opacity=".7"/><text x="300" y="365" text-anchor="middle" fill="#674c67" font-family="Arial,sans-serif" font-size="25" font-weight="700">Image coming soon</text></svg>';
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

backButton.addEventListener('click', () => {
  detailView.hidden = true;
  choiceView.hidden = false;
});

choiceBack.addEventListener('click', () => {
  choiceView.hidden = true;
  categorySection.hidden = false;
});

document.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((navItem) => navItem.classList.remove('is-active'));
    item.classList.add('is-active');
    sidebar.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.action-button').forEach((button) => {
  button.addEventListener('click', () => button.classList.toggle('is-selected'));
});
