class VideoPlayer {
    constructor() {
        this.player = document.querySelector('.player');
        this.video = this.player.querySelector('.viewer');
        this.progress = document.querySelector('.progress');
        this.progressBar = this.progress.querySelector('.progress__filled');
        this.toggle = this.player.querySelector('.toggle');
        this.skipButtons = this.player.querySelectorAll('[data-skip]');
        this.ranges = this.player.querySelectorAll('.player__slider');
        this.volume = this.player.querySelector('.volume');
        this.mouseDown = false;
    }

    init() {
        // start plugin
        this.savePosition();
        this.savePositionRange();
        this.events();

    }

    events() {
        // all events
        // this.video.addEventListener('click', this.togglePlay.bind(this));
        this.video.addEventListener('click', e => this.togglePlay(e));
        this.video.addEventListener('timeupdate', e => this.handleProgress(e));
        this.toggle.addEventListener('click', e => this.togglePlay(e));
        this.ranges.forEach(range => range.addEventListener('mousemove', e => this.handleRangeUpdate(e)));
        this.ranges.forEach(range => range.addEventListener('change', e => this.handleRangeUpdate(e)));
        this.skipButtons.forEach(btn => btn.addEventListener('click', e => this.skip(e)));
        this.progress.addEventListener('click', e => this.scrub(e));
        this.progress.addEventListener('mousemove', e => this.mouseDown && this.scrub(e));
        this.progress.addEventListener('mousedown', () => this.mouseDown = true);
        this.progress.addEventListener('mouseup', () => this.mouseDown = false);
    }

    togglePlay(e){
        //play/pause video
        const method = this.video.paused ? 'play' : 'pause';
        this.toggle.textContent = this.video.paused ? '❚ ❚' : '▶';
        this.video[method]();
        localStorage.setItem( 'savePosition', JSON.stringify(this.video.currentTime) );
    }

    //Строка состояния
    handleProgress(e){
        const percent = (this.video.currentTime / this.video.duration) * 100;
        this.progressBar.style.flexBasis = `${percent}%`;
    }

    // или такой вариант:
    // changeFilled() {
    //     let currentPercent = 100 / this.video.duration * this.video.currentTime;
    //     this.progressBar.style.cssText = `flex-basis:${currentPercent}%;`;
    //     localStorage.setItem('savePosition', JSON.stringify(this.video.currentTime));
    // }


    // Перемотка видео

    scrub(e) {
        this.video.currentTime = (e.offsetX / this.progress.offsetWidth) * this.video.duration;
    }

    //или так:
    // changeCurrentTime(e) {
    //     parseFloat((this.video.currentTime = e.layerX / this.progress.clientWidth * 100 / this.video.duration).toFixed(6));
    // }

    handleRangeUpdate(e) {

        this.video[e.target.name] = e.target.value;

        localStorage.setItem( 'savePositionRange', JSON.stringify(this.video['volume']));
    }

    skip(e) {
        // time skip
        this.video.currentTime += parseFloat(e.target.dataset.skip);
        localStorage.setItem( 'savePosition', JSON.stringify(this.video.currentTime) );
    }

    savePosition(e) {
        this.video.currentTime = JSON.parse(localStorage.getItem('savePosition')) || [];
    }

    savePositionRange(e) {
        this.volume.value = JSON.parse(localStorage.getItem('savePositionRange')) || ['0'];
    }

}

const video = new VideoPlayer();
video.init();