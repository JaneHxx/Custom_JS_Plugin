(function ($) {
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function DCalendar (elem, options) {
        var that = this;
        var _default = {};
        that.elem = $(elem);
        that.options = $.extend({}, _default, options);
        that.calendar = null;
        that.today = new Date();
        that.date = that.formatDate(that.today);
        that.create();
        that.getNewMonths();
        that.calendar.find('.calendar-header .prev').on('click', function () {
           that.prevMonthDays();
        });
        that.calendar.find('.calendar-header .next').on('click', function () {
            that.nextMonthDays();
        });
    }

    DCalendar.prototype = {
        constructor: DCalendar,
        // 上一个月
        prevMonthDays: function () {
            var that = this;
            var vDate = new Date(that.today.getFullYear(), that.today.getMonth(), that.today.getDate());
            var year = vDate.getFullYear();
            var month = vDate.getMonth();
            month -= 1;
            if (month < 0) {
                year -= 1;
                month = 11;
            }
            vDate.setFullYear(year);
            vDate.setMonth(month);
            that.today = vDate;
            that.date = that.formatDate(vDate);
            that.getNewMonths();
        },
        // 下个月
        nextMonthDays: function () {
            var that = this;
            var vDate = new Date(that.today.getFullYear(), that.today.getMonth(), that.today.getDate());
            var year = vDate.getFullYear();
            var month = vDate.getMonth();
            month += 1;
            if (month > 12) {
                year += 1;
                month = 0;
            }
            vDate.setFullYear(year);
            vDate.setMonth(month);
            that.today = vDate;
            that.date = that.formatDate(vDate);
            that.getNewMonths();
        },
        // 计算二月的天数
        calcFebDays: function (date) {
            var that = this;
            var vdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var year = vdate.getFullYear();
            // 闰年 29天
            if ((year % 400 === 0) || (year % 4 == 0 && year % 100 !== 0)) {
                monthDays[1] = 29;
            // 平年 28天
            } else {
                monthDays[1] = 28;
            }
        },
        // 格式化日期
        formatDate: function (date) {
            var vdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var year = vdate.getFullYear(),
                month = vdate.getMonth() + 1,
                day = vdate.getDate();
            return year + '-' + month + '-' + day;
        },
        /* Sets current view based on user interaction (on arrows) */
        getNewMonths: function () {
            var that = this;
            var carlendarDate = that.calendar.find('.calendar-header .calendar-date');
            var datesContainer = that.calendar.find('.calendar-dates');
            that.getDays(that.today, function (dates) {
                carlendarDate.text(that.date);
                datesContainer.html(dates);
            });
        },
        /* Gets days for month of 'newDate'*/
        getDays: function (newDate, callback) {
            var that = this,
                nDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
            that.calcFebDays(nDate);
            var date = nDate.getDate(), days = monthDays[nDate.getMonth()];
            // 获取当前月的第一天是星期几
            nDate.setDate(1);
            var dayWeek = nDate.getDay();
            var _html = '';
            for (var i = 0; i < Math.ceil(Number(days + dayWeek)/7); i++) {
                for (var j = 1; j <= 7; j++) {
                    if ((i * 7 + j <= dayWeek) || Number(i * 7 + j - dayWeek) > days) {
                        _html += '<span>&nbsp;</span>';
                    } else {
                        if (j == 7 && Number(i * 7 + j - dayWeek + 1) == date) { _html += '<span class="active no-bd-right">'; }
                        else if (Number(i * 7 + j - dayWeek + 1) == date) { _html += '<span class="active">'; }
                        else if (j == 7) { _html += '<span class="no-bd-right">'; }
                        else _html += '<span>';
                        _html += Number(i * 7 + j - dayWeek) +'</span>';
                    }
                }
            }
            callback(_html);
        },
        /* Creates components for the calendar */
        create: function () {
            var that = this;
            var container = $('<div class="calendar-container"></div>');
            var carHeader = $('<section class="calendar-header"><label class="calendar-date"></label><span class="prev"><</span><span class="next">></span></section>');
            var carWeek = $('<div class="calendar-grid"><div class="calendar-labels"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fri</span><span>Sa</span></div></div>');
            var carDates = $('<div class="calendar-grid"><div class="calendar-dates"></div></div>');
            carHeader.appendTo(container);
            carWeek.appendTo(container);
            carDates.appendTo(container);
            container.appendTo(that.elem);
            that.calendar = that.elem;
        }
    };


    $.fn.extend({
        calendar: function (opt) {
            return $(this).each(function (item, index) {
                var that = this;
                var $this = $(that);
                new DCalendar($this, opt);
            });
        }
    });

})(jQuery);