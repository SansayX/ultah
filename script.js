const loader = document.getElementById("loader");
window.addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 850));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
document.querySelectorAll(".gallery-card").forEach(card => {
  card.addEventListener("click", () => {
    lightboxImg.src = card.dataset.full;
    lightboxImg.alt = card.querySelector("img").alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  setTimeout(() => lightboxImg.src = "", 300);
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeLightbox(); });

// Wish interaction + confetti
const wishBtn = document.getElementById("wishBtn");
const wishCard = document.querySelector(".wish-card");
wishBtn.addEventListener("click", () => {
  wishCard.classList.add("wished");
  wishBtn.textContent = "Harapannya disimpan di langit ✨";
  burstConfetti();
});

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
function resizeCanvas() { canvas.width = innerWidth; canvas.height = innerHeight; }
resizeCanvas(); addEventListener("resize", resizeCanvas);
function burstConfetti() {
  for(let i=0;i<120;i++){
    pieces.push({
      x: innerWidth/2, y: innerHeight*.52,
      vx:(Math.random()-.5)*10, vy:Math.random()*-10-3,
      g:.22+Math.random()*.1, s:3+Math.random()*6,
      r:Math.random()*Math.PI, vr:(Math.random()-.5)*.2,
      life:100+Math.random()*70
    });
  }
}
function animateConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pieces = pieces.filter(p=>p.life>0);
  pieces.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy; p.vy+=p.g; p.r+=p.vr; p.life--;
    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r);
    ctx.globalAlpha=Math.min(1,p.life/25);
    ctx.fillStyle = ["#f5a9c4","#ffd1df","#fff7f3","#b9a8ff","#f5d99b"][Math.floor(Math.random()*5)];
    ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.55); ctx.restore();
  });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// Heart click
document.getElementById("bigHeart").addEventListener("click", (e)=>{
  e.currentTarget.classList.remove("pop");
  void e.currentTarget.offsetWidth;
  e.currentTarget.classList.add("pop");
  burstConfetti();
});

// Gentle generated ambience using Web Audio (no external audio file needed)
let audioCtx = null, playing = false, timer = null;
const musicBtn = document.getElementById("musicBtn");
function startAmbience(){
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const master = audioCtx.createGain(); master.gain.value=.035; master.connect(audioCtx.destination);
  const notes = [261.63,329.63,392,523.25,392,329.63];
  let i=0;
  const playNote=()=>{
    if(!playing) return;
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    o.type="sine"; o.frequency.value=notes[i++%notes.length];
    g.gain.setValueAtTime(0,audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(.7,audioCtx.currentTime+.08);
    g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+1.8);
    o.connect(g);g.connect(master);o.start();o.stop(audioCtx.currentTime+1.9);
    timer=setTimeout(playNote,1100);
  };
  playNote();
}
musicBtn.addEventListener("click", async ()=>{
  if(!playing){
    playing=true;
    startAmbience();
    musicBtn.classList.add("music-on");
    document.getElementById("musicText").textContent="on";
  }else{
    playing=false; clearTimeout(timer);
    musicBtn.classList.remove("music-on");
    document.getElementById("musicText").textContent="suasana";
  }
});

// Tiny tilt on desktop
const tilt = document.querySelector(".tilt");
if (tilt && matchMedia("(pointer:fine)").matches) {
  tilt.addEventListener("mousemove", e=>{
    const r=tilt.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    tilt.style.transform=`rotate(${3+x*5}deg) rotateX(${-y*4}deg) rotateY(${x*5}deg)`;
  });
  tilt.addEventListener("mouseleave", ()=> tilt.style.transform="rotate(3deg)");
}
