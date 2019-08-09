//避免命名污染
var myTouch = {
    /**
     * 
     * @param {*} el dom 元素
     * @param {*} callback  回调函数
     */

    tap: function(el, callback) {
        /**
        *
        * 移动端实现点击事件
           - 按下时间和抬起时间相差小于150ms。
           - 点击事件不能有移动
        * 
        */
        //    按下开始时间
        var startTime = 0;
        //   是否移动开关
        var isMove = true;

        el.addEventListener("touchstart", function() {
            // 获取开始按下时间
            startTime = new Date() * 1;
        })
        el.addEventListener("touchmove", function() {
            // 改变状态
            isMove = false;

        });
        el.addEventListener("touchend", function() {
            // 抬起时间
            var endTime = new Date() * 1;
            if ((endTime - startTime) < 150 && isMove) {
                //d点击事件
                // if(callback){
                //     callback()
                // }
                callback && callback(el);
            }
            // 重置全局变量
            startTime = 0;
            // 是否移动开关
            isMove = true;

        });
    },

    // 滑动事件

    /**
     * 
     * @param {元素dom} el 
     * @param {方向} direction 
     * @param {回调函数} callback 
     */
    /**
     * 第一步：获取起始坐标点
     * 第二步：起始坐标差值 大于 30
     * 第三步：X差值 大于 Y 差值 水平方向滑动 否则 垂直方向滑动 
     * 第四步：通过坐标差值来判断上下左右
     */
    swiper: function(el, direction, callback) {

        var startPiont = null;
        var endPiont = null;

        el.addEventListener("touchstart", function(e) {
            // 
            var myPoint = e.touches[0];

            startPiont = {
                x: myPoint.clientX,
                y: myPoint.clientY
            }

        })

        el.addEventListener("touchmove", function(e) {
            var myPoint = e.touches[0];
            endPiont = {
                x: myPoint.clientX,
                y: myPoint.clientY
            }
        });

        el.addEventListener("touchend", function(e) {
            // 坐标点判断
            if (startPiont && endPiont && count(startPiont, endPiont) == direction) {
                callback && callback();
            }

        });

        function count(startPiont, endPiont) {
            var text = "";
            // X 差值
            var diffX = endPiont.x - startPiont.x;
            var diffY = endPiont.y - startPiont.y;

            var absX = Math.abs(diffX);
            var absY = Math.abs(diffY);



            if (absX > 30 || absY > 30) {
                // 判断水平或垂直
                if (absX > absY) {
                    // 水平
                    text = diffX > 0 ? "right" : "left";
                } else {
                    // 垂直
                    text = diffY > 0 ? "bottom" : "top";
                }
            }

            return text;

        }

        startPiont = null;
        endPiont = null;

    }
}