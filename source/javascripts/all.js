// This is where it all goes :)

var $doc = $(document);


$doc.ready(function() {


  $('.tile-content').each (function() {
    var color = $(this).data('color');
    $(this).css({
      'color' : color
    });
  });

  $('.tile-bg').each( function(){
    var bgcolor = $(this).data('bgcolor');
    $(this).css({
      'background': bgcolor,
    });
  });

  $('.tile').mouseover( function(){
    $(this).addClass('expanded');
  }).mouseout( function(){
    $(this).removeClass('expanded');
  });


  $('.tile').each( function(){
    var lspacer = $(this).data('lspacer'),
    rspacer = $(this).data('rspacer');

    var spacer = $('<li />', { "class": 'spacer'});

    switch ($(this).data('lspacer')) {
      case 1:
      spacer.insertBefore( $( this ) );
      break;
      case 2:
      spacer.insertBefore( $( this ) ).clone().insertBefore( $( this ));
      break;
    }
  });

  function get_position(e) {
    var res = new Object();
    var pos = e.position();
    res.left = pos.left;
    res.top = pos.top;
    res.right =  res.left + e.width() - e.parent().width();
    res.bottom = res.top + e.height() - e.parent().height();
    return res;
  };

  $('.tile').each( function(){

    var leftpos = Math.round(get_position($(this)).left );
    var rightpos = Math.round(get_position($(this)).right );

    if(leftpos == 0 ) {
      $(this).addClass('leftmost');
    }

    if(rightpos == 0 ) {
      $(this).addClass('rightmost');
    }

    $(this).addClass('centermost');

  });



  $(function() {
    var tiles = $(".tiles > .tile");
    var interval = setInterval(function () {
      var ds = tiles.not(".flip");
      ds.eq(Math.floor(Math.random() * ds.length)).addClass('flip');
      if (ds.length == 1) {
        clearInterval(interval);
      }
    }, 70);
  });


  $(function() {
    var mInt;
    var mLink;
    var cCol = 0;
    var colors = document.querySelector(".logo").getAttribute("data-colorflip").split(";");
    $('.logo').hover(
      function () {
        mLink = $(this).find('#logo');
        mInt = setInterval(function(){mColor()},150);
      },
      function () {
        clearInterval(mInt);
        $('.logo').find('#logo').css('stroke','');
      });

      function mColor() {
        mLink.css('stroke', colors[cCol++]);
        if (cCol >= colors.length) {
          cCol = 0;
        }
      }
    });

    $(function() {
      var header = $('.navigation');
      var caseHeader = $('.case-header').outerHeight();
      var calcHeader = caseHeader - ( header.outerHeight() + header.position().top ) ;

      $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= calcHeader) {
          header.addClass('hidden');
        } else {
          header.removeClass('hidden');
        }
      });
    });

  });
