'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth Scrolling

btnScrollTo.addEventListener('click', () => {
  const s1Coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1Coords.left,
  //   top: s1Coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (link) {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const header = document.querySelector('.header');
const message = document.createElement('div');
const nav = document.querySelector('.nav');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

// creating and insert elements

message.classList.add('cookie-message');

message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn-close-cookie">Got it!</button>';

// header.before(message);
header.append(message);

document
  .querySelector('.btn-close-cookie')
  .addEventListener('click', () => message.remove());

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// tabs.forEach(tab => {
//   tab.addEventListener('click', () => console.log('tab'))
// })

// Event delegation
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  const tabNumber = clicked.dataset.tab;
  tabsContent.forEach(tabContent => {
    tabContent.classList.remove('operations__content--active');
  });

  const tab = document.querySelector(`.operations__content--${tabNumber}`);
  tab.classList.add('operations__content--active');
});

// Menu fade animation
const handleMenuFade = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const linkSiblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    linkSiblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleMenuFade.bind(0.5));
nav.addEventListener('mouseout', handleMenuFade.bind(1));

// Sticky navigation

// Bad for performance
// const section1Coords = section1.getBoundingClientRect();
// window.addEventListener('scroll', e => {
//   const currentScrollPosition = window.scrollY;

//   if (section1Coords.top < currentScrollPosition) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = entries => {
  const [entry] = entries;

  if (entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(stickyNav, observerOptions);

observer.observe(header);
