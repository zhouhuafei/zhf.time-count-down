'use strict';

/**
 * @description json转数组
 * @param {Object} json - json格式的对象{}
 * */
var extend = require('zhf.extend');
var secondsToTime = require('zhf.seconds-to-time');

function timeCountDown(json) {
    var opts = extend({
        seconds: 0,
        isToTime: true, // 是否转换成时间
        callback: {
            run: function run() {},
            over: function over() {}
        }
    }, json);
    var seconds = opts.seconds; // 秒数
    var run = opts.callback.run; // 运行的回调
    var over = opts.callback.over; // 结束的回调
    // 时间大于等于0秒
    if (seconds >= 0) {
        if (opts.isToTime) {
            run(secondsToTime(seconds)); // 运行时的回调
        } else {
            run({ day: 0, hours: 0, minutes: 0, seconds: seconds }); // 运行时的回调
        }
        // 倒计时走你
        var timer = setInterval(function () {
            seconds--;
            if (seconds >= 0) {
                if (opts.isToTime) {
                    run(secondsToTime(seconds)); // 运行时的回调
                } else {
                    run({ day: 0, hours: 0, minutes: 0, seconds: seconds }); // 运行时的回调
                }
            } else {
                over(); // 结束时的回调
                clearInterval(timer);
            }
        }, 1000);
    }
    // 时间小于0秒
    if (seconds < 0) {
        console.log('倒计时的秒数不能小于0');
    }
}

module.exports = timeCountDown;