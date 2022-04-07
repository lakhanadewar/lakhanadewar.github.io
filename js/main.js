function uikitHambNav(offset) {
  const nav = document.querySelector('.hamburger');
  window.addEventListener("scroll", navScroll);

  function navScroll() {

    if (pageYOffset > offset) {
      nav.classList.add("btn-scroll-bg");
      nav.firstChild.classList.add('hamb-active');
    } else {
      nav.classList.remove("btn-scroll-bg");
      nav.firstChild.classList.remove('hamb-active');
    }
  } 
}

//uikitHambNav(300);
/*====================================================*/ 
/*====================================================*/ 
/*====================================================*/

function masonryImageVideoGallery(maxThumbnailHeight, minThumbnailHeight) {

  const parent = document.querySelectorAll('.uikit-masonry-image-vid-gallery');

  for (let i = 0; i < parent.length; i++) {
    const imageCountainer = parent[i].querySelectorAll('.item');
    const thumbnail = parent[i].getElementsByClassName('img');
    const imgsContainer = parent[i].querySelector('.images-container');

    let margin = window.getComputedStyle(imgsContainer);
    let imgsContainerHeight = parseInt(margin.getPropertyValue('height')) - maxThumbnailHeight;
    parent[i].style.height = imgsContainerHeight;
    console.log(parent[i].style.height = imgsContainerHeight);

    //Set the play button icon for every video item
    for (let i = 0; i < thumbnail.length; i++) {
      if (imageCountainer[i].firstChild.hasAttribute('data-source')) {
        imageCountainer[i].innerHTML += `<div class="play-icon">
      <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
      </svg>
    </div>`;
      }
      //Dynamic thumbnail width and height
      //Set container width to its image width
      //Set dynamic heights depending on original image height
      //Set maximum height for image
      
      const thumbnailRatio = Math.floor(Math.random() * (maxThumbnailHeight - minThumbnailHeight + 1)) + minThumbnailHeight;

			imageCountainer[i].style.height = thumbnailRatio + 'em';
			imageCountainer[i].style.maxHeight = maxThumbnailHeight + 'em';
    }

    //MASONRY GRID CALCULATION
    function grid(width) {
      let margin = window.getComputedStyle(imageCountainer[0]);
      let counter = 0;
      for (let i = width; i < imageCountainer.length; i++) {

        let imageHeight = imageCountainer[counter].offsetHeight / 16;
        let imageMargin = parseInt(margin.getPropertyValue('margin')) / 16;
        imageCountainer[i].style.bottom = ((imageCountainer[i].offsetTop / 16) - (imageHeight + imageMargin)) - imageCountainer[counter].offsetTop / 16 + 'em';
        counter++;
      }
    }

    //RESET THUMBNAIL POSITION
    function bottomNull(width) {
      for (let i = width; i < imageCountainer.length; i++) {
        imageCountainer[i].style.bottom = 0;
      }
    }

    //MEDIA QUERIES For The Grid
    const mediaQuery = window.matchMedia("screen and (max-width: 1099px) and (min-width: 730px");

    function resize(e) {
      if (e.matches) {
        bottomNull(0);
        grid(2);
      }
    }

    mediaQuery.addListener(resize);
    resize(mediaQuery);
    /*=====================================*/
    const mediaQuery2 = window.matchMedia("screen and (min-width: 1100px)");

    function resize2(e) {
      if (e.matches) {
        bottomNull(0);
        grid(3);
      }
    }
    /*=====================================*/
    mediaQuery2.addListener(resize2);
    resize(mediaQuery2);

    const mediaQuery3 = window.matchMedia("screen and (max-width: 729px)");

    function resize3(e) {
      if (e.matches) {
        bottomNull(0);
      }
    }

    mediaQuery3.addListener(resize3);
    resize(mediaQuery3);


    if (window.matchMedia("(min-width: 1100px)").matches) {
      bottomNull(0);
      grid(3);
    } else if (window.matchMedia("(max-width: 729px)").matches) {
      bottomNull(0);
    }

    const btn = parent[i].querySelectorAll('.img');
    const vidCloseBtn = parent[i].querySelector('.vid-close-btn');
    const vidOverlay = parent[i].querySelector('.vid-modal-overlay');
    const vidModal = parent[i].querySelector('.vid-modal');
    const vidTitle = parent[i].querySelector('.vid-title');
    const arrowLeft = parent[i].querySelector('.arrow-left');
    const arrowRight = parent[i].querySelector('.arrow-right');
    const vidImgContainer = parent[i].querySelector('.vid-img-container');

    //Loop trough buttons
    let id = 0;
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', vidModalOpen);
      btn[i].setAttribute('data-id', id++);
    }

    let title = '';

    function vidModalOpen(e) {
      //Setup array for looping trough the videos
      let arr = btn.length;
      arr = e.target.getAttribute('data-id');

      //Set modal video/image src to clicked element data source
      if (e.target.hasAttribute('data-source')) {
        vidImgContainer.innerHTML = `<video src="${e.target.dataset.source}" controls></video>`;
        vidImgContainer.firstChild.play();
        title = e.target.dataset.title;
      } else {
        vidImgContainer.innerHTML = `<img src="${e.target.src}">`;
        title = e.target.dataset.title
      }

      let vid = vidImgContainer.firstChild;
      //Set video title, cut out the extention
      vidTitle.innerHTML = title;
      //Display the modal
      vidOverlay.style.display = 'flex';
      setTimeout(function () {
        vidOverlay.style.opacity = 1;
      }, 100);
      //Add modal animation
      setTimeout(function () {
        vidModal.style.transform = 'translateY(0)';
      }, 200);
      //Next video/image function
      function nextVid() {
        arr++;
        if (arr > btn.length - 1) {
          arr = 0;
        }
        if (btn[arr].hasAttribute('data-source')) {
          vidImgContainer.innerHTML = `<video src="${btn[arr].dataset.source}" controls autoplay></video>`;
          vid.src = btn[arr].dataset.source;
        } else {
          vidImgContainer.innerHTML = `<img src="${btn[arr].src}">`;
          vid.src = btn[arr].src;
        }
        //change video title
        title = btn[arr].dataset.title;
        vidTitle.innerHTML = title;
      }
      //Previous video/image function
      function previousVid() {
        arr--;
        if (arr < 0) {
          arr = btn.length - 1;
        }
        if (btn[arr].hasAttribute('data-source')) {
          vidImgContainer.innerHTML = `<video src="${btn[arr].dataset.source}" controls autoplay></video>`;
          vid.src = btn[arr].dataset.source;
        } else {
          vidImgContainer.innerHTML = `<img src="${btn[arr].src}">`;
          vid.src = btn[arr].src;
        }
        //change video title
        title = btn[arr].dataset.title;
        vidTitle.innerHTML = title;
      }
      //Scroll trough videos with arrow icons
      arrowLeft.addEventListener('click', previousVid);
      arrowRight.addEventListener('click', nextVid);
      //Scroll trough videos with the left and right arrow keys
      document.addEventListener('keydown', function (e) {
        if (e.keyCode == 39) {
          nextVid();
        } else if (e.keyCode == 37) {
          previousVid();
        } else if (e.keyCode == 27) {
          vidModalClose();
        }
      });
      //Close the modal when 'x' button is pressed and pause the video
      vidCloseBtn.addEventListener('click', vidModalClose);

      function vidModalClose() {
        vidOverlay.style.opacity = 0;
        setTimeout(function () {
          vidOverlay.style.display = 'none';
        }, 400);
        setTimeout(function () {
          vidModal.style.transform = 'translateY(-10em)';
        }, 200);

        if (btn[arr].hasAttribute('data-source')) {
          vidImgContainer.innerHTML = '';
        }
      };
      //Move to next video when current video finishes
      vid.addEventListener('ended', nextVid);
      //Close the modal when the modal overlay is clicked
      window.addEventListener('click', function (e) {
        if (e.target == vidOverlay) {
          vidModalClose();
        }
      });
    }

  }
}

//masonryImageVideoGallery(36, 16);
/*==============================================*/ 
/*==============================================*/ 
/*==============================================*/
function uiKitProgressCirclesTwo(speed) {
  const parent = document.querySelectorAll(".uikit-progress-circles-2");

  for (let i = 0; i < parent.length; i++) {
    const progText = parent[i].querySelectorAll(".progText");
    const progress = parent[i].querySelectorAll(".progress");
    const progContainer = parent[i].querySelector(".progress-container");

    let bol = false;

    window.addEventListener("scroll", function () {
      if (pageYOffset > progContainer.offsetTop - 600 && bol === false) {
        //Select All Circles
        for (let i = 0; i < progText.length; i++) {
          progText[i].innerText = 0;
          count = 0;

          progress[i].style.transition = `bottom ${speed * 50}ms`;

          //Dynamic Fill Animation depending on percetage
          progress[i].style.bottom = "100%";
          progress[i].style.bottom = progText[i].dataset.count - 100 + "%";

          //Function for counting up
          function updateCount() {
            target = parseInt(progText[i].dataset.count);

            if (count < target) {
              count++;
              progText[i].innerText = count;
              setTimeout(updateCount, speed); /*Count Speed*/
            } else {
              progText[i].innerText = target + "%";
            }
          }
          updateCount();
          bol = true; /*Onscroll function runs only once when condition is met*/
        }
      }
    });
  }
}

//uiKitProgressCirclesTwo(50);
//Count speed, 50 recommended
/*==============================================*/ 
/*==============================================*/ 
/*==============================================*/
function uiKitSplitScreen1() {
  document.addEventListener('DOMContentLoaded', function() {
  const wrapper = document.querySelectorAll('.uikit-split-screen-1');

  for (let i = 0; i < wrapper.length; i++) {
    const topLayer = wrapper[i].querySelector('.left');
    const handle = wrapper[i].querySelector('.handle');
    let skew = 0;
    let delta = 0;
  
    if(wrapper[i].className.indexOf('uikit-split-screen-1') != -1) {
      skew = 1000;
    }
    
    wrapper[i].addEventListener('mousemove', function(e) {
      delta = (e.clientX - window.innerWidth / 2) * 0.5;
    
      handle.style.left = e.clientX + delta + 'px';
  
      topLayer.style.width = e.clientX + skew + delta + 'px';
    }); 
  }
});
}

//uiKitSplitScreen1();









