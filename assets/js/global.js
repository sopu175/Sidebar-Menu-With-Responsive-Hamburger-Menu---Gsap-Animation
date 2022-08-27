/* =================================================================
* Template Master JS
* 
* Template:		Eilliot - Single Page Portfolio HTML Website Template
* Author:		Sopu
* URL:			https://sopu.live/
*
================================================================= */

/* Table of Content
====================
* Variable
* Light gallery
* Nice select
* Tab change in mobile using nice select
* Sticky menu
* Scroll to section
* Image preloader on slider
* Header
*/

$(document).ready(function () {
   // Variable all
   var windowWidth = $(window).width();
   var TM = TweenMax;
   var tl = new TimelineMax();
   console.log("Designed & Developed by Sopu");

   //------------ Light gallery
   if ($(".Light").length > 0) {
      $(".Light").lightGallery({
         selector: "a",
      });
   }

   //------------ Nice select
   if ($(".Select").length > 0) {
      $(".Select select").niceSelect();
   }

   //------------ Tab change in mobile using nice select
   $(".TabSelect").on("change", function (e) {
      $(".TabMenus li a").eq($(this).val()).tab("show");
   });

   // Sticky menu
   screenPosition = 0;
   $(window).scroll(function () {
      scrolled = $(window).scrollTop();
      if (screenPosition - scrolled > 0) {
         $("body").addClass("ShowIt");
      } else {
         $("body").removeClass("ShowIt");
      }
      screenPosition = scrolled;
   });
   var first_section = $("body").position().top + 250;
   $(window).scroll(function () {
      if ($(window).scrollTop() <= first_section) {
         $("body").removeClass("ShowIt");
      }
   });

   // Scroll to section
   $(".scroll-to").click(function () {
      if (
         location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
         location.hostname == this.hostname
      ) {
         var $target = $(this.hash);
         $target = ($target.length && $target) || $("[name=" + this.hash.slice(1) + "]");
         if ($target.length) {
            var targetOffset = $target.offset().top;
            $("html,body").animate({ scrollTop: targetOffset }, 1000);
            return false;
         }
      }
   });

   // Disable scroll
   $(".Overlay,.menuItems").bind("mousewheel DOMMouseScroll hover", function (e) {
      var scrollTo = null;

      if (e.type == "mousewheel") {
         scrollTo = e.originalEvent.wheelDelta * -1;
      } else if (e.type == "DOMMouseScroll") {
         scrollTo = 40 * e.originalEvent.detail;
      }

      if (scrollTo) {
         e.preventDefault();
         $(this).scrollTop(scrollTo + $(this).scrollTop());
      }
   });

   // Image preloader on slider
   $(".img-preload").length > 0 &&
      $(".img-preload").on("afterChange", function (event, slick, currentSlide) {
         imgPreloader();
      });

   //------------ message box end

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
}); //document.ready
