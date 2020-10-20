const accordionBtn = $('[data-toggle-accordion]');

function onclick(e) {
    const header = $(this).children('.accordion-header');

    const item = $(this).children('.accordion-body');

    if(item.is(':visible')) {
        item.slideUp(300);

        header.css({
            'background': '#f7f7f7',
            'color': '#000'
        });
    } else {
        accordionBtn.find('>.accordion-header').css({
            'background': '#f7f7f7',
            'color': '#000'
        });

        accordionBtn.find('>.accordion-body').slideUp(300);

        item.slideDown(300);

        header.css({
            'background': 'rgba(64, 60, 60, 0.78)',
            'color': '#fff'
        });
    }
}

accordionBtn.on('click', onclick);


