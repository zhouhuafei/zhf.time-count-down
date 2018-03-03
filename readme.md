# 倒计时
```
const timeCountDown = require('zhf.time-count-down');

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
```
