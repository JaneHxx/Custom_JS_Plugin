(function ($) {
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function DCalendar (elem, options) {
        var that = this;
        var _default = {
            onClick: null
        };
        that.elem = $(elem);
        that.options = $.extend({}, _default, options);
        that.calendar = null;
        that.today = new Date();
        that.date = that.formatDate(that.today);
        that.create();
        that.getNewMonths();
        that.calendar.find('.calendar-header').on('click', '.prev', function () {
           that.prevMonthDays();
        });
        that.calendar.find('.calendar-header').on('click', '.next', function () {
            that.nextMonthDays();
        });
        that.calendar.find('.calendar-dates').on('click', 'span', function (event) {
            that.getCurrentDate(event);
        });
    }

    DCalendar.prototype = {
        constructor: DCalendar,
        // 获取当前日期
        getCurrentDate: function (event) {
            var that = this;
            event = window.event || event;
            var target = event.target;
            var day = target.getAttribute('day');
            var month = that.today.getMonth();
            var year = that.today.getFullYear();
            var clkDates = new Date(year, month, day);
            that.options.onClick(that.formatDate(clkDates));
        },
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
                month = vdate.getMonth(),
                day = vdate.getDate();
            month = month + 1 < 10 ? "0" + (month + 1): (month + 1);
            day = day < 10 ? "0" + day : day;
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
            var nowDate = new Date(), days = monthDays[nDate.getMonth()];
            // 获取当前月的第一天是星期几
            nDate.setDate(1);
            var dayWeek = nDate.getDay();
            var _html = '';
            for (var i = 0; i < Math.ceil(Number(days + dayWeek)/7); i++) {
                for (var j = 1; j <= 7; j++) {
                    var day = Number(i * 7 + j - dayWeek);
                    var dayElem = $('<span day="'+day+'">&nbsp;</span>');
                    if ((i * 7 + j <= dayWeek) || day > days) {} else {
                        if (j == 7 && (day == nowDate.getDate() && nDate.getMonth() == nowDate.getMonth() && nDate.getFullYear() == nowDate.getFullYear())) dayElem.addClass('active no-bd-right');
                        else if ((day == nowDate.getDate() && nDate.getMonth() == nowDate.getMonth() && nDate.getFullYear() == nowDate.getFullYear())) dayElem.addClass('active');
                        else if (j == 7) dayElem.addClass('no-bd-right');
                        dayElem.text(day);
                    }
                    _html += dayElem.prop('outerHTML');
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