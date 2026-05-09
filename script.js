const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      opacity: Math.random(),
      speed: Math.random() * 0.5 + 0.1
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff0062';
  stars.forEach(s => {
    ctx.globalAlpha = s.opacity;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
    s.y -= s.speed;
    if (s.y < 0) s.y = canvas.height;
    s.opacity += (Math.random() - 0.5) * 0.05;
    if (s.opacity < 0.1) s.opacity = 0.1;
    if (s.opacity > 1) s.opacity = 1;
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', initStars);
initStars();
drawStars();

const music = document.getElementById("bgMusic");
let currentIndex = 0;

function startSequence() {
  music.play().catch(() => {});
  const startDiv = document.getElementById("startView");
  startDiv.classList.add("fade-out-element");
  setTimeout(() => {
    startDiv.classList.remove("active");
    startDiv.style.display = "none";
    startCount();
  }, 500);
}

function startCount() {
  let i = 1;
  const el = document.getElementById("count");
  el.style.display = "block";
  setTimeout(() => el.classList.add("show"), 50);

  const interval = setInterval(() => {
    el.textContent = i;
    el.classList.remove("show");
    
    setTimeout(() => {
      if (i <= 3) el.classList.add("show");
    }, 50);

    i++;
    if (i > 3) {
      clearInterval(interval);
      el.classList.add("hide");
      setTimeout(() => {
        el.style.display = "none";
        typeText();
      }, 500);
    }
  }, 900);
}

function typeText() {
  const el = document.getElementById("text");
  const fullText = galleryData.welcomeText;

  el.textContent = "";
  el.style.display = "block";
  el.classList.add("show");

  let i = 0;
  
  const interval = setInterval(() => {
    if (i <= fullText.length) {
      el.textContent = fullText.substring(0, i);
      i++;
    } else {
      clearInterval(interval);
      const msgBox = document.getElementById("messageBox");
      msgBox.style.display = "block";
      setTimeout(() => msgBox.classList.add("show"), 50);
    }
  }, 60);
}

function openGallery() {
  const overlay = document.getElementById("overlay");
  overlay.classList.add("active");

  setTimeout(() => {
    document.getElementById("text").style.display = "none";
    document.getElementById("messageBox").style.display = "none";
    
    const gallery = document.getElementById("gallery");
    gallery.style.display = "flex";
    updateCard();

    setTimeout(() => {
      gallery.classList.add("show");
      overlay.classList.remove("active");
    }, 50);
  }, 800);
}

function updateCard() {
  const person = galleryData.people[currentIndex];
  const img = document.getElementById("image");
  const nameEl = document.getElementById("name");
  const descEl = document.getElementById("desc");
  const cardText = document.getElementById("cardText");

  img.classList.add("fade-out");
  cardText.style.opacity = "0";
  cardText.style.transform = "translateY(10px)";

  setTimeout(() => {
    img.src = person.image;
    
    const body = document.body;
    if (person.job === "engineer") {
      body.classList.add("engineer-mode"); 
    } else {
      body.classList.remove("engineer-mode");  
    }
    
    nameEl.textContent = person.name;

    if (person.job === "engineer") {
      nameEl.style.color = "#000000"; 
    } else {
      nameEl.style.color = "";
    }
    
    descEl.textContent = person.caption;

    img.onload = () => {
      img.classList.remove("fade-out");
      cardText.style.opacity = "1";
      cardText.style.transform = "translateY(0)";
    };
    
    setTimeout(() => {
      img.classList.remove("fade-out");
      cardText.style.opacity = "1";
      cardText.style.transform = "translateY(0)";
    }, 300);

  }, 400);
}


function nextImage() {
  if (currentIndex < galleryData.people.length - 1) {
    currentIndex++;
    updateCard();
  } else {
    showEndMessage();
  }
}

function showEndMessage() {
  document.getElementById("gallery").style.display = "none";
  const endPage = document.getElementById("endPage");
  endPage.classList.add("active");

  const img = document.getElementById("endImage");
  const text = document.getElementById("endText");

  img.src = galleryData.endImage;
  text.textContent = "";

  let i = 0;
  const msg = galleryData.endMessage;
  const interval = setInterval(() => {
    text.textContent += msg[i];
    i++;
    if (i >= msg.length) clearInterval(interval);
  }, 60);
}