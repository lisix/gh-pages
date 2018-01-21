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
  
  var swiper_video = new Swiper('.swiper-video', {
    slidesOffsetBefore: 55,
    slidesOffsetAfter: 60,
    spaceBetween: 0,
    nextButton: '.swiper-button-next-video',
    prevButton: '.swiper-button-prev-video',
    slidesPerView: 'auto',
    onInit: function(s){
      if(s.slides.length < 5) {
        s.nextButton.children('span').hide(); s.prevButton.children('span').hide();
      }
    }
  });

  var swiper_model = new Swiper('.swiper-model', {
    slidesOffsetBefore: 45,
    slidesOffsetAfter: 45,
    spaceBetween: 0,
    nextButton: '.swiper-button-next-model',
    prevButton: '.swiper-button-prev-model',
    slidesPerView: 'auto',
    onInit: function(s){
      if(s.slides.length < 4) {
        s.nextButton.children('span').hide(); s.prevButton.children('span').hide();
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
  
  $(".link-nav").click(function (e) {
    e.preventDefault();
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
    return false;
  });
  
  
  /************Models *****************/
  
  $('.list-options li, .list-colors li').on('click', function(){
    $(this).siblings().removeClass('selected')
           .end().addClass('selected');
  });
  
  $('.swiper-model .swiper-slide').on('click', function(){
    $(this).siblings().removeClass('selected')
           .end().addClass('selected');
           
    if( $(this).hasClass('model-video')) {
      $(this).find('a').fancybox({
            fitToView: true,
            autoSize: true,
            closeClick: false,
            closeEffect: 'none',
            scrolling: 'visible',
            maxWidth: 800,
            maxHeight: 600
          });
    } else {
      var largeImage = $(this).attr('data-full');    
      $('.model-img img').hide()
                         .attr('src', largeImage)
                         .fadeIn();
    } 
  }); 

  $('.model-img img').on('click', function(){
    var modalImage = $(this).attr('src');
    $.fancybox.open(modalImage);
  });
  
  $('.show-more').on('click', function(e){ 
    e.preventDefault(); 
    
    $(this).parents('.model-mainfeat').find('.list-morefeat').show().end().end().hide(); 
  });
  
  $('.hide-more').on('click', function(e){ 
    e.preventDefault(); 
    
    var ofs = $(this).parents('.model-mainfeat').offset().top;
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: ofs - 350 }, 300);
    
    $(this).parents('.model-mainfeat').find('.show-more').show().end().end().parents('.list-morefeat').hide();     
  });
  
  $('.show-descr').on('click', function(e){ 
    e.preventDefault();    
    $(this).siblings('.hidden').removeClass('hidden').end().hide(); 
  });
  
  $('.hide-descr').on('click', function(e){ 
    e.preventDefault();     
    $(this).siblings('.all-descr').addClass('hidden').end()
           .siblings('.show-descr').show().end()
           .addClass('hidden'); 
  });
  
  
  /************Accordion*****************/
  $('.list-faq').accordion({
    tabClick: ".topwrap",
    tabContent: ".details", 
    accordAnimation: "200",  
    bodyAnimation: "600", 
    spaceTop: "0", 
    closeOther : true
  });
  
  $('ul.tabs-caption').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
  });
  
  
  $('.quadr-details').hover(
    function() { 
      $('.quadr-details').addClass('hover'); 
    }, 
    function() { 
      $('.quadr-details').removeClass('hover');
    });
  $('.quadr-details .i-info').hover(
    function() { 
      var prn = $(this).parents('.detail');
      $(this).css("opacity", "0");
      prn.addClass('hover').hide().stop().fadeIn(400);
    }, 
    function() { 
      $(this).parents('.detail').removeClass('hover').find('.i-info').css("opacity", "1");      
    });

  $('.swiper-video a').on('click', function(e) {
    e.preventDefault();    
    $('.swiper-video a').removeClass('active');  
    $(this).addClass('active');    
    $('.swiper-video-content').html('<iframe src="' + $(this).attr('href') + '" width="950" height="535"  frameborder="0" allowfullscreen></iframe>');
  });
  
  $('.list-mainfeat .i-info').hover(
    function() { 
      var el=$(this).data('full'), ofs=$(this).offset(); 
      $(this).addClass('hover');
      $('#'+el).stop().fadeIn('fast').offset({ top: ofs.top + 48, left: ofs.left - 145 }); 
    }, 
    function() { 
      var el=$(this).data('full'); 
      $('#'+el).stop().fadeOut('slow'); 
      $(this).removeClass('hover');
    });

  /************Forms*****************/
  $('.recall-btn').on('click', function(e){
    e.preventDefault();
    $(this).parents('.recall').find('.recall-form').show().end().end().hide();
  });
  
  $('.fixedform-link').on('click', function(e){
    e.preventDefault();
    $('#orderform').show();
  });
  
  $('.fixedform .btn-dlt, .fixedform-close').on('click', function(e){
    e.preventDefault();
    $('#orderform').hide();
  });
  
  $('.popup-link').fancybox({
    fitToView: true,
    autoSize: true,
    closeClick: false,
    closeEffect: 'none',
    scrolling: 'visible',
    maxWidth: 800,
    maxHeight: 600,
    beforeClose: function() {
      $('.fancybox-inner form').trigger('reset')
                               .find('.error-messages')
                               .hide();
      return true;
    }
  });
  
  $('.popup-close').on('click', function(e){
    e.preventDefault();
    $.fancybox.close();
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