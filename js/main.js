const slides = Array.from(document.querySelectorAll('.slide'));
const dotsContainer = document.getElementById('dots');
const nextBtn = document.getElementById('next-slide');
const prevBtn = document.getElementById('prev-slide');
let activeSlide = 0;
let slideTimer;

function renderDots() {
  dotsContainer.innerHTML = '';

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    if (index === activeSlide) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
      showSlide(index);
      restartAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

function showSlide(index) {
  slides[activeSlide].classList.remove('active');
  activeSlide = (index + slides.length) % slides.length;
  slides[activeSlide].classList.add('active');
  renderDots();
}

function nextSlide() {
  showSlide(activeSlide + 1);
}

function prevSlide() {
  showSlide(activeSlide - 1);
}

function startAutoSlide() {
  slideTimer = setInterval(nextSlide, 4500);
}

function restartAutoSlide() {
  clearInterval(slideTimer);
  startAutoSlide();
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  restartAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  restartAutoSlide();
});

renderDots();
startAutoSlide();

const modal = document.getElementById('story-modal');
const modalText = document.getElementById('modal-text');
const closeModalBtn = document.getElementById('close-modal');
const readMoreButtons = document.querySelectorAll('.read-more');

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

readMoreButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modalText.textContent = button.dataset.modal || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

const form = document.getElementById('signup-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameValue = form.name.value.trim();
  const emailValue = form.email.value.trim();

  if (!nameValue || !emailValue) {
    formMessage.textContent = 'Please complete all fields.';
    formMessage.style.color = '#9a1b1b';
    return;
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  if (!emailValid) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.style.color = '#9a1b1b';
    return;
  }

  formMessage.textContent = `Thanks, ${nameValue}. You are now subscribed.`;
  formMessage.style.color = '#0f766e';
  form.reset();
});

const audio = document.getElementById('bg-audio');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

musicToggle.addEventListener('click', async () => {
  try {
    if (!isPlaying) {
      await audio.play();
      musicToggle.textContent = 'Pause Music';
      isPlaying = true;
    } else {
      audio.pause();
      musicToggle.textContent = 'Play Music';
      isPlaying = false;
    }
  } catch (error) {
    musicToggle.textContent = 'Music Unavailable';
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
