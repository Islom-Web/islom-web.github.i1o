$(document).ready(function(){
	$('.carousel__inner').slick({
		speed: 500,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
		responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
    breakpoint: 991,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      dots: true
    }
  }
]

   });

   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content')
      .removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


   function toggler(a) {
    $(a).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });

      
   }
   toggler('.catalog-item__link');
   toggler('.catalog-item__back');
  
   // Modal

   $('[data-modal="consultation"]').on('click', function() {
      $('.overlay, #consultation').fadeIn(500);
   });
   $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
   });
   $('.button_mini').on('click', function() {
      $('.overlay, #order').fadeIn(500);
   });

   $('.button_mini').each(function(i) {
      $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      });
   });

   
   function validateForms(form) {
    $(form).validate({
      rules: {
        name: 'required',
        phone: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста введите свое имя",
        phone: 'Пожалуйста введите свой номер',
        email: {
          required: "Плс введите свою почту",
          email: "Ты че, пёс"
        }
      }
     });
   }
   validateForms('#order form');
   validateForms('#consultation form');
   validateForms('#consultation-form');

   $('input[name=phone]').mask("+999 (99) 999-9999");

   $('form').submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function() {
      $(this).find('input').val('');

      $('form').trigger('reset');
    });
    return false;
   });

   // SMOOTH SCROLL

   $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();

        } else {
          $('.pageup').fadeOut();
        }
   });

   new WOW().init();
});

