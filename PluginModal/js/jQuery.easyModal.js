(function ($) {
    class Modal{
        constructor(element, options){
            this.default = {
                closeClass: 'close-modal',
                autoClose: false, // true - автозакрытие работает; false - автозакрытие не работает
                autoCloseTime: 2000, // время через которое модальное окно будет закрыто
                opacity: .7,
                position: 'center', // указывает с какой стороны будет "вылет" (top,bottom,center)
                valueChanges: '50px', // значение растояния вылета в px
                duration: 500
            };
            this.modal = element;
            this.options = $.extend(this.default, options);
            // console.log(this.options)
            this.overlay = $('<div class="overlay"></div>');
        }

        init(){
            this.showOverlay();
            this.showModal();
            this.events();
        }

        events(){
            this.overlay.on('click', () => this.closeModal());
            $(`.${this.options.closeClass}`).on('click', () => this.closeModal());

        }

        topAnimate(){
            const halfWidth = this.modal.outerWidth() / 2;
            const heighHide = this.modal.outerHeight();

            this.modal.css({
                'display': 'block',
                'position': 'fixed',
                'left': '50%',
                'z-index': '1000',
                'opacity': '0',
                'top': `-${heighHide}px`,
                'margin-left': `-${halfWidth}px`
            }).animate({
                opacity: 1,
                top: this.options.valueChanges
            },this.options.duration);
        }

        bottomAnimate(){
            const halfWidth = this.modal.outerWidth() / 2;
            const heighHide = $('.btn.open-modal').outerHeight() + this.modal.outerHeight();

            this.modal.css({
                'display': 'block',
                'position': 'fixed',
                'left': '50%',
                'z-index': '1000',
                'opacity': '0',
                'bottom': `-${heighHide}px`,
                'margin-left': `-${halfWidth}px`
            }).animate({
                opacity: 1,
                bottom: this.options.valueChanges
            },this.options.duration);
        }

        showOverlay(){
            this.overlay.css({
                'display': 'block',
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'right': '0',
                'bottom': '0',
                'opacity': '0',
                'background-color': `rgba(0, 0, 0, ${this.options.opacity}`,
                'z-index': '999'
            });

            this.modal.before(this.overlay);
        }


        showModal(){
            if(this.options.autoClose === true){
                setTimeout( () => this.closeModal() , this.options.autoCloseTime);
            }

            const halfWidth = this.modal.outerWidth() / 2;
            const halfHeight = this.modal.outerHeight() / 2;

            this.overlay.animate({
                opacity: 1
            }, this.options.duration);

            if(this.options.position === 'top'){
                this.topAnimate();
            }else if(this.options.position === 'bottom'){
                this.bottomAnimate()
            }else {
                this.modal.css({
                    'display': 'block',
                    'position': 'fixed',
                    'top': '50%',
                    'left': '50%',
                    'z-index': '1000',
                    'opacity': '0',
                    'margin-top': `-${halfHeight}px`,
                    'margin-left': `-${halfWidth}px`
                }).animate({
                    opacity: 1
                },this.options.duration);
            }
        }

        reset(){
            this.modal.css({'display': 'none'});
            this.overlay.remove();
            this.overlay.off();
            $(`.${this.options.closeClass}`).off();
        }


        closeModal(){
            this.overlay.animate({
                opacity:0
            },this.options.duration, () => {
                this.overlay.css({ 'display': 'none' })
            });

            if(this.options.position === 'top'){
                this.modal.animate({
                    opacity: 0,
                    top: '-100%'
                }, this.options.duration, () => {
                    this.reset()
                })
            }else if(this.options.position === 'bottom'){
                this.modal.animate({
                    opacity: 0,
                    bottom: '-100%'
                }, this.options.duration, () => {
                    this.reset()
                })
            }else {
                this.modal.animate({
                    opacity: 0
                }, this.options.duration, () => {
                    this.reset()
                })
            }
        }
    }

    $.fn.easyModal = function (options) {
        // console.log(this,options);
    //    init Modal
        new Modal(this, options).init();
    }
}(jQuery));