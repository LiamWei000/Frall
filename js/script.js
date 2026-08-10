/* =========================================================
   FOR MY SAYANG, FRALL — script.js
   Edit the CONFIG and content objects below to customize
   everything without touching the logic further down.
   ========================================================= */

const CONFIG = {
  myName: "Liam",
  partnerName: "Frall",
  nickname: "Sayang",

  // Format: YYYY-MM-DD
  relationshipStart: "2026-05-27",

  // Format: MM-DD
  myBirthday: "09-13",

  // TEMPORARY — replace with Frall's actual birthday when known
  partnerBirthday: "10-13",

  musicTitle: "My Love Mine All Mine",
  musicFile: "assets/music/our-song.mp3"
};

// ---- Little things cards -----------------------------------------------
const littleThings = [
  { label: "Talking",                  msg: "Ngobrol denganmu selalu terasa mudah." },
  { label: "Laughing",                 msg: "Ketawa bareng kamu itu momen favoritku." },
  { label: "Spending Time Together",   msg: "Waktu berasa lebih berarti kalau ada kamu." },
  { label: "Being Comfortable",        msg: "Nggak perlu jadi siapa-siapa, cukup jadi diri sendiri." },
  { label: "Simply Being There",       msg: "Kamu ada, dan itu sudah cukup buatku." }
];

// ---- Why You cards -------------------------------------------------------
const whyYouCards = [
  "Karena bersamamu, aku nggak perlu berpura-pura jadi orang lain.",
  "Karena obrolan biasa pun bisa jadi kenangan.",
  "Karena entah bagaimana, berada di dekatmu terasa nyaman.",
  "Karena kamu jadi seseorang yang benar-benar kuhargai kehadirannya.",
  "Karena kamu mendengarkan, bahkan untuk hal-hal kecil.",
  "Karena bersamamu, aku bisa jadi diriku yang paling santai.",
  "Karena kamu membuat hari-hari biasa terasa sedikit lebih hangat.",
  "Karena caramu hadir bikin aku merasa dimengerti."
];

// ---- Gallery captions ------------------------------------------------
const galleryItems = [
  { src: "assets/images/memory-01.jpg", caption: "A little moment I'll keep." },
  { src: "assets/images/memory-02.jpg", caption: "One of those simple moments." },
  { src: "assets/images/memory-03.jpg", caption: "Nothing special, and that's why it's special." },
  { src: "assets/images/memory-04.jpg", caption: "Just us, being us." },
  { src: "assets/images/memory-05.jpg", caption: "A small memory worth saving." },
  { src: "assets/images/memory-06.jpg", caption: "Little things, kept safe here." }
];

/* =========================================================
   HELPERS
   ========================================================= */
function pad(n){ return String(n).padStart(2, "0"); }

/* =========================================================
   OPENING SEQUENCE
   ========================================================= */
const openingScreen = document.getElementById("opening");
const openBtn = document.getElementById("open-story-btn");
const mainSite = document.getElementById("main-site");
const openingHeartsWrap = document.getElementById("opening-hearts");

function spawnHeart(container, opts = {}){
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = opts.symbol || "♡";
  heart.style.left = (opts.left ?? Math.random() * 100) + "%";
  heart.style.setProperty("--drift", ((Math.random() * 60) - 30) + "px");
  heart.style.animationDuration = (opts.duration || (4 + Math.random() * 3)) + "s";
  heart.style.fontSize = (opts.size || (1 + Math.random())) + "rem";
  container.appendChild(heart);
  setTimeout(() => heart.remove(), (opts.duration || 7) * 1000 + 500);
}

function spawnSparkle(container, x, y){
  const s = document.createElement("span");
  s.className = "sparkle";
  s.style.left = x + "px";
  s.style.top = y + "px";
  container.appendChild(s);
  setTimeout(() => s.remove(), 1000);
}

let openingHeartInterval = null;
function startOpeningHearts(){
  openingHeartInterval = setInterval(() => spawnHeart(openingHeartsWrap), 500);
}
startOpeningHearts();

openBtn.addEventListener("click", () => {
  // small sparkle burst near the button
  const rect = openBtn.getBoundingClientRect();
  for (let i = 0; i < 10; i++){
    setTimeout(() => {
      spawnSparkle(openingHeartsWrap,
        rect.left + rect.width / 2 + (Math.random() * 80 - 40),
        rect.top + (Math.random() * 40 - 20));
    }, i * 60);
  }
  for (let i = 0; i < 8; i++){
    setTimeout(() => spawnHeart(openingHeartsWrap, { duration: 3 + Math.random() * 2 }), i * 90);
  }

  setTimeout(() => {
    openingScreen.classList.add("opening--closing");
    mainSite.hidden = false;
    document.body.style.overflow = "";
    setTimeout(() => {
      clearInterval(openingHeartInterval);
      openingScreen.remove();
      initAfterOpen();
    }, 1050);
  }, 650);
});

// Lock scroll while opening screen is up
document.body.style.overflow = "hidden";

/* =========================================================
   NAV
   ========================================================= */
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   SCROLL REVEAL
   ========================================================= */
function initScrollReveal(){
  const revealEls = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)){
    revealEls.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  revealEls.forEach(el => observer.observe(el));
}

/* =========================================================
   RELATIONSHIP TIMER
   ========================================================= */
function initTimer(){
  const start = new Date(CONFIG.relationshipStart + "T00:00:00");
  const dEl = document.getElementById("t-days");
  const hEl = document.getElementById("t-hours");
  const mEl = document.getElementById("t-mins");
  const sEl = document.getElementById("t-secs");

  function tick(){
    const now = new Date();
    let diff = Math.max(0, now - start);

    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000);
    diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);

    dEl.textContent = days;
    hEl.textContent = pad(hours);
    mEl.textContent = pad(mins);
    sEl.textContent = pad(secs);
  }
  tick();
  setInterval(tick, 1000);
}

/* =========================================================
   ANNIVERSARY COUNTDOWN
   ========================================================= */
function initAnniversary(){
  const start = new Date(CONFIG.relationshipStart + "T00:00:00");
  const el = document.getElementById("anniv-days");

  function tick(){
    const now = new Date();
    const thisYear = now.getFullYear();
    let next = new Date(thisYear, start.getMonth(), start.getDate());
    // normalize "today" to midnight for a clean day count
    const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (next < todayMid){
      next = new Date(thisYear + 1, start.getMonth(), start.getDate());
    }
    const days = Math.round((next - todayMid) / 86400000);
    el.textContent = days;
  }
  tick();
  // update once a minute is plenty for a day-count
  setInterval(tick, 60000);
}

/* =========================================================
   GALLERY + LIGHTBOX
   ========================================================= */
function initGallery(){
  const galleryEl = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");

  galleryItems.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.className = "polaroid reveal";
    btn.style.setProperty("--tilt", ((i % 2 === 0 ? -1 : 1) * (2 + Math.random() * 3)) + "deg");
    btn.setAttribute("aria-label", "Buka foto: " + item.caption);
    btn.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy"
           onerror="this.closest('.polaroid').classList.add('img-missing'); this.style.display='none';">
      <span class="polaroid-cap">${item.caption}</span>
    `;
    btn.addEventListener("click", () => openLightbox(item));
    galleryEl.appendChild(btn);
  });

  function openLightbox(item){
    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = item.caption;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
  function closeLightbox(){
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  // Re-run reveal observer for newly added polaroids
  initScrollReveal();
}

/* =========================================================
   LITTLE THINGS CARDS
   ========================================================= */
function initLittleThings(){
  const wrap = document.getElementById("little-grid");
  littleThings.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "little-card reveal";
    btn.innerHTML = `<span class="label">♡ ${item.label}</span><span class="msg">${item.msg}</span>`;
    btn.addEventListener("click", () => btn.classList.toggle("is-open"));
    wrap.appendChild(btn);
  });
  initScrollReveal();
}

/* =========================================================
   WHY YOU CARDS
   ========================================================= */
function initWhyYou(){
  const wrap = document.getElementById("why-grid");
  whyYouCards.forEach((text, i) => {
    const card = document.createElement("div");
    card.className = "why-card reveal";
    card.innerHTML = `
      <div class="why-card-inner">
        <button class="why-front" aria-label="Buka alasan ${i + 1}">Open me ♡</button>
        <div class="why-back">${text}</div>
      </div>
    `;
    card.querySelector(".why-front").addEventListener("click", () => card.classList.toggle("is-flipped"));
    wrap.appendChild(card);
  });
  initScrollReveal();
}

/* =========================================================
   BIRTHDAYS
   ========================================================= */
function initBirthdays(){
  const msgEl = document.getElementById("bday-msg");
  document.querySelectorAll(".bday-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      msgEl.textContent = "One more day worth celebrating.";
    });
  });
}

/* =========================================================
   ENVELOPE
   ========================================================= */
function initEnvelope(){
  const envelope = document.getElementById("envelope");
  const btn = document.getElementById("open-envelope-btn");
  btn.addEventListener("click", () => {
    envelope.classList.add("is-open");
    btn.disabled = true;
    btn.style.opacity = ".5";
    const rect = envelope.getBoundingClientRect();
    for (let i = 0; i < 14; i++){
      setTimeout(() => {
        spawnSparkle(document.body,
          rect.left + rect.width / 2 + (Math.random() * 160 - 80),
          rect.top + (Math.random() * 100 - 40));
      }, i * 70);
    }
  });
}

/* =========================================================
   FINAL SCREEN HEARTS
   ========================================================= */
function initFinalHearts(){
  const finalEl = document.getElementById("final");
  const wrap = document.getElementById("final-hearts");
  let started = false;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started){
        started = true;
        let count = 0;
        const iv = setInterval(() => {
          spawnHeart(wrap, { duration: 5 + Math.random() * 2, size: .8 + Math.random() * .6 });
          count++;
          if (count > 40) clearInterval(iv);
        }, 700);
      }
    });
  }, { threshold: 0.3 });
  if (finalEl) obs.observe(finalEl);
}

/* =========================================================
   MUSIC PLAYER
   ========================================================= */
function initMusicPlayer(){
  const audio = document.getElementById("audio");
  const toggle = document.getElementById("music-toggle");
  const player = document.getElementById("music-player");
  const playBtn = document.getElementById("music-play");
  const seek = document.getElementById("music-seek");
  const volBtn = document.getElementById("music-vol-btn");
  const vol = document.getElementById("music-volume");
  const icon = document.getElementById("music-icon");

  document.querySelector(".music-title").textContent = "♪ " + CONFIG.musicTitle;
  audio.volume = parseFloat(vol.value);

  toggle.addEventListener("click", () => {
    player.classList.toggle("is-open");
  });

  playBtn.addEventListener("click", () => {
    if (audio.paused){
      audio.play().catch(() => {
        // Autoplay / playback blocked or file missing — fail silently, no error shown to user.
      });
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => { playBtn.textContent = "❚❚"; icon.textContent = "♪"; });
  audio.addEventListener("pause", () => { playBtn.textContent = "▶"; });

  audio.addEventListener("timeupdate", () => {
    if (audio.duration){
      seek.value = String((audio.currentTime / audio.duration) * 100);
    }
  });
  seek.addEventListener("input", () => {
    if (audio.duration){
      audio.currentTime = (parseFloat(seek.value) / 100) * audio.duration;
    }
  });

  vol.addEventListener("input", () => {
    audio.volume = parseFloat(vol.value);
  });
  volBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    volBtn.textContent = audio.muted ? "🔇" : "🔊";
  });

  audio.addEventListener("error", () => {
    // Music file not provided yet — keep the UI usable without throwing.
  });
}

/* =========================================================
   EASTER EGGS
   ========================================================= */
function showEggToast(message){
  const toast = document.getElementById("egg-toast");
  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  clearTimeout(showEggToast._t);
  showEggToast._t = setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => { toast.hidden = true; }, 400);
  }, 2600);
}

function initEasterEggs(){
  // Egg 1: click the nav brand heart a few times
  let brandClicks = 0;
  const brand = document.querySelector(".nav-brand");
  if (brand){
    brand.addEventListener("click", (e) => {
      e.preventDefault();
      brandClicks++;
      if (brandClicks === 5){
        showEggToast("You found a secret. ♡");
      }
    });
  }

  // Egg 2: click the partner's name in the opening title
  const nameTargets = document.querySelectorAll(".script");
  nameTargets.forEach(el => {
    let clicks = 0;
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      clicks++;
      if (clicks === 3){
        showEggToast("Okay… you really found everything.");
      }
    });
  });

  // Egg 3: click the "27 May 2026" date button
  const dateBtn = document.getElementById("date-easter-btn");
  if (dateBtn){
    dateBtn.addEventListener("click", () => {
      showEggToast("The day our little story officially began.");
    });
  }
}

/* =========================================================
   THREAD (signature decorative element)
   ========================================================= */
function initThread(){
  const svg = document.getElementById("thread-svg");
  const path = document.getElementById("thread-path");
  if (!svg || !path) return;

  function draw(){
    const height = document.documentElement.scrollHeight;
    const width = window.innerWidth;
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const amplitude = Math.min(120, width * 0.18);
    const step = Math.max(300, height / 12);
    let d = `M ${width / 2} 0`;
    let dir = 1;
    for (let y = step; y < height; y += step){
      const x = width / 2 + amplitude * dir;
      d += ` Q ${x} ${y - step / 2} ${width / 2} ${y}`;
      dir *= -1;
    }
    path.setAttribute("d", d);
  }
  draw();
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(draw, 200);
  });
}

/* =========================================================
   INIT (after the opening envelope is dismissed)
   ========================================================= */
function initAfterOpen(){
  initTimer();
  initAnniversary();
  initGallery();
  initLittleThings();
  initWhyYou();
  initBirthdays();
  initEnvelope();
  initFinalHearts();
  initMusicPlayer();
  initEasterEggs();
  initThread();
  initScrollReveal();
}
