/* eslint-disable */
// 错误统计，统计浏览器加载的js文件所报的错误
window.addEventListener('error', function (messageOrEvent, filename, lineno, colno, error) {
    var message = '';
    if (messageOrEvent.filename !== undefined) {
        message = messageOrEvent.message;
        filename = messageOrEvent.filename;
        lineno = messageOrEvent.lineno;
        colno = messageOrEvent.colno;
        error = messageOrEvent.error;
    } else {
        message = messageOrEvent;
    }
    var data = {
        message: message,
        filename: filename,
        lineno: lineno,
        colno: colno,
        url: location.href,
        UA: window.navigator.userAgent
    };
    alert(JSON.stringify(data));
    // new Image().src = `//www.lingyansi.space/tongji?data=${encodeURIComponent(JSON.stringify(data))}&t=${Date.now()}`
});