(function(){
  'use strict';

  // Connect button(s) to drawer(s)
  var sidebarToggle = document.querySelectorAll('[data-toggle="sidebar"]')
  sidebarToggle = Array.prototype.slice.call(sidebarToggle)

  sidebarToggle.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      var selector = e.currentTarget.getAttribute('data-target') || e.currentTarget.getAttribute('href') || '#default-drawer'
      var drawer = document.querySelector(selector)
      if (drawer) {
        drawer.mdkDrawer.toggle()
      }
    })
  })

  let drawers = document.querySelectorAll('.mdk-drawer')
  drawers = Array.prototype.slice.call(drawers)
  drawers.forEach((drawer) => {
    drawer.addEventListener('mdk-drawer-change', (e) => {
      if (!e.target.mdkDrawer) {
        return
      }
      document.querySelector('body').classList[e.target.mdkDrawer.opened ? 'add' : 'remove']('has-drawer-opened')
      let button = document.querySelector('[data-target="#' + e.target.id + '"]')
      if (button) {
        button.classList[e.target.mdkDrawer.opened ? 'add' : 'remove']('active')
      }
    })
  })

  // SIDEBAR COLLAPSE MENUS
  $('.sidebar .collapse').on('show.bs.collapse', function (e) {
    e.stopPropagation()
    var parent = $(this).parents('.sidebar-submenu').get(0) || $(this).parents('.sidebar-menu').get(0)
    $(parent).find('.open').find('.collapse').collapse('hide');
    $(this).closest('li').addClass('open');
  });

  $('.sidebar .collapse').on('hidden.bs.collapse', function (e) {
    e.stopPropagation()
    $(this).closest('li').removeClass('open');
  });

  $('.sidebar .collapse').on('show.bs.collapse shown.bs.collapse hide.bs.collapse hidden.bs.collapse', function (e) {
    const el = new SimpleBar($(this).closest('.sidebar').get(0));
    el.recalculate();
  });

  $('.sidebar [data-toggle="tab"]').on('show.bs.tab shown.bs.tab hide.bs.tab hidden.bs.tab', function (e) {
    const el = new SimpleBar($(this).closest('.sidebar').get(0));
    el.recalculate();
  });

})()