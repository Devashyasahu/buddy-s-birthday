// ===================================
// Main Script: All code is here
// ===================================

// This code runs only after the entire webpage is loaded.
document.addEventListener("DOMContentLoaded", () => {
  // Global variables that can be used throughout the script.
  const backgroundMusic = document.getElementById("bg-music");
  backgroundMusic.loop = true; // Makes sure the background music plays over and over.

  // ===================================
  // Section 1: Intro
  // ===================================
  const playIconContainer = document.getElementById("play-icon-container");
  let introMusicPlayed = false; // A simple check to see if the music has been played yet.

  // This code runs when the user clicks the music note button.
  playIconContainer.addEventListener("click", () => {
    if (!introMusicPlayed) {
      backgroundMusic.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
      introMusicPlayed = true;
    } else if (backgroundMusic.paused) {
      backgroundMusic.play(); // Resumes the music if it was paused.
    } else {
      backgroundMusic.pause(); // Pauses the music if it's currently playing.
    }
    playIconContainer.classList.add("clicked"); // Adds a class to trigger the light burst animation.
    setTimeout(() => {
      playIconContainer.style.opacity = "0.5"; // Fades the button slightly after the animation.
    }, 500);
  });

  // Floating Particles Animation
  const particleCanvas = document.getElementById("particle-canvas"); // Gets the canvas where the particles will be drawn.
  const pCtx = particleCanvas.getContext("2d");
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = document.querySelector("#intro").offsetHeight;

  const particles = []; // An array to hold all the particle objects.
  // A loop to create 50 individual particles with random properties.
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * particleCanvas.width,
      y: Math.random() * particleCanvas.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
    });
  }

  // A function that continuously animates the particles.
  function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height); // Clears the canvas for the next frame.
    pCtx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Sets the color of the particles.
    particles.forEach(p => {
      pCtx.beginPath();
      pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2); // Draws each particle as a circle.
      pCtx.fill();
      p.y -= p.speed; // Moves the particle upwards.
      if (p.y < 0) {
        p.y = particleCanvas.height; // Resets the particle to the bottom when it goes off-screen.
      }
    });
    requestAnimationFrame(animateParticles); // Requests the next animation frame, creating a smooth loop.
  }
  animateParticles(); // Starts the particle animation.

  // Adjusts the canvas size if the browser window is resized.
  window.addEventListener("resize", () => {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = document.querySelector("#intro").offsetHeight;
  });

  // ===================================
  // Section 2: Letter
  // ===================================
  const scrollContainer = document.getElementById("scroll-container");
  const letterPaper = document.getElementById("scroll-paper");

  // This code runs when the user clicks the sealed letter.
  scrollContainer.addEventListener("click", () => {
    scrollContainer.classList.add("cracked"); // Adds a class to show the broken seal.
    scrollContainer.classList.add("open"); // Adds a class to trigger the opening animation.
    setTimeout(() => {
      letterPaper.style.display = "block"; // Makes the letter paper visible.
      startPetals(); // Starts the falling petals animation.
      // The personal birthday message to be typed out.
      const message = "My Dearest Sakshi,\n\nFrom a distant land, a message travels to you. May this day be as timeless and beautiful as the stories in your heart. May your path be filled with happiness and love, and your spirit remain as bright as the morning sun. Just as the wind carries whispers, my thoughts are always with you.\n\n~ Your Ever-Loyal Friend, Devashya";
      typeWriter(message, "letter-text", 60); // Calls the function to begin typing the message.
    }, 1500); // Waits 1.5 seconds for the letter to open before starting the typing.
  });

  // Typewriter Effect
  // This function types out text one character at a time.
  function typeWriter(text, elementId, delay = 50) {
    let i = 0;
    const element = document.getElementById(elementId);
    const cursor = element.nextElementSibling;
    const typing = setInterval(() => {
      if (i < text.length) {
        if (text.charAt(i) === '\n') {
          element.innerHTML += '<br>'; // Handles new lines.
        } else {
          element.innerHTML += text.charAt(i); // Adds the next character to the screen.
        }
        i++;
        cursor.style.display = 'inline-block'; // Shows the blinking cursor.
      } else {
        clearInterval(typing); // Stops the typing effect once the message is complete.
        cursor.style.display = 'none'; // Hides the cursor.
      }
    }, delay); // The delay between each character being typed.
  }

  // Cherry Blossom Petals (For Letter Section)
  const petalsCanvas = document.getElementById('petals-canvas');
  const pCtx_petals = petalsCanvas.getContext('2d');
  let petals = [];

  // Sets up the canvas and creates the petal objects.
  function startPetals() {
    petalsCanvas.width = window.innerWidth;
    petalsCanvas.height = document.querySelector("#letter").offsetHeight;
    for (let i = 0; i < 50; i++) {
      petals.push({
        x: Math.random() * petalsCanvas.width,
        y: Math.random() * petalsCanvas.height,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 1 + 0.5,
        angle: Math.random() * 360,
        sway: Math.random() * 2
      });
    }
    animatePetals(); // Starts the falling petals animation.
  }

  // The main animation loop for the petals.
  function animatePetals() {
    pCtx_petals.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      pCtx_petals.save();
      pCtx_petals.translate(p.x, p.y);
      pCtx_petals.rotate(p.angle * Math.PI / 180);
      pCtx_petals.fillStyle = `rgba(255, 182, 193, 0.8)`; // The color of the petals.
      pCtx_petals.beginPath();
      pCtx_petals.ellipse(0, 0, p.size, p.size / 2, 0, 0, 2 * Math.PI); // Draws each petal as an ellipse.
      pCtx_petals.fill();
      pCtx_petals.restore();
      p.y += p.speed; // Makes the petal fall.
      p.x += Math.sin(p.y / 50) * p.sway; // Adds a gentle swaying motion.
      p.angle += 1; // Rotates the petal as it falls.
      if (p.y > petalsCanvas.height) {
        p.y = -p.size; // Resets the petal to the top when it falls off-screen.
        p.x = Math.random() * petalsCanvas.width;
      }
    }
    requestAnimationFrame(animatePetals);
  }

  window.addEventListener("resize", () => {
    if (petalsCanvas) {
      petalsCanvas.width = window.innerWidth;
      petalsCanvas.height = document.querySelector("#letter").offsetHeight;
    }
  });

  // ===================================
  // Section 3: K-Drama
  // ===================================
  const kdramaMusic = document.getElementById("kdrama-music");
  const kdramaSection = document.getElementById("kdrama");
  // Creates an "observer" to know when the K-Drama section is visible.
  const kdramaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        kdramaMusic.play(); // Plays the music when the section is on screen.
      } else {
        kdramaMusic.pause(); // Pauses the music when the section is not visible.
      }
    });
  }, { threshold: 0.5 }); // Triggers when 50% of the section is visible.
  kdramaObserver.observe(kdramaSection); // Starts watching the K-Drama section.
  kdramaMusic.addEventListener('play', () => {
    document.getElementById("song-title").textContent = "Your Chosen Song 🎶"; // Updates the song title when music starts.
  });


  // ===================================
  // Section 4: BTS
  // ===================================
  const jungkookVideo = document.getElementById("jungkook-video");
  const videoPlayBtn = document.getElementById("video-play-btn");
  const btsSection = document.getElementById("bts");

  // A function to smoothly decrease the music volume.
  function fadeOut(audioElement) {
    let volume = audioElement.volume;
    const fadeOutInterval = setInterval(() => {
      if (volume > 0.15) {
        volume -= 0.05;
        audioElement.volume = volume;
      } else {
        clearInterval(fadeOutInterval);
      }
    }, 100);
  }

  // A function to smoothly increase the music volume.
  function fadeIn(audioElement) {
    let volume = audioElement.volume;
    const fadeInInterval = setInterval(() => {
      if (volume < 0.95) {
        volume += 0.05;
        audioElement.volume = volume;
      } else {
        clearInterval(fadeInInterval);
      }
    }, 100);
  }

  // Another observer to watch for the BTS section.
  const btsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        videoPlayBtn.classList.remove("hidden"); // Shows the video play button.
      } else {
        videoPlayBtn.classList.add("hidden"); // Hides the video play button.
      }
    });
  }, { threshold: 0.5 });
  btsObserver.observe(btsSection);

  // This code runs when the user clicks the video's play button.
  videoPlayBtn.addEventListener('click', () => {
    videoPlayBtn.classList.add("hidden"); // Hides the button.
    jungkookVideo.muted = false;
    jungkookVideo.play(); // Plays the video.
    if (!backgroundMusic.paused) {
      fadeOut(backgroundMusic); // Fades out the main background music.
    }
  });

  // When the video finishes, this code runs.
  jungkookVideo.addEventListener('ended', () => {
    fadeIn(backgroundMusic); // Fades the main background music back in.
  });

  // Floating Neon Particles
  const btsCanvas = document.getElementById("bts-particles");
  const btsCtx = btsCanvas.getContext("2d");
  btsCanvas.width = window.innerWidth;
  btsCanvas.height = document.querySelector("#bts").offsetHeight;

  // A blueprint for each particle's behavior.
  class BtsParticle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * btsCanvas.width;
      this.y = Math.random() * btsCanvas.height;
      this.size = Math.random() * 4 + 2;
      this.speedY = Math.random() * 0.7 + 0.3;
      this.speedX = Math.random() * 0.6 - 0.3;
      const colors = ["#a855f7", "#c084fc", "#e879f9", "#f0abfc"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.5;
    }
    draw() {
      btsCtx.beginPath();
      btsCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      btsCtx.fillStyle = this.color;
      btsCtx.globalAlpha = this.alpha;
      btsCtx.fill();
      btsCtx.globalAlpha = 1;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      if (this.y < 0 || this.x < 0 || this.x > btsCanvas.width) this.reset();
      this.alpha += (Math.random() - 0.5) * 0.05;
      this.alpha = Math.max(0.2, Math.min(1, this.alpha));
    }
  }

  let btsParticles = Array.from({ length: 80 }, () => new BtsParticle()); // Creates 80 particles.

  // The animation loop for the BTS particles.
  function animateBtsParticles() {
    btsCtx.clearRect(0, 0, btsCanvas.width, btsCanvas.height);
    btsParticles.forEach(p => { p.update(); p.draw(); }); // Updates and draws each particle.
    requestAnimationFrame(animateBtsParticles);
  }
  animateBtsParticles(); // Starts the animation.

  window.addEventListener("resize", () => {
    btsCanvas.width = window.innerWidth;
    btsCanvas.height = document.querySelector("#bts").offsetHeight;
  });

  // ===================================
  // Section 5: Gift Reveal
  // ===================================
  const giftBox = document.getElementById("gift-box");
  const giftReveal = document.querySelector(".gift-reveal");
  const confettiContainer = document.querySelector(".confetti-container");

  // This code runs when the gift box is clicked.
  giftBox.addEventListener("click", () => {
    giftBox.classList.add("open"); // Triggers a visual change in the box.
    setTimeout(() => {
      giftBox.style.display = "none"; // Hides the gift box after a short delay.
      giftReveal.classList.add("show"); // Fades in the gift and message.
      // A loop to create 100 confetti pieces.
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti-piece"); // Styles the element as a confetti piece.
        confetti.style.left = `${Math.random() * 100}vw`; // Gives the confetti a random starting position.
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`; // Gives the confetti a random color.
        confetti.style.animationDelay = `${Math.random() * 1}s`; // Staggers the animation for a more natural look.
        confettiContainer.appendChild(confetti); // Adds the confetti to the page.
      }
    }, 1000); // Waits 1 second before revealing the gift.
  });
});