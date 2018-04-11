const extend = require('zhf.extend');
const secondsToTime = require('zhf.seconds-to-time');

// 倒计时
function timeCountDown(json) {
    const opts = extend({
        seconds: 0,
        isToTime: true, // 是否转换成时间
        callback: {
            run: function () {
            },
            over: function () {
            },
        },
    }, json);
    let seconds = opts.seconds; // 秒数
    if (seconds > 0) { // 时间大于0秒
        const allSeconds = seconds; // 总秒数
        const run = opts.callback.run; // 运行的回调
        const over = opts.callback.over; // 结束的回调
        const runFn = function () { // 对运行的回调进行二次封装
            if (opts.isToTime) {
                run(secondsToTime(seconds)); // 运行时的回调
            } else {
                run({day: 0, hours: 0, minutes: 0, seconds: seconds, allSeconds: allSeconds}); // 运行时的回调
            }
        };
        runFn(); // 运行时的回调
        // 倒计时走你
        const timer = setInterval(function () {
            seconds--;
            if (seconds < 0) {
                clearInterval(timer); // 清除定时器
                over(); // 结束时的回调
            } else {
                runFn(); // 运行时的回调
            }
        }, 1000);
    } else { // 时间小于0秒
        console.log('倒计时的秒数不能小于0');
    }
}

module.exports = timeCountDown;
