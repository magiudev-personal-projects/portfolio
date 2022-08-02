window.addEventListener("load", () => {
  
    /* NAV LINK ACTIVATION - START */
    // Get the sections and the nav inks
    const navLinks = document.querySelectorAll(".nav__link");
    const sections = [...document.querySelectorAll(".section")];
   
    // Create a function to admin the nav link activation
    function navlinkActivator() {
      
      // Retrieve the top y values of each section
      let sectionsYValues = sections.map(section => section.offsetTop);
      
      // Fill the nav status array according to the position
      let navStatus = sectionsYValues.map(function(value, index) {
        if (window.pageYOffset >= value) {
          if( index === sectionsYValues.length - 1) return true;
          if(window.pageYOffset < sectionsYValues[index + 1]) return true;
        }
        return false;
      })
      return navStatus;
    }
    
    // Call the nav link activator function on scroll
    window.addEventListener("scroll", () => {
      let status = navlinkActivator();
      
      // Admin the activate class according to the status array
      navLinks.forEach((navLink, index) => {
        if (status[index]) {
          navLink.classList.add("nav__link--active");
        } else {
          navLink.classList.remove("nav__link--active");
        }
      });
    });
    
    
    /* NAV LINK ACTIVATION - END*/
  
    /* PARALLAX SCROLL - START */
    
    // Get the sections
    const about = document.querySelector("#welcome-section");
    const contact = document.querySelector("#contact");
  
    // Get the presentation
    const presentation = document.querySelector(".presentation");
    
    // Get the images
    const cloudLeft = document.querySelector(".cloud--left");
    const cloudRight = document.querySelector(".cloud--right");
    const moon = document.querySelector(".moon");
    const astronaut = document.querySelector(".astronaut");
  
  
    // Create an observer to get the intersection ratio of the sections and change the position of the images according to it 
    const observer = new IntersectionObserver( sections => {
      sections.forEach(section => {
        
        // Get the class list of the sections to identify which section changed its intersection ratio
        const classList = [...section.target.classList];
        
        // Calculate the percentage of the section that is not visible
        const noVisibleRatio = Math.floor(100 - section.intersectionRatio * 100);
        
        // Check if the about section changed its intersection ratio 
        if (classList.includes("section__about")) {
          
          // Move left cloud
          cloudLeft.setAttribute("style", `transform: translate(-${50 + noVisibleRatio/2}%, ${50 + noVisibleRatio/3}%);`);
          
          // Move right cloud
          cloudRight.setAttribute("style", `transform: translate(${50 + noVisibleRatio/2}%, ${50 + noVisibleRatio/3}%);`);
          
          // Move presentation 
          presentation.setAttribute("style", `transform: translateY(${noVisibleRatio/3}%);`); 
          
          // Move moon
          moon.setAttribute("style", `transform: translateY(${noVisibleRatio/5}%);;`);
          
        // Check if the contact section changed its intersection ratio 
        } else if (classList.includes("section__contact")) {
          
          // Move astronaut
          astronaut.setAttribute("style", `transform: translateY(-${noVisibleRatio}%`);
        }
      });
    }, {
      threshold: [...Array(100).keys()].map(e => e/100)
    });
    
    observer.observe(about);
    observer.observe(contact);
  
    
    /* PARALLAX SCROLL - END */
  });