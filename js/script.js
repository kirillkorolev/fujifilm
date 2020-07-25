'use strict';

(function () {
  var process = document.querySelector('.process');
  var previousButton = process.querySelector('.js-process-previous-slide');
  var nextButton = process.querySelector('.js-process-next-slide');
  var slides = process.querySelectorAll('.process__slider-item');
  var dots = process.querySelectorAll('.procces__toggle-button');
  var dotsField = process.querySelector('.process__button-toggles-list');
  var currentSlide = 1;

  var header = document.querySelector('.page-header');
  var openMenuButton = header.querySelector('.js-open-menu');
  var service = document.querySelector('.service');
  var servicePreviousButton = service.querySelector('.js-advantages-previous-slide');
  var serviceNextButton = service.querySelector('.js-advantages-next-slide');
  var serviceSlides = service.querySelectorAll('.service__item');

  var successModal = document.querySelector('.success');
  var blackout = document.querySelector('.blackout');
  var htmlGlobal = document.querySelector('html');
  var bodyGlobal = document.querySelector('body');

  var ESC_KEYCODE = 27;

  var errors = {
    notext: 'не заполнено имя',
    nophone: 'не заполнен телефон',
    noconfirmation: 'подтвердите согласие'
  };

  var showBlackout = function () {
    if (blackout.classList.contains('blackout--hidden')) {
      blackout.classList.remove('blackout--hidden');
    }
  };

  var hideBlackout = function () {
    if (!blackout.classList.contains('blackout--hidden')) {
      blackout.classList.add('blackout--hidden');
    }
  };

  var blockBackground = function () {
    htmlGlobal.style.paddingLeft = '17px';
    bodyGlobal.style.overflow = 'hidden';
    bodyGlobal.style.touchAction = 'none';
  };

  var unBlockBackground = function () {
    htmlGlobal.style.paddingLeft = '';
    bodyGlobal.style.overflow = '';
    bodyGlobal.style.touchAction = '';
  };


  var closeSuccessModal = function () {
    if (!successModal.classList.contains('success--hidden')) {
      successModal.classList.add('success--hidden');
      unBlockBackground();
      hideBlackout();

      document.removeEventListener('keydwon', onMessageEscPress);
      blackout.addEventListener('click', closeSuccessModal);
    }
  };

  var onMessageEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccessModal();
    }
  };


  var openSuccessModal = function () {
    if (!header.classList.contains('page-header--menu-closed')) {
      header.classList.add('page-header--menu-closed');
    }

    if (successModal.classList.contains('success--hidden')) {
      successModal.classList.remove('success--hidden');
      blockBackground();
      showBlackout();

      blackout.addEventListener('click', closeSuccessModal);
      document.addEventListener('keydown', onMessageEscPress);
    }
  };

  successModal.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('js-close-succes') || target.classList.contains('js-ok-success')) {
      closeSuccessModal();
    }
  });

  var validatePhone = function (input, errorClass, errorBounceClass) {
    var phone = input.value;
    var regEx = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    if (regEx.test(phone) === false) {
      input.setCustomValidity(errors.nophone);

      if (!input.classList.contains(errorClass)) {
        input.classList.add(errorClass);
      }

      input.classList.add(errorBounceClass);
      setTimeout(function () {
        resetErrorOnInput(input, errorBounceClass);
      }, 1500);

      return false;
    } else {
      input.setCustomValidity('');
      if (input.classList.contains(errorClass)) {
        input.classList.remove(errorClass);
      }
      return true;
    }
  };

  var validateText = function (input, errorClass, errorBounceClass) {
    var name = input.value;

    if (!name) {
      input.setCustomValidity(errors.notext);

      if (!input.classList.contains(errorClass)) {
        input.classList.add(errorClass);
      }

      input.classList.add(errorBounceClass);
      setTimeout(function () {
        resetErrorOnInput(input, errorBounceClass);
      }, 1500);

      return false;
    } else {
      input.setCustomValidity('');
      if (input.classList.contains(errorClass)) {
        input.classList.remove(errorClass);
      }
      return true;
    }
  };

  var validateCheckbox = function (check, errorClass) {
    if (check.checked === false) {
      check.setCustomValidity(errors.noconfirmation);
      check.classList.add(errorClass);
      return false;
    } else {
      check.setCustomValidity('');
      if (check.classList.contains(errorClass)) {
        check.classList.remove(errorClass);
      }
      return true;
    }
  };

  var resetErrorOnInput = function (input, errorClass) {
    if (input.classList.contains(errorClass)) {
      input.classList.remove(errorClass);
    }
  };


  var promotionForm = document.querySelector('.promotion__form');
  var promotionFormButton = promotionForm.querySelector('.js-promotion-submit-button');
  var promotionPhoneInput = promotionForm.querySelector('#promotion-phone');

  var requestForm = document.querySelector('.request__form');
  var requestNameInput = requestForm.querySelector('#request-name');
  var requestPhoneInput = requestForm.querySelector('#request-number');
  var requestFormButton = requestForm.querySelector('.js-request-submit-button');

  var consultationForm = document.querySelector('.consultation__form');
  var consultationNameInput = consultationForm.querySelector('#consultation-name');
  var consultationPhoneInput = consultationForm.querySelector('#consultation-phone');
  var consultationTextarea = consultationForm.querySelector('.consultation__textarea');
  var consultationSubmitButton = consultationForm.querySelector('.js-consultation-submit-button');

  var consultationCheckbox = consultationForm.querySelector('#consultation-confirm');

  promotionFormButton.addEventListener('click', function (evt) {
    if (validatePhone(promotionPhoneInput, 'promotion__input--error', 'promotion__input--bounce')) {

      evt.preventDefault();

      openSuccessModal();

      resetErrorOnInput(promotionPhoneInput, 'promotion__input--error');
      promotionPhoneInput.value = '';
    }
  });

  requestFormButton.addEventListener('click', function (evt) {
    if (validateText(requestNameInput, 'request__input--error', 'request__input--bounce') && validatePhone(requestPhoneInput, 'request__input--error', 'request__input--bounce')) {
      evt.preventDefault();
      openSuccessModal();

      resetErrorOnInput(requestNameInput, 'request__input--error');
      resetErrorOnInput(requestPhoneInput, 'request__input--error');

      requestPhoneInput.value = '';
      requestNameInput.value = '';
    }
  });

  consultationSubmitButton.addEventListener('click', function (evt) {
    if (validateText(consultationNameInput, 'consultation__input--error', 'consultation__input--bounce') && validatePhone(consultationPhoneInput, 'consultation__input--error', 'consultation__input--bounce') && validateText(consultationTextarea, 'consultation__textarea--error', 'consultation__textarea--bounce') && validateCheckbox(consultationCheckbox, 'consultation__checkbox-input--error')) {

      evt.preventDefault();
      openSuccessModal();

      resetErrorOnInput(consultationNameInput, 'consultation__input--error');
      resetErrorOnInput(consultationPhoneInput, 'consultation__input--error');
      resetErrorOnInput(consultationTextarea, 'consultation__textarea--error');
      resetErrorOnInput(consultationCheckbox, 'consultation__checkbox-input--error');

      consultationNameInput.value = '';
      consultationPhoneInput.value = '';
      consultationTextarea.value = '';
      consultationCheckbox.checked = false;
    }
  });

  openMenuButton.addEventListener('click', function () {
    header.classList.toggle('page-header--menu-closed');
  });

  var showServiceSlides = function (n) {
    serviceSlides[currentSlide].classList.remove('service__item--showing-slide');
    currentSlide = (n + serviceSlides.length) % serviceSlides.length;
    serviceSlides[currentSlide].classList.add('service__item--showing-slide');
  };

  servicePreviousButton.addEventListener('click', function () {
    showServiceSlides(currentSlide - 1);
  });

  serviceNextButton.addEventListener('click', function () {
    showServiceSlides(currentSlide + 1);
  });

  var showSlides = function (n) {
    slides[currentSlide].classList.remove('process__slider-item--showing-slide');
    dots[currentSlide].classList.remove('procces__toggle-button--active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('process__slider-item--showing-slide');
    dots[currentSlide].classList.add('procces__toggle-button--active');
  };

  previousButton.addEventListener('click', function () {
    showSlides(currentSlide - 1);
  });

  nextButton.addEventListener('click', function () {
    showSlides(currentSlide + 1);
  });

  dotsField.addEventListener('click', function (evt) {
    var activeDot = dotsField.querySelector('.procces__toggle-button--active');

    var target = evt.target.closest('.procces__toggle-button');

    if (
      !target.classList.contains('procces__toggle-button--active') &&
      target.classList.contains('procces__toggle-button')
    ) {
      var id = target.id.slice(4);
      activeDot.classList.remove('procces__toggle-button--active');
      dots[id - 1].classList.add('procces__toggle-button--active');
      showSlides(id - 1);
    }
  });
})();
