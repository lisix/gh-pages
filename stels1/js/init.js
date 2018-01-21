$(document).ready(function () {
  /************Carousel*****************/
  var swiper = new Swiper('.swiper-main', {
    pagination: '.swiper-pagination-main',
    nextButton: '.swiper-button-next-main',
    prevButton: '.swiper-button-prev-main',
    paginationClickable: true,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: 3500,    
    autoHeight: false,
    loop: true,
    autoplayDisableOnInteraction: false
  });

  var swiper_models = new Swiper('.swiper-models', {
    slidesOffsetAfter: 100,
    spaceBetween: 0,
    nextButton: '.swiper-button-next-models',
    prevButton: '.swiper-button-prev-models',
    slidesPerView: 'auto',
    onInit: function(s){
      if(s.slides.length > 5) {
        s.nextButton.children('span').show(); s.prevButton.children('span').show();
      }
    }
  });

  var swiper_about = new Swiper('.swiper-about', {
    slidesOffsetAfter: 100,
    spaceBetween: 0,
    nextButton: '.swiper-button-next-about',
    prevButton: '.swiper-button-prev-about',
    slidesPerView: 'auto',
    onInit: function(s){
      if(s.slides.length > 3) {
        s.nextButton.children('span').show(); s.prevButton.children('span').show();
      }
    }
  });

  /************Up/Down Navigation*****************/
  $.goup({
    containerClass: 'btn-2top',
    arrowClass: 'arr-2top',
    locationOffset: 60,
    bottomOffset: 60
  });
  
  $(".topmenu a").click(function (e) {
    e.preventDefault();
    var elementClick = $(this).attr("href")
    var destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
    return false;
  });
  
  
  /************Model Gallery*****************/
  $('.model-gallery li').on('click', function(){
    $('.model-gallery .selected').removeClass('selected');
    var largeImage = $(this).attr('data-full')
    $(this).addClass('selected');
    $('.model-img img').hide()
                       .attr('src', largeImage)
                       .fadeIn();
  }); 

  $('.model-img img').on('click', function(){
    var modalImage = $(this).attr('src');
    $.fancybox.open(modalImage);
  });

  $('.colorpicker li').on('click', function(){
    $('.colorpicker .selected').removeClass('selected');
    $(this).addClass('selected');
  });
  
  $('.swiper-models .swiper-slide').on('click', function(e){
    e.preventDefault();
    $('.swiper-models .selected').removeClass('selected');
    $(this).addClass('selected');
  });

  if( $("#more-details").length ) {
    $('#show-more').show().on('click', function(e){
      e.preventDefault();
      var btn = $(this);
      $('#more-details').toggle('fast', function(){
        switch( btn.text() ){
          case 'Все характеристики': btn.text('Скрыть'); break;
          default: btn.text('Все характеристики');
        }
      });      
    });
  }
  
  /************Accordion*****************/
  $('.list-faq').accordion({
    tabClick: ".topwrap",
    tabContent: ".details", 
    accordAnimation: "200",  
    bodyAnimation: "600", 
    spaceTop: "0", 
    closeOther : true
  });

  /************Timer*****************/  
  $('#countdown_dashboard').countDown({
    targetDate: {
      'day': 		25,
      'month': 	2,
      'year': 	2016,
      'hour': 	11,
      'min': 		0,
      'sec': 		0
    }, 
    omitWeeks: true
  });

  /************Forms*****************/
  $('.recall-btn').on('click', function(e){
    e.preventDefault();
    $(this).parents('.recall').find('.recall-form').show().end().end().hide();
  });
  
  $('.popup-link').fancybox({
    fitToView: true,
    autoSize: true,
    closeClick: false,
    closeEffect: 'none',
    scrolling: 'visible',
    beforeLoad: function() {         
      if ($(this.element).hasClass('popup-wide') ) {
        this.maxWidth  = 1100;
        this.maxHeight = 670;
        this.scrolling = 'auto';
      } else if ($(this.element).hasClass('popup-video') ) {
        this.maxWidth  = 800;
        this.maxHeight = 460;
      } else {
        this.maxWidth  = 335;
        this.maxHeight = 600;
        this.minWidth  = 335;
        this.minHeight = 400;
      }
    },
    beforeClose: function() {
      $('.fancybox-inner form').trigger('reset')
                               .find('.error-messages')
                               .hide();
      return true;
    }
  });

  $('.input-phone').inputmask({
    'mask': '+7-999-999-9999'
  }); 

  $.validate({
    validateOnBlur: false,
    scrollToTopOnError: false,
    borderColorOnError: '#e75c43',
    onError: function($form) {
      $form.find('.error-messages')
           .text('Пожалуйста, заполните обязательные поля')
           .addClass('has-error');
    },
    onSuccess: function($form) { 
      $form.find('.error-messages')
           .hide();
      return false;
      //$form.submit();
    }
  });
});


/************YMap*****************/

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map('map', {
    center: [55.707939, 37.393424],
    zoom: 15,
    controls: []
  });
  var pointer = new ymaps.Placemark([55.706291, 37.404368], {
      hintContent: '',
      balloonContent: ''
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'images/ymap/map-bubble.png',
      iconImageSize: [45, 57],
      iconImageOffset: [-15, -50]
    });
  var mark01 = new ymaps.Placemark([55.701505, 37.396622], {
      hintContent: '',
      balloonContent: ''
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'images/ymap/map-label01.png',
      iconImageSize: [82, 74],
      iconImageOffset: [-60, -30]
    });
  var mark02 = new ymaps.Placemark([55.714622, 37.381708], {
      hintContent: '',
      balloonContent: ''
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'images/ymap/map-label02.png',
      iconImageSize: [82, 74],
      iconImageOffset: [-50, -30]
    });

  var poly01 = new ymaps.Polyline([
      [55.71264,37.386258],
      [55.709272,37.388876],
      [55.700669,37.400334],
      [55.70033,37.39939],
      [55.701178,37.398231],
      [55.702414,37.399862]
    ], {
      balloonContent: ""
    }, {
        balloonCloseButton: false,
      strokeColor: "#1687d7",
      strokeWidth: 5,
      strokeOpacity: 0.8
    });
  var poly02 = new ymaps.Polyline([
      [55.699215,37.402823],
      [55.701081,37.400248],
      [55.701929,37.400678],
      [55.702535,37.399991],
      [55.705346,37.402351],
      [55.705128,37.403252],
      [55.705807,37.403853]
    ], {
      balloonContent: ""
    }, {
        balloonCloseButton: false,
      strokeColor: "#333333",
      strokeWidth: 5,
      strokeOpacity: 0.8
    });
  var poly03 = new ymaps.Polyline([
      [55.718236,37.412565],
      [55.716249,37.401836],
      [55.709514,37.405441],
      [55.705613,37.402351],
      [55.705371,37.40321]
    ], {
      balloonContent: ""
    }, {
        balloonCloseButton: false,
      strokeColor: "#ca503b",
      strokeWidth: 5,
      strokeOpacity: 0.8
    });
    
  myMap.behaviors.disable('scrollZoom');
  
  myMap.geoObjects
    .add(poly01)
    .add(poly02)
    .add(poly03)
    .add(pointer)
    .add(mark01)
    .add(mark02);
}