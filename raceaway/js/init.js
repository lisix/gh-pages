$(document).ready(function () {
  /************Up/Down Navigation*********/
  
  $(".nav-link").click(function (e) {
    e.preventDefault(); $.fancybox.close();
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
    return false;
  });

  /***************Qty btns***************/

  $('.qty-plus, .qty-minus').click(function(e){
  
      e.preventDefault();
      
      var field = $(this).siblings('.qty-input'),
          curval = parseInt( field.val() );
          
      if (curval >= field.attr("max") && $(this).hasClass('qty-plus')) return false;
      
          var curprice = parseInt( $(this).parent().siblings('.price').data('price') ),
          amount = $(this).parents('.col4').find('.ticket-amount'),
          curamount = ( amount.length ) ? parseInt( amount.data('amount') ) : 0,
          total = ($(this).hasClass('qty-plus')) ? curamount + curprice : curamount - curprice,
          newval = ($(this).hasClass('qty-plus')) ? curval + 1 : curval - 1; 
          
      if (!isNaN( newval ) && newval > 0) {
        field.val( newval );
        if( amount.length && !isNaN( total ) ){
          amount.data( 'amount', total );
          amount.text( total + ' руб.' );
        }
      } else {
        field.val( 0 ); 
        if( amount.length && total >= 0 ){
          amount.data( 'amount', total );
          amount.text( total + ' руб.' );
        }
      }
  });

  $('.i-help').hover(function(e){
    $(this).siblings('.help-baloon').toggle();
  });
  
  $('video').click(function(e){
    $(this).get(0).paused ? $(this).get(0).play() : $(this).get(0).pause();
  });
  
  /************Forms*****************/
  
  $('.phone-input').inputmask({
    'mask': '+7-999-999-9999'
  });
  
  var fb_params = {
    fitToView: true,
    autoSize: true,
    closeClick: false,
    closeEffect: 'none',
    scrolling: 'visible',
    minWidth: 550,
    minHeight: 500
  };
  
  $('#eventform').on('submit', function(e){
    //e.preventDefault();
    $.fancybox.open( $('#eventscs'), fb_params );
  });

  $.validate({
    validateOnBlur: false,
    scrollToTopOnError: false,
    borderColorOnError: '#e75c43',
    onError: function($form){ },
    onSuccess: function($form){
      var idf = $form.attr('id'), 
          result = false, 
          amount = 0;
      switch(idf){
        case 'mainform': 
          $form.find('.ticket-amount').each(function(){
            amount += $(this).data('amount');
          }); 
          $form.find('input[name=total]').val(amount); 
          result = (amount > 0) ? true : false;
          break;
        case 'trackdform':
          amount = $form.find('.qty-input').val() * 3000; 
          $form.find('input[name=total]').val(amount);
          result = (amount > 0) ? true : false;
          break;
      }
      return result;
    }
  });
  
});