
//go to the latest tab, if it exists:
var collapsed_bar = localStorage.getItem('sidebar_state');

/*Side bar colapse*/
if($(window).width() > '750'){
  /*Bigger screens*/
  if($(window).width() < '1200'){ // when less than 1200px, do automatically small sidebar
    colapse_sidebar(true);
  }
  // on click triger
  $('.btn-colapse-sidebar').on('click', function(){
    colapse_sidebar($('.table').hasClass('active'));
  });

  if(collapsed_bar == 'collapsed')
    colapse_sidebar(true);
  else
    colapse_sidebar(false);
}else{
  /*Mobile case*/
  // $('.btn-colapse-sidebar').parent().css('display','none'); // hide collapse button since it doesnt work here
  var sidebar = $('.respon-left-panel');
  var main_content = $('.main');
  sidebar.addClass('hide'); // when mobile always hide
  $('#mobile_header_btn, .btn-colapse-sidebar').on('click', function(){
    if(sidebar.hasClass('hide')){
      sidebar.removeClass('hide');
      main_content.css('margin-left','200px');
    }
    else{
      sidebar.addClass('hide');
      main_content.css('margin-left','auto');
    }
  });
  
}
/*
  Colapse sidebar function
  makes sidebar to mini sidear with only icons active
*/

function colapse_sidebar(event){  

  if(event)
  {
    //set localstorage to be avare of current state of sidebar
    localStorage.setItem('sidebar_state', 'collapsed');

    $('.panel-body table.table').each(function(){
      $('tbody',this).addClass('aside-table');; // hide links in sidebar
    });

    $('.panel-title ').each(function(){
      $('a span.title-txt', this).removeClass('active').addClass('hide'); // hide links in sidebar
      $('span', this).show(); // remove class with padding
      $('#accordion').addClass('mini-col');
    });

    $('.table').removeClass('active').addClass('colapsed');
    $('.main').css('padding-left','50px');
    $('.no-prem').hide(); // hide adverts
    
    $('.btn-colapse-sidebar i')
      .removeClass('glyphicon-circle-arrow-left')
      .addClass('glyphicon-circle-arrow-right');

    $('.dropdown-sidebar.sbp.active .submenu').removeClass('active'); // in case its mini, do not colapse menu item
    
  }
  else
  {
    //set localstorage to be avare of current state of sidebar
    localStorage.setItem('sidebar_state', 'not-collapsed');

    $('.panel-body table.table').each(function(){
      $('tbody', this).removeClass('aside-table');
    });

    $('.panel-title').each(function(){
      $('a span.title-txt', this).removeClass('hide').addClass('active');
      $('span', this).show(); // remove class with padding
      $('#accordion').removeClass('mini-col');
    });

    $('.table').removeClass('colapsed').addClass('active');
    $('.main').css('padding-left','205px');
    $('.no-prem').show(); // show adverts
    
    $('.btn-colapse-sidebar i')
      .removeClass('glyphicon-circle-arrow-right')
      .addClass('glyphicon-circle-arrow-left');

    $('.dropdown-sidebar.sbp.active .submenu').addClass('active'); // in case its maximized, collapse menu item
    
  }
}

$(function() {
  if(!$('.dropdown-sidebar').hasClass('mini-col')){
    $('.dropdown-sidebar.sbp.active .submenu').addClass('active');
  }
  $('.dropdown-sidebar.sbp.active .dropdown-toggle .glyphicon-chevron-down')
      .removeClass('glyphicon-chevron-down')
      .addClass('glyphicon-chevron-up');
    
    $('.dropdown-sidebar').hover(function(){
      if($(this).hasClass('mini-col') || !$('.submenu li', this).hasClass('active')){
        dropdown($(this));
      }
    });
  
});

function dropdown(event){
  var active = $('.submenu',event);

  if(active.hasClass('active'))
  {
    active.removeClass('active');
    $('.submenu .side-name-link',event).addClass('hide');
  }
  else
  {
    active.addClass('active');
    $('.submenu .side-name-link',event).removeClass('hide');
  }
}

// when reloaded keep acordion colapsed
if(!$('.panel-group').hasClass('mini-col'))
$('li.active').closest('.panel-collapse').addClass('in');
//active link
$('li.active').closest('.br').addClass('active');


// position: absolute;top: 7px;left: 21px;border: 1px solid;padding: 4px 20px 3px 2px;margin-left: 47px;
