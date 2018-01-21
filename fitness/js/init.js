$(document).ready(function () {
  /************Up/Down Navigation*********/
  
  $(".nav-link").click(function (e) {
    if( $(this).hasClass('popup-link') ) return;
    
    e.preventDefault(); 
    $.fancybox.close();
    
    var elementClick = $(this).attr("href"), 
        destination = $(elementClick).offset().top -40;
        
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
    
    return false;
  });
  
  
  

  /************Swiper*****************/
  var swiper = new Swiper('.swiper-main', {
    pagination: '.swiper-pagination-main',
    nextButton: '.swiper-button-next-main',
    prevButton: '.swiper-button-prev-main',
    paginationClickable: true,
    spaceBetween: 0,
    centeredSlides: true,    
    autoHeight: false,
    autoplay: 2500,
    loop: true,
    autoplayDisableOnInteraction: false
  });

  var swiper_team = new Swiper('.swiper-team', {
    slidesPerView: 4,
    loop: true,
    nextButton: '.swiper-button-next-team',
    prevButton: '.swiper-button-prev-team',
    slidesPerView: 'auto'
  });
  
  /**********************************/
  $('.list-program li').hover(
    function(){ $(this).find('.text-main').hide().end().find('.text-hover').show(); },
    function(){ $(this).find('.text-hover').hide().end().find('.text-main').show(); }
  );
  
  $('.swiper-team .slide-description').hover(
    function(){ $(this).find('.descr').show(); },
    function(){ $(this).find('.descr').hide(); }
  );
  
  
  /************Forms*****************/
  
  $('.popup-link').fancybox({
    fitToView: true,
    autoSize: true,
    closeClick: false,
    closeEffect: 'none',
    scrolling: 'visible',
    minWidth: 460,
    beforeClose: function() {
      $('.fancybox-inner form').trigger('reset')
                               .find('.error-messages')
                               .hide();
      return true;
    }
  });
  
  $('.phone-input').inputmask({
    'mask': '+7-999-999-9999'
  });
  
  var fb_params = {
    fitToView: true,
    autoSize: true,
    closeClick: false,
    closeEffect: 'none',
    scrolling: 'visible',
    closeBtn: false,
    maxWidth: 460
  };

  $.validate({
    validateOnBlur: false,
    scrollToTopOnError: false,
    borderColorOnError: '#e30f3c',
    onError: function($form){
    
      var idf = $form.attr('id');
      
      switch(idf){
        case 'offer':
          $.fancybox.open( $('#error-message'), fb_params );
          break;
      }
      return false;
    },
    onSuccess: function($form){
    
      var idf = $form.attr('id');
      
      switch(idf){
        case 'cform':
        case 'offer':
          $.fancybox.open( $('#success-message'), fb_params );
          break;
        case 'buyform':
          $.fancybox.open( $('#success-recall'), fb_params );
          break;
        case 'freevisit':
          $.fancybox.open( $('#success-visit'), fb_params );
          break;
      }
      return false;
    }
  });
  
  $(document).on('click', '.message-form .btn-close', function() {
    $.fancybox.close();
  });
  
});