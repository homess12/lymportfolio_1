$(function() {
    $.scrollify({
        section:".pages > .page",
        updateHash: true,
        touchScroll: true,
        setHeights: false,
        before:function(i, panels) {
            var ref = panels[i].attr("data-section-name");
            $('.top-bar .menu-box-1 > ul > li').removeClass('active');
            $('.top-bar .menu-box-1 > ul > li.' + ref + '-menu-item').addClass('active');
            
            $(".pagination .active").removeClass("active");
            $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
            
            if ( ref != 'page-1' ) {
                setTimeout(function() {
                    $('.top-bar').addClass('hover');
                }, 600);
            }
            else {
                setTimeout(function() {
                    $('.top-bar').removeClass('hover');
                }, 600);
            }
        },
        afterRender:function() {
            var pagination = "<ul class=\"pagination\">";
            var activeClass = "";
            $(".pages > .page").each(function(i) {
                activeClass = "";
                if ( i === 0 ) {
                    activeClass = "active";
                }
                pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
            });

            pagination += "</ul>";

            $(".page-indicator-box").append(pagination);

            $(".pagination a").on("click", $.scrollify.move);
            $('.top-bar .menu-box-1 > ul > li > a').on("click", $.scrollify.move);
            $('.scroll-down-icon-box > a').on("click", $.scrollify.move);
        }
    });
});


Vue.component('progressbar', {
  template: `<div>
                <slot></slot>
                <progress :value="value" max="100"/>
              </div>`,
  props: {
    target: {
      type: Number
    }
  },
  data () {
    return {
      value: 0,
      interval: null
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.value++
    }, 10)
  },
  watch: {
    value (v) {
      if (v === this.target) {
        clearInterval(this.interval)
      }
    }
  }
})

new Vue({
  el: '.progressbar-container',
  components: ['progressbar'],
  data () {
    return {
      items: [
        {
          key: 'HTML/CSS',
          value: 75,
        },
        {
          key: 'JS',
          value: 50
        },
        {
          key: 'PHOTOSHOP',
          value: 70
        },
        {
          key: 'ILLUSTRATOR',
          value: 75
        },
        {
          key: 'ITQ',
          value: 60
        },    
      ]
    }
  }
})

$(document).ready(function() {
  var $slider = $('.slider');
  var $progressBar = $('.progress');
  var $progressBarLabel = $( '.slider__label' );
  
  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
    var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
    
    $progressBar
      .css('background-size', calc + '% 100%')
      .attr('aria-valuenow', calc );
    
    $progressBarLabel.text( calc + '% completed' );
  });
  
  $slider.slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 400
  });  
});