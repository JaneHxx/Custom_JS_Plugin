(function ($) {
    function DCcalendar (elem, options) {
        var that = this;
        that.elem = $(elem);
        that.calendar = null;

        // that.create();

    }

    DCcalendar.prototype = {
        constructor: DCcalendar,
        create: function () {
            var that = this;
            var container = $('<div class="calendar-container"></div>');
            var carHeader = $('<section class="calendar-header"><label class="calendar-date">2019-08-22</label><span class="prev"><</span><span class="next">></span></section>');
            carHeader.appendTo(container);
            container.appendTo(that.elem);
            that.calendar = that.elem;
        }
    };


    $.fn.extend({
        calendar: function (opt) {
            return $(this).each(function (item, index) {
                var that = this;
                var $this = $(that);
                new DCcalendar(that, opt);
            });
        }
    });

})(jQuery);