const timeCountDown = require('../dist/index.min');

test(`倒计时`, () => {
    timeCountDown({
        seconds: 10,
        isToTime: true, // 是否转换成时间
        callback: {
            run: function (json) {
                console.log(json);
            },
            over: function () {
                console.log('倒计时结束');
            },
        },
    });
    expect(true).toEqual(true);
});
