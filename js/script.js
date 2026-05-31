document.addEventListener('DOMContentLoaded', function () {

  var header = document.querySelector('.header');
  var isInteriorPage = !!document.querySelector('.page-header');

  // --- Header scroll effect ---
  if (!isInteriorPage) {
    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset;
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Mobile menu ---
  var mobileToggle = document.querySelector('.mobile-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileOverlay = document.querySelector('.mobile-overlay');
  var mobileClose = document.querySelector('.mobile-nav-close');
  var mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  function openMobile() {
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) { mobileToggle.addEventListener('click', openMobile); }
  if (mobileClose) { mobileClose.addEventListener('click', closeMobile); }
  if (mobileOverlay) { mobileOverlay.addEventListener('click', closeMobile); }

  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', closeMobile);
  }

  // --- Scroll animations ---
  var animateElements = document.querySelectorAll('.animate');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('visible');
          observer.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    for (var i = 0; i < animateElements.length; i++) {
      observer.observe(animateElements[i]);
    }
  } else {
    for (var i = 0; i < animateElements.length; i++) {
      animateElements[i].classList.add('visible');
    }
  }

  // --- Form handling ---
  var form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !phone || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      var whatsappNumber = '+916381649243';
      var rawText = 'Hello TYM Electricals & Hardware, I would like to enquire:\n\n'
        + 'Name: ' + name + '\n'
        + 'Phone: ' + phone + '\n'
        + 'Message: ' + message;

      window.open('https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(rawText), '_blank');
    });
  }
});
