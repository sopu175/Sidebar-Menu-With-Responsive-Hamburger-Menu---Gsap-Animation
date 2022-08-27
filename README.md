# Sidebar-Menu-With-Responsive-Hamburger-Menu---Gsap-Animation


### Description
Sidebar Menu For Desktop and Mobile Hamrburge Menu With Gsap Animation and Also reduce height for mobile browser address bar extra height.


### Add Jquery cdn in footer
```<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="assets/lib/gsap/gsap.min.js" crossorigin="anonymous"></script>
<script src="assets/js/theme.js" crossorigin="anonymous"></script>
```

### Here is the html (you can find all html in index.html)
```
<!-- Navigation header start here  -->
      <header id="site_header">
         <div class="header_container">
            <div class="header_info">
               <img class="header_info__image" src="https://via.placeholder.com/80x80" alt="" />
               <h2 class="header_info__title">Kevin Mitnick</h2>
            </div>
            <div class="site_navbar">
               <ul id="site_navbar_main" class="site_navbar__list">
                  <li class="site_navbar__link"><a href="#about_me" class="active">About Me</a></li>
                  <li class="site_navbar__link"><a href="#resume">Resume</a></li>
                  <li class="site_navbar__link"><a href="#portfolio">Portfolio</a></li>
                  <li class="site_navbar__link"><a href="#blog">Blog</a></li>
                  <li class="site_navbar__link"><a href="#contact">Contact</a></li>
               </ul>
            </div>
            <div class="site_social_info">
               <ul class="site_social_main" id="site_social_main">
                  <li>
                     <a href="https://www.facebook.com/" target="_blank"
                        ><i class="fa-brands fa-facebook-messenger"></i
                     ></a>
                  </li>
                  <li>
                     <a href="https://www.instagram.com/" target="_blank"
                        ><i class="fa-brands fa-square-instagram"></i
                     ></a>
                  </li>
                  <li>
                     <a href="https://www.linkedin.com/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                  </li>
                  <li>
                     <a href="https://www.github.com/" target="_blank"><i class="fa-brands fa-github"></i></a>
                  </li>
               </ul>
            </div>
         </div>
      </header>
      <section class="mobile_navigation">
         <div class="container">
            <div class="row">
               <div class="mobile_logo">
                  <img class="mobile_logo__image" src="https://via.placeholder.com/80x80" alt="" />
                  <h2 class="mobile_logo__title">Kevin Mitnick</h2>
               </div>
               <div class="mobile_hamburger">
                  <div class="ham" id="mobile_hamburger">
                     <svg class="hamburger" viewBox="0 0 80 80">
                        <line class="line01" x1="0" y1="3" x2="80" y2="3" />
                        <line class="line02" x1="0" y1="40" x2="80" y2="40" />
                        <line class="line03" x1="0" y1="77" x2="80" y2="77" />
                     </svg>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <!-- For Mobile Navigaiton  -->
      
```

### Here is the Jquery (you can find all the code in global.js)
```
   // Header
   // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
   let vh = window.innerHeight * 0.01;
   // Then we set the value in the --vh custom property to the root of the document
   document.documentElement.style.setProperty("--vh", `${vh}px`);
   //Mobile Navigation Start
   if ($("#mobile_hamburger").length > 0) {
      if (windowWidth <= 992) {
         $("#mobile_hamburger").on("click", function (e) {
            $("#mobile_hamburger.active").not(this).removeClass("active");
            $(this).toggleClass("active");
            $("#site_header").toggleClass("active");
         });
         var $hamburger = $("#mobile_hamburger");

         gsap.set(".line01", { x: 40 });
         gsap.set(".line03", { x: -40 });
         gsap.set(".site_navbar__list li", { x: 0, opacity: 0 });
         gsap.set("#site_header", { x: -1000, opacity: 0 });

         var hamburgerMotion = gsap.timeline();
         hamburgerMotion.to(".line03", 0.4, { x: "-=40" }, 0);
         hamburgerMotion.to(".line01", 0.4, { x: "+=40" }, 0);
         hamburgerMotion.to("#site_header", 0.4, { x: 0, autoAlpha: 1 }, 0);
         hamburgerMotion.staggerTo(".site_navbar__list li", 0.4, { y: -30, opacity: 1, ease: "sine.out" }, 0.2, 0.5);
         hamburgerMotion.from(".getintouch", 0.8, { y: 30, opacity: 0, ease: "sine.out" });
         hamburgerMotion.reverse();

         $hamburger.on("click", function (e) {
            hamburgerMotion.reversed(!hamburgerMotion.reversed());
         });

         $(".site_navbar__link a").on("mouseover", function (e) {
            gsap.to($(this), 0.4, { "padding-left": "20px", ease: "sine.out" });
         });
         $(".site_navbar__link a").on("click", function (e) {
            e.preventDefault();

            hamburgerMotion.reversed(!hamburgerMotion.reversed());
            $("#mobile_hamburger.active").removeClass("active");

            const goTo = $(this).attr("href");
            hamburgerMotion.eventCallback("onReverseComplete", () => {
               window.location = goTo;
            });
         });
      }
   }
   //Mobile Navigation end
```

### Style (you can find the all the css style in style.scss file)
```
/* ------------------------------------------------------------- *
 * Header
/* ------------------------------------------------------------- */
header {
   position: fixed;
   left: 0;
   top: 0;
   bottom: 0;
   min-width: 20vw;
   height: 100vh; /* Fallback for browsers that do not support Custom Properties */
   height: calc(var(--vh, 1vh) * 100);
   background: $body_bg_color;
   transition: 0.7s all ease;
   .header_container {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
      .header_info {
         display: flex;
         flex-direction: column;
         align-items: center;
         margin: 20px 20px 0;
         &__image {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 25px;
            img {
               height: 80px;
               max-height: 80px;
               width: 80px;
            }
         }
         &__title {
            color: $hover;
            font-size: 20px;
            line-height: 24px;
            font-weight: 600;
         }
      }
      .site_navbar {
         ul {
            li {
               list-style: none;
               margin: 0 0 0;
               &:last-child {
                  margin: 0 0 0;
               }
               a {
                  color: white;
                  font-weight: 400;
                  display: block;
                  width: 100%;
                  position: relative;
                  padding: 10px 20px;
                  text-align: center;
                  position: relative;
                  text-decoration: none;
                  border-bottom: 1px solid rgba(245, 245, 245, 0.159);
                  outline: none;
                  &:hover {
                     color: $hover;
                  }
                  &::after {
                     display: block;
                     position: absolute;
                     right: 0px;
                     bottom: 0px;
                     content: "";
                     width: 2px;
                     height: 100%;
                     margin: 0px auto;
                     background-color: transparent;
                     transition: all 0.18s ease-out 0s;
                     visibility: hidden;
                     opacity: 0;
                  }
                  &.active {
                     color: $hover;
                     &::after {
                        background-color: $hover;
                        visibility: visible;
                        opacity: 1;
                     }
                  }
               }
            }
         }
      }
      .site_social_info {
         margin: 0px 20px 20px;

         ul {
            display: flex;
            justify-content: space-between;
            li {
               list-style: none;
               a {
                  i {
                     color: white;
                     font-size: 20px;
                     transition: 0.7s all ease-in;
                  }
                  &:hover {
                     i {
                        color: $hover;
                     }
                  }
               }
            }
         }
      }

      @media (max-width: 992px) {
         height: 80vh;
         overflow-y: scroll;
      }
   }

   @media (max-width: 992px) {
      min-width: 80%;
      top: 90px;
      height: calc(var(--vh, 1vh) * 100 - 90px);
      height: calc(100vh - 90px);
   }
}

// mobile navigation start
.mobile_navigation {
   padding: 20px 0;
   height: 90px;

   .container {
      .row {
         flex-direction: row;
         justify-content: space-between;
         flex-wrap: unset;
         margin: 0;
         .mobile_logo {
            display: flex;
            align-items: center;
            &__image {
               max-height: 50px;
               margin: 0 15px 0 0;
            }
            &__title {
               color: white;
               font-size: 20px;
               line-height: 24px;
               font-weight: 600;
            }
         }
         .mobile_hamburger {
            transition: all 0.2s ease;
            cursor: pointer;
            display: flex;
            align-items: center;
            overflow: hidden;
            .ham {
               display: flex;
               svg {
                  height: 30px;
                  width: 30px;
                  line {
                     stroke: white;
                     stroke-width: 6px;
                  }
               }
               &.active {
                  svg {
                     line {
                        stroke: $hover;
                     }
                  }
               }
            }
         }
      }
   }
   @media (min-width: 992px) {
      display: none;
   }
}

```




