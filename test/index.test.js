const timeCountDown = require('../dist/index.min');

test(`倒计时`, () => {
    timeCountDown({
        seconds: 10,
        isToTime: true, // 是否转换成时间
        callback: {
            run: function (json) {
                console.log(json);
            },
            over: function (json) {
                console.log(json);
            },
        },
    });
    expect(true).toEqual(true);
});
