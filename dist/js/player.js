
const musicplayer = document.createElement('template');
musicplayer.innerHTML=`
<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <link rel="stylesheet" href="css/style.min.css" />
  <link rel="stylesheet" href="css/all.min.css" />
</head>

<div class="music-player col-12 mt-5">
<audio src="" id="audio"></audio>
  <div class="avatar col-12" style="height: 300px; overflow: hidden">
    <img
      src=""
      style="height: 100%; width: 100%; object-fit: cover"
      id="cover"
      alt=""
    />
  </div>

  <div class="col-12 track-details flex f-col ac jc my-3">
    <h3 class="text-light" id="artist"></h3>
    <p class="text-primary" id="title"></p>
  </div>

  <div class="col-12 track-controls flex ac sa mb-5 text-light font-lg">
    <i id="prev" class="fas fa-backward fa-2x"></i>
    <i id="play" class="fas fa-play fa-3x"></i>
    <i id="next" class="fas fa-forward fa-2x"></i>
  </div>

  <div class="col-12 track-actions flex ac sa mb-5">
    <a
      href="#"
      class="btn btn-secondary rounded-pill p-2 text-primary flex sb"
    >
      <i class="text-light fas fa-thumbs-up mx-2"></i><span>7K</span>
    </a>
    <a
      href="#"
      class="btn btn-secondary rounded-pill p-2 text-primary flex sb"
    >
      <i class="text-light fas fa-download mx-2"></i><span>12K</span>
    </a>
    <a
      href="#"
      class="btn btn-secondary rounded-pill p-2 text-primary flex sb"
    >
      <i class="text-light fas fa-share mx-2"></i><span>500</span>
    </a>
  </div>
  </div>


`
class Player extends HTMLElement{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(musicplayer.content.cloneNode(true));    

        // DOM elements
        this.trackTitle = this.shadowRoot.querySelector("#title");
        this.trackArtist = this.shadowRoot.querySelector("#artist");
        this.coverImage = this.shadowRoot.getElementById("cover");
        this.audio = this.shadowRoot.getElementById('audio');
        this.playBtn = this.shadowRoot.getElementById("play");
        this.nextBtn = this.shadowRoot.getElementById("next");
        this.prevBtn = this.shadowRoot.getElementById("prev");

        // Local Variables
        this.music = [];
        this.i = 0;
    }

    // Functions
    togglePlayPause() 
    {
        if (this.audio.paused || this.audio.ended) 
        {
            this.playBtn.classList.remove("fa-play")
            this.playBtn.classList.add("fa-pause")
            this.audio.play();
        } 
        else {
            this.playBtn.classList.add("fa-play")
            this.playBtn.classList.remove("fa-pause")
            this.audio.pause();
        }
    }
    
    initializePlayer()
    {
      let songId = window.location.href.split("=")[1];
      try{
        if(songId)
        {
          this.i = songId-1;
        }
        this.coverImage.src =  "music/"+this.music[this.i].art;
        this.audio.src = "music/"+this.music[this.i].audio;
        this.trackArtist.innerText = this.music[this.i].artist;
        this.trackTitle.innerText = this.music[this.i].title;
      }
      catch(e){
        console.log(e.message)
      }
    }

    updatePlayer()
    {
      this.coverImage.src =  "music/"+this.music[this.i].art;
      this.audio.src =  "music/"+this.music[this.i].audio;
      this.trackArtist.innerText = this.music[this.i].artist;
      this.trackTitle.innerText = this.music[this.i].title;
      this.togglePlayPause();
    }

    connectedCallback()
    {

      this.fetchData().then(() => {
        console.log(this.music);
        this.initializePlayer();
      })
      //Event Listeners
      this.nextBtn.addEventListener('click',()=>{
          this.i < this.music.length-1 ? this.i++ : this.i = 0;
          this.updatePlayer()
      })        
      this.prevBtn.addEventListener('click',()=>{
          this.i > 0 ? this.i-- : this.i =0;
          this.updatePlayer()
      })
      this.playBtn.addEventListener('click',()=>{
          this.togglePlayPause()
      })
    }

    fetchData() {
    return fetch('music/music.json')
      .then(response => response.json())
      .then(data => {
        this.music = data; // Assign the fetched data to the component's variable
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
}


const musicSlider = document.createElement('template');
musicSlider.innerHTML = `
  <link rel="stylesheet" href="css/style.min.css" />
  <style>
  .owl-stage{
    display:flex;
  }
  box{
    margin:0 2rem;
  }
  </style>
  <section class="music-slider col-12 py-3 mt-2">
    <h3 class="text-center text-primary mb-3">Top 100 Hits</h3>
    <div id="musicSlider" class="component-carousel owl-carousel">
    </div>
  </section>
`;

class MusicSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(musicSlider.content.cloneNode(true));

    // DOM Elements
    this.slider = this.shadowRoot.getElementById('musicSlider');

    // Local Variables
    this.music = [];
  }

  connectedCallback() {
    this.fetchData().then(() => {
      this.initiateSlider(this.music);
    });
  }

  initiateSlider(data) {
    // Load Music in the slider
    data.forEach(m => {
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = `
        <div class="box bg-secondary py-2 flex f-col ac jc" data-id="${m.id}">
          <img src="music/${m.art}" class="rounded" alt="" />
          <p class="text-light my-1">${m.artist}</p>
          <p class="text-primary m-0">${m.title}</p>
        </div>
      `;

      // Add click event listener to each item
      item.addEventListener('click', () => {
        // Retrieve the song ID
        const songId = item.firstElementChild.getAttribute('data-id');
        
        // Redirect to player.html with song ID as a query parameter
        window.location.href = `song.html?id=${songId}`;
      });

      this.slider.appendChild(item);
    })

    // Initialize Owl Carousel
    $(this.slider).owlCarousel({
      loop:true,
	    autoplay: true,
	    margin:30,
	    nav:false,
	    dots: false,
	    autoplayHoverPause: false,
	    pauseHoverPause: true,
	    responsive:{
	      0:{
	        items:2
	      },
	      600:{
	        items:2
	      },
	      1000:{
	        items:3
	      }
	    }
    });
  }

  fetchData() {
    return fetch('music/music.json')
      .then(response => response.json())
      .then(data => {
        this.music = data; // Assign the fetched data to the component's variable
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}

window.customElements.define('music-slider', MusicSlider);

window.customElements.define('audio-player',Player);
