let tabControl = $('[data-tab-control]');
let tabPane = $('[data-tab-pane]');

tabControl.on('click', function(e) {
  e.preventDefault();

  let target = $(e.target).attr('data-tab');

  tabPane.removeClass('active');
  tabControl.removeClass('active');
  
  $(target).addClass('active');
  $(e.target).addClass('active');
});