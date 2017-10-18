
# swipe轮播组件使用方式
    ```js
    import Swipe from 'components/Swiper';

    const props = {
        onSlideEnd: PropTypes.func, // 移动之后的回调
        onSlideStart: PropTypes.func, // 移动之前的回调
        current: 0,               // 当前轮播的节点
        loop: true,               // 无限轮播
        autoPlay: false,          // 自动轮播
        dots： JSX || true (默认false)        // 是否显示轮播下面的计数点（可自定义）
        dotsCss: {     // 自定义点点样式 class
            dots:,
            dot:,
            active:,
        }
        margin: 0                 // 只接受string，可以是任何单位长度
    }; // Swipe上接受的参数, 以上默认参数可传可不传

    const swipe = () => (   // 这里默认使用div来分隔
        <Swipe {...props} >
            <div>
                1.你写的jsx
            </div>
            <div>
                2.你写的jsx
            </div>
            <div>
                3.你写的jsx
            </div>
            <div>
                4.你写的jsx
            </div>
                。
                。
                。
        </Swipe>
    );
    ```


    ✅点点自定义样式
    ✅预留空白====多出来的切换效果
    ✅滑动超过一屏时出现bug
    ✅滑动bug样式飘动
    ✅左滑右滑动画不一致
    ⭕️岂不美哉
    ⭕️参数调试，尽量表现一样
    ⭕️轮播到边界时，轮播动画时长较长时，组件动画会进行跳跃    
    ❌已知有快速滑动时无法触发动画效果的情况：原因未知
    。。。有待发现的bug

