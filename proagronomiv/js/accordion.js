const accordionBtn = $('[data-toggle-accordion]');

function onclick(e) {
    const header = $(this).children('.accordion-header');

    const item = $(this).children('.accordion-body');

    if(item.is(':visible')) {
        item.slideUp(300);

        header.css({
            'background': '#333333',
            'color': 'yellow'
        });
    } else {
        accordionBtn.find('>.accordion-header').css({
            'background': '#333333',
            'color': 'yellow'
        });

        accordionBtn.find('>.accordion-body').slideUp(300);

        item.slideDown(300);

        header.css({
            'background': '#333333',
            'color': '#fff'
        });
    }
}

accordionBtn.on('click', onclick);


