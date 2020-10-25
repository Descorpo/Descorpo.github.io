const accordionBtn = $('[data-toggle-accordion]');

function onclick(e) {
    const header = $(this).children('.accordion-header');

    const item = $(this).children('.accordion-body');

    if(item.is(':visible')) {
        item.slideUp(300);

        header.css({
            'background': 'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 35%, rgba(2,0,36,1) 100%)',
            'color': '#fff'
        });
    } else {
        accordionBtn.find('>.accordion-header').css({
            'background': 'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 35%, rgba(2,0,36,1) 100%)',
            'color': '#fff'
        });

        accordionBtn.find('>.accordion-body').slideUp(300);

        item.slideDown(300);

        header.css({
            'background': 'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 35%, rgba(2,0,36,1) 100%)',
            'color': '#fff'
        });
    }
}

accordionBtn.on('click', onclick);


