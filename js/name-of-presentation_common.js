var clickEvent = ('ontouchstart' in window ? 'touchend' : 'click');
var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|Android)/i) != null;
var mdown = "mousedown";
var mmove = "mousemove";
var mup = "mouseup";
if (isMobile) {
    mdown = "touchstart";
    mmove = "touchmove";
    mup = "touchend";
}

var press = false;
$(function() {
    setTimeout(function() {
        $('.slide').removeClass('hide').addClass('visible');
    }, 100);

    $(".links").on(mup, function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
    });
});

(function() {
    $(document).bind('touchmove', function(e) {
        return e.preventDefault();
    });

    CommunicateEmbedded.ready(function() {
        $.getJSON('structure.json', function(data) {
            var astellasFooter = new AstellasFooter({
                json: data,
                isFullSizeLib: true
            });
        });
    });

    window.storyCLMNavigation = new StoryCLMNavigation({
        threshold: 200,
        swipePointsCount: 2
    });

    /**
     * Обработка перехода на предыдущий слайд
     */
    window.storyCLMNavigation.onSwipePrev = function(direction) {
        CommunicateEmbedded.navigate(direction, 'left');
        // window.location = direction;
    };

    /**
     * Обработка перехода на следующий слайд
     */
    window.storyCLMNavigation.onSwipeNext = function(direction) {
        CommunicateEmbedded.navigate(direction, 'right');
        // window.location = direction;
    };

    /**
     * Обработка перехода назад по истории
     */
    window.storyCLMNavigation.onSwipeBackward = function(count) {
        CommunicateEmbedded.navigateBackward(count);
    };

    try {
        var clickEvent = ('ontouchstart' in window ? 'touchend' : 'click');
        $("[data-route]").on(clickEvent, function(e) {
            var route = $(this).data('route');
            if (route)
                if (window.location)
                    window.location = route;

            e.preventDefault();
        });
    } catch (ex) {}



}).call(this);

CommunicateEmbedded.onslideflip = function (ev) {ev.preventDefault();return;}