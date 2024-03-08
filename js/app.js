const nav = document.querySelector('nav');

// Add a scroll event listener to the window
window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
    nav.classList.add('scrolled');
    } else {
    nav.classList.remove('scrolled');
    }
});

// ====== Active Navaigation ========
document.addEventListener('DOMContentLoaded', () => {
    // Get the current page URL
const currentUrl = window.location.href;
// Get all the navigation links
const navLinks = document.querySelectorAll('.items a');

// Loop through each link
navLinks.forEach(function(link) {
    // Check if the link href matches the current page URL
    if (link.href === currentUrl) {
        // Add a class to mark it as active
        link.classList.add('active');
    }
});
});
// ====== End Active Navaigation ========

document.addEventListener('DOMContentLoaded', () => {
    // === DropDown ===
    const dropdowns = [
        {
            button: document.getElementById('DropDow'), 
            icon: document.getElementById('Icon'),
            content: document.getElementById('Dropdown-Content'), 
            condition: false
        },
        {
            button: document.getElementById('dropdown1'), 
            icon: document.getElementById('icon1'),
            content: document.getElementById('dropdown-content1'), 
            condition: false
        },
        {
            button: document.getElementById('dropdown2'),
            icon: document.getElementById('icon2'),
            content: document.getElementById('dropdown-content2'),
            condition: false
        },
        {
            button: document.getElementById('dropdown3'),
            icon: document.getElementById('icon3'),
            content: document.getElementById('dropdown-content3'),
            condition: false
        }
    ];

    const closeDropdowns = () => {
        dropdowns.forEach(dropdown => {
            dropdown.content.style.display = 'none';
            dropdown.condition = false;
            dropdown.icon.innerHTML = `<span class="material-symbols-outlined">${dropdown.icon.getAttribute('data-icon')}</span>`;
        });
    };

    const dropDownDisplay = (dropdown) => {
        if (dropdown.condition) {
            dropdown.content.style.display = 'none';
            dropdown.condition = false;
            dropdown.icon.innerHTML = `<span class="material-symbols-outlined">${dropdown.icon.getAttribute('data-icon')}</span>`;
        } else {
            closeDropdowns();
            dropdown.content.style.display = 'block';
            dropdown.icon.innerHTML = `<span class="material-symbols-outlined">close</span>`;
            dropdown.condition = true;
        }
    };

    dropdowns.forEach(dropdown => {
        dropdown.icon.setAttribute('data-icon', dropdown.icon.innerText.trim()); // Store the original icon value
        dropdown.button.addEventListener('click', () => dropDownDisplay(dropdown));
    });
});

    // === Home ===
document.addEventListener('DOMContentLoaded', () => {
 const slides = document.querySelector(".slider").children;
 const prev = document.querySelector(".prev");
 const next = document.querySelector(".next");
 const indicator = document.querySelector(".indicator");
 let index = 0;


   prev.addEventListener("click",function(){
       prevSlide();
       updateCircleIndicator(); 
       resetTimer();
   })

   next.addEventListener("click",function(){
      nextSlide(); 
      updateCircleIndicator();
      resetTimer();
      
   })

   // create circle indicators
    function circleIndicator(){
        for(let i=0; i< slides.length; i++){
        	const div=document.createElement("div");
        	      div.innerHTML=i+1;
                div.setAttribute("onclick","indicateSlide(this)")
                div.id=i;
                if(i==0){
                	div.className="active";
                }
               indicator.appendChild(div);
        }
    }
    circleIndicator();

    function indicateSlide(element){
         index=element.id;
         changeSlide();
         updateCircleIndicator();
         resetTimer();
    }
     
    function updateCircleIndicator(){
    	for(let i=0; i<indicator.children.length; i++){
    		indicator.children[i].classList.remove("active");
    	}
    	indicator.children[index].classList.add("active");
    }

   function prevSlide(){
   	 if(index==0){
   	 	index=slides.length-1;
   	 }
   	 else{
index--;
}
changeSlide();
}

function nextSlide(){
    if(index==slides.length-1){
    index=0;
    }
    else{
    index++;
    }
    changeSlide();
}

function changeSlide(){
for(let i=0; i<slides.length; i++){
slides[i].classList.remove("active");}

    slides[index].classList.add("active");
}

function resetTimer(){
   	  // when click to indicator or controls button 
   	  // stop timer 
clearInterval(timer);
   	  // then started again timer
timer=setInterval(autoPlay,9000);
}


function autoPlay(){
    nextSlide();
    updateCircleIndicator();
}

let timer=setInterval(autoPlay,9000);
});
// ====== Home ======

        // === DropDown ===
document.addEventListener('DOMContentLoaded', () => {
    const openModal = () =>{
    document.getElementById('modal').style.opacity = '1';
    document.getElementById('overlay').style.opacity = '1';
    document.getElementById('modal').style.visibility = 'visible';
    document.getElementById('overlay').style.visibility = 'visible';
}
setTimeout(openModal, 100);

const closeModal = () =>{
    document.getElementById('modal').style.opacity = '0';
    document.getElementById('overlay').style.opacity = '0';
    document.getElementById('modal').style.visibility = 'hidden';
    document.getElementById('overlay').style.visibility = 'hidden';
    }
    setTimeout(closeModal, 100);

    const close = document.getElementById('CloseButton');
    const open = document.getElementById('openButton');

    close.addEventListener('click', closeModal);
    open.addEventListener('click', openModal);
});


// === Achievement ====
document.addEventListener('DOMContentLoaded', () => {
    const openModal1 = () =>{
    document.getElementById('modal1').style.opacity = '1';
    document.getElementById('overlay1').style.opacity = '1';
    document.getElementById('modal1').style.visibility = 'visible';
    document.getElementById('overlay1').style.visibility = 'visible';
}
setTimeout(openModal1, 1000);

const closeModal1 = () =>{
    document.getElementById('modal1').style.opacity = '0';
    document.getElementById('overlay1').style.opacity = '0';
    document.getElementById('modal1').style.visibility = 'hidden';
    document.getElementById('overlay1').style.visibility = 'hidden';
    }
    setTimeout(closeModal1, 1000);

    const close1 = document.getElementById('CloseButton1');
    const open1 = document.getElementById('openButton1');

    close1.addEventListener('click', closeModal1);
    open1.addEventListener('click', openModal1);
});
// === End Achievement ====



// ==== Achievement =====
// Get all elements with the class "counter"
const counters = document.querySelectorAll('.counter');
// Function to update the counter value sequentially
function updateCounter() {
  // Loop through each counter element
  counters.forEach(counter => {
    // Get the target value from the data-target attribute
    const target = +counter.getAttribute('data-target');
    // Get the current value
    let current = +counter.innerText;

    // Check if the current value is less than the target value
    if (current < target) {
      // Increment the current value by 1
      current++ ;
      // Update the counter value
      counter.innerText = current;
    }
  });

  setTimeout(updateCounter, 100); // Adjust the delay (in milliseconds) for speed control
}

setTimeout(updateCounter);


// ====== Customer Reviews =======
document.addEventListener('DOMContentLoaded', () => {
  
    //------ Slider Begin
      const CaroS = document.querySelector('.Carousel-slider');
      const CaroSlider = new MicroSlider(CaroS, { indicators: true, indicatorText: '' });
      const hammer = new Hammer(CaroS);
      const CaroSTimer = 2000;
      let CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);
      
    //------- Mouseenter Event
      CaroS.onmouseenter = function(e) {
          clearInterval(CaroAutoplay); 
          console.log(e.type + ' mouse detected');
      }
    
    //----- Mouseleave Event
      CaroS.onmouseleave = function(e) {
          clearInterval(CaroAutoplay); 
          CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);
          console.log(e.type + ' mouse detected');
      }
    
    //----- Mouseclick Event
      CaroS.onclick = function(e) {
          clearInterval(CaroAutoplay); 
          console.log(e.type + ' mouse detected');
      }
    
    //------ Gesture Tap Event
      hammer.on('tap', function(e) {
          clearInterval(CaroAutoplay);
          console.log(e.type + ' gesture detected');
      });
    
    //----- Gesture Swipe Event
      hammer.on('swipe', function(e) {
          clearInterval(CaroAutoplay); 
          CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);
          console.log(e.type + ' gesture detected');
      });
  
    let slideLink = document.querySelectorAll('.slider-item');
    if (slideLink && slideLink !== null && slideLink.length > 0){
      slideLink.forEach( el => el.addEventListener('click', e => {
        e.preventDefault();
        let href = el.dataset.href;
        let target = el.dataset.target;
        if (href !== '#') window.open(href, target);
      }));
    }
    
    //---- Slider End
    
  });
// ====== End Customer Reviews =======


