const extend = require('zhf.extend');
const secondsToTime = require('zhf.seconds-to-time');

// 倒计时，倒计时应该是0秒瞬间就结束(最后读秒到1，并把数字1展示1秒之后，为0瞬间，正式结束，支付宝的倒计时就是如此)，而不是把0展示一秒，-1秒才结束。
function timeCountDown(json) {
    const opts = extend({
        seconds: 0,
        isToTime: true, // 是否转换成时间
        isHandleRunWhenZero: false, // 是否运行run回调，当传入的秒数为0
        isHandleRunWhenOver: false, // 是否运行run回调，当倒计时结束的瞬间
        callback: {
            run: function () {
            },
            over: function () {
            },
        },
    }, json);
    let seconds = Number(opts.seconds) || 0; // 秒数
    if (seconds < 0) {
        seconds = 0;
    }
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
    if (Number(seconds) === 0) { // 传入秒数为0时，是否触发一次运行时的回调
        if (opts.isHandleRunWhenZero) {
            runFn(); // 运行时的回调
        }
    }
    if (seconds > 0) { // 时间大于0秒，因为0秒瞬间倒计时就已经结束了。
        runFn(); // 运行时的回调
        // 倒计时走你
        const timer = setInterval(function () {
            seconds--;
            if (seconds === 0) {
                clearInterval(timer); // 清除定时器
                if (opts.isHandleRunWhenOver) { // 倒计时结束瞬间，是否触发一次运行时的回调
                    runFn(); // 运行时的回调
                }
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
