const ipc = require('electron').ipcRenderer;
var options = {weekday: "short", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"};

$(document).ready(function function_name (argument) {
  setTimeBlock();
  setInterval(function () {
    setTimeBlock();
  }, 1000);

  $('#submit').click(function (e) {
    saveAccomp();
  });  

  $('#icon').click(function (e) {
    var elem = $(this)
    if (elem.hasClass('pencil')) {
      elem.removeClass('pencil');
      ipc.send('show-form');
    } else{
      elem.addClass('pencil');
      elem.html('&#9999;')
      ipc.send('show-list');
    };
    // $('#icon').attr('id', 'pencil');
  });  

  // $('#pencil').click(function (e) {
  //   $('#pencil').attr('id', 'icon');
  //   ipc.send('show-form');
  // });

})

ipc.on('updated-accomps', (event, data)=>{
  console.log(data);
  $('#main_section').html('');
  data.forEach(function (item, index) {
    console.log(new Date(item.createdAt).toLocaleTimeString("en-US", options))
    $('#main_section').append(`
      <section class="accomp">
      <p class="time_block">${new Date(item.createdAt).toLocaleTimeString("en-US", options)}</p>
      <p class="accomp_title">${item.accomp}</p>
      </section>
      `);
  })
});

ipc.on('toggle_main_section', function (event, value) {
})

// Check keys pressed
function KeyPress(e) {
  var evtobj = window.event? event : e;
  if (evtobj.metaKey && evtobj.keyCode == 13) saveAccomp();
}

// On key down check what keys were pressed
document.onkeydown = KeyPress;

// Save accomp on completion
function saveAccomp () {
  var m = $('#message').val();
  if (m) {
    $('#message').val('');
    ipc.send('saving-accomp', m);
    e.preventDefault();
  }else{
    alert("Nothing here");
  };

  $('#message').focus();
}

// Set time for writing block
function setTimeBlock () {
  var options = {weekday: "short", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"};

  var t = new Date().toLocaleTimeString("en-US", options);
  $('#time_block').text(t);
}