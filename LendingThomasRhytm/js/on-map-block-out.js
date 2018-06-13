
const onMapBlock = $('.on-map-block');
const mapBlockClose = $('.map-block-close');

function outBlock() {
    onMapBlock.css({
        'opacity': '0',
        '-webkit-transform': 'translateY(100%)',
        'transform': 'translateY(100%)'
    });

    mapBlockClose.css({
        'opacity': '100',
        '-webkit-transform': 'translateY(0)',
        'transform': 'translateY(0)'
    });
}

onMapBlock.on('click',outBlock);


function onBlock() {
    onMapBlock.css({
        'opacity': '100',
        '-webkit-transform': 'translateY(0)',
        'transform': 'translateY(0)'
    });

    mapBlockClose.css({
        'opacity': '0',
        '-webkit-transform': 'translateY(100%)',
        'transform': 'translateY(100%)'
    });
}

mapBlockClose.on('click',onBlock);