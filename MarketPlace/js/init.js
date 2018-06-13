$(function (){
    // init slick slider
    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        arrows: false,
        dots:true,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplay: true,
                arrows: false,
                dots:true
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                autoplay: true,
                arrows: false,
                dots:true
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                arrows: false,
                dots:true
            }
        }]
    });

    // init form styler for select
    $('select').styler();

    // init modal
    let openModalsBtns = $('[data-modal]');

    openModalsBtns.on('click', function() {

        let target = $(this).attr('data-target');
        $(target).bPopup({
            closeClass: 'close-modal'
        });

    });

    // dropdown click
    let dropdownContainer = $('[data-dropdown-container]');

    dropdownContainer.on('click', function(e){

        let target = $(e.target).attr('data-dropdown');

        $(target).toggleClass('open');

    });

    // init slicknav
    $('.header-nav').slicknav({
        appendTo: '.top-header .container',
        label: ''
    });
});

// Switch grid cards (all-items-4)
function myFunction() {
    if($(window).width() < 584){
        $('.change-icon').removeClass('active');
        $('#grid-thumbs').addClass('active');
        $('.card.medium-card').removeClass('row-card');
    }
    else {
        $('#grid-thumbs').on('click',function(){
            $('.change-icon').removeClass('active');
            $('#grid-thumbs').addClass('active');
            $('.card.medium-card').removeClass('row-card');
        });

        $('#grid-list').on('click', function(){
            $('.change-icon').removeClass('active');
            $('#grid-list').addClass('active');
            $('.card.medium-card').addClass('row-card');
        });
    }
}

myFunction();

$(window).resize(myFunction);
