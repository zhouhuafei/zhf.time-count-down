const extend = require('zhf.extend');
const secondsToTime = require('zhf.seconds-to-time');

// 倒计时
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
    let seconds = opts.seconds; // 秒数
    /*
    本来想处理一下秒数，当传入的是负数和不能被转成数字的参数时，让秒数为0的，因为可以运行run，格式化下dom。
    但是，如果用户不想0秒之后(-1秒)结束回调，而是0秒瞬间(1秒之后)就结束回调。
    那么他可能会在run的回调里处理，而不是在over里进行结束回调的处理（因为over其实是秒数走到-1，是为了把0秒展示出来一秒）。
    例如倒计时走完刷新页面，如果他在run回调里判断为0瞬间刷新页面，如果我做了负数转0的处理，则这个页面会一直刷新。
    很多视频和倒计时都是00:00:00瞬间静止，并一秒之后消失，所以根据用户习惯，还是保留00:00:00展示一秒钟之后，正式触发结束回调。
    */
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
    if (Number(seconds) === 0) { // 这里是为了格式化一下dom里的00:00:00，其实如果上来就是0秒，应该按照结束处理了，dom应该不展示了，应该展示活动已结束之类的文案。
        if (opts.isHandleRunWhenZero) {
            runFn(); // 运行时的回调
        }
    }
    if (seconds > 0) { // 时间大于0秒，等于0不让传入，是因为有个后端给值时，倒计时结束了值居然一直是0。而结束回调里做了刷新页面处理，导致一直刷新页面
        runFn(); // 运行时的回调
        // 倒计时走你
        const timer = setInterval(function () {
            seconds--;
            /*
            if (seconds === 0) { // 这里如果是小于0，就会存在1秒的误差。这里如果是等于0，则0会展示不出来。
                clearInterval(timer); // 清除定时器
                if (opts.isHandleRunWhenOver) { // 等于0，则0会展示不出来，为了能让0展示出来一瞬间，这里处理了一下。
                    runFn(); // 运行时的回调
                }
                over(); // 结束时的回调
            }
            */
            if (seconds < 0) {
                clearInterval(timer); // 清除定时器
                over(); // 结束时的回调
            } else {
                /*
                * 这里会有一秒的误差，是为了把0秒展示出来停留一秒钟，再过1秒后才结束。
                * 如果想要非常精确，则需要等于0的时候终止定时器，先运行次runFn，然后清除定时器，然后结束回调。
                * */
                runFn(); // 运行时的回调
            }
        }, 1000);
    } else { // 时间小于0秒
        console.log('倒计时的秒数不能小于0');
    }
}

module.exports = timeCountDown;
