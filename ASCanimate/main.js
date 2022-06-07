const processor = {};

const ASCII_CHARS = '$$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^`'
                        + '\\'
                        + "'"
                        + '. ';

const gray2asc = (r, g, b) => {
    if (!r || !g || !b) return '';

    for (let i = 1; i <= ASCII_CHARS.length; i++) {
        if (r > 255 * ((ASCII_CHARS.length - i) / ASCII_CHARS.length) &&
            g > 255 * ((ASCII_CHARS.length - i) / ASCII_CHARS.length) &&
            b > 255 * ((ASCII_CHARS.length - i) / ASCII_CHARS.length)) {
            return ASCII_CHARS[i] || ' ';
        }
    }
    // if (g < 100 && r < 100 && b < 100) return '#';
};

processor.doload = () => {
    this.video = document.querySelector('#video');
    this.c = document.querySelector('#c1');
    this.context = this.c.getContext('2d');
    this.video.addEventListener('play', () => {
        this.width = this.video.videoWidth / 2;
        this.height = this.video.videoHeight / 2;
        processor.timerCallback();
    });
};

processor.timerCallback = () => {
    if (this.video.paused || this.video.ended) return;
    processor.computeFrame();
    setTimeout(processor.timerCallback, 1000 / 60);
};

processor.computeFrame = () => {
    this.context.drawImage(this.video, 0, 0, this.width, this.height);
    let frame = this.context.getImageData(0, 0, this.width, this.height).data;
    let lineIndex = 0;
    let result = '';
    // const length = frame.data.length / 4;
    // for (let i = 0; i < length; i++) {
    //     const r = frame.data[i * 4 + 0];
    //     const g = frame.data[i * 4 + 1];
    //     const b = frame.data[i * 4 + 2];
    // } 640 480
    // this.context.putImageData(frame, 0, 0);
    console.log(frame);
    for (let lineHeight = 0; lineHeight <= this.height; lineHeight += 16) {
        let lineASC = '';
        for (let lineFlag = 0; lineFlag < this.width; lineFlag += 6) {
            lineIndex = (lineHeight * this.width + lineFlag) * 4;
            const r = frame[lineIndex];
            const g = frame[lineIndex + 1];
            const b = frame[lineIndex + 2];
            lineASC += gray2asc(r, g, b);
        }
        lineASC += '\n';
        result += lineASC;
    }

    // document.querySelector('.ascii').innerHtml = result;
    // console.log(`%c ${result}`, 'font-family: "monospace";font-size: 16px;color: blue;');
    document.querySelector('#root').innerText = result;
};

