'use strict';

var extend = require('zhf.extend');
var secondsToTime = require('zhf.seconds-to-time');

// 倒计时
function timeCountDown(json) {
    var opts = extend({
        seconds: 0,
        isToTime: true, // 是否转换成时间
        isHandleRunWhenZero: true, // 是否运行run回调，当传入的秒数为0
        isHandleRunWhenOver: true, // 是否运行run回调，当倒计时结束的瞬间
        callback: {
            run: function run() {},
            over: function over() {}
        }
    }, json);
    var seconds = opts.seconds; // 秒数
    var allSeconds = seconds; // 总秒数
    var run = opts.callback.run; // 运行的回调
    var over = opts.callback.over; // 结束的回调
    var runFn = function runFn() {
        // 对运行的回调进行二次封装
        if (opts.isToTime) {
            run(secondsToTime(seconds)); // 运行时的回调
        } else {
            run({ day: 0, hours: 0, minutes: 0, seconds: seconds, allSeconds: allSeconds }); // 运行时的回调
        }
    };
    if (Number(seconds) === 0) {
        if (opts.isHandleRunWhenZero) {
            runFn(); // 运行时的回调
        }
    }
    if (seconds > 0) {
        // 时间大于0秒
        runFn(); // 运行时的回调
        // 倒计时走你
        var timer = setInterval(function () {
            seconds--;
            if (seconds === 0) {
                // 这里如果是小于0，就会存在1秒的误差。这里如果是等于0，则0会展示不出来。
                clearInterval(timer); // 清除定时器
                if (opts.isHandleRunWhenOver) {
                    // 等于0，则0会展示不出来，为了能让0展示出来一瞬间，这里处理了一下。
                    runFn(); // 运行时的回调
                }
                over(); // 结束时的回调
            } else {
                /*
                * 这里会有一秒的误差，是为了把0秒展示出来停留一秒钟，再过1秒后才结束。
                * 如果想要非常精确，则需要等于0的时候，先运行次runFn，然后清除定时器，然后结束回调。
                * */
                runFn(); // 运行时的回调
            }
        }, 1000);
    } else {
        // 时间小于0秒
        console.log('倒计时的秒数不能小于0');
    }
}

module.exports = timeCountDown;