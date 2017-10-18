const os = (function () { // 获得设备信息
    if (/mobile/gi.test(navigator.userAgent)) {
        return 'phone';
    } else {
        return 'pc';
    }
}());

export default {
    os,
}
