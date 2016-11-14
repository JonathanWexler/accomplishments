'use strict';

// Imports
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const ipcMain = require('electron').ipcMain;

// Database NEDB
var Datastore = require('nedb'), db = new Datastore({ filename: path.join(__dirname, 'accomp.db'), autoload: true, timestampData: true });

const {Menu, Tray} = require('electron');

var tray, win;

app.on('ready', () => {
  tray = new Tray(path.join(__dirname, '/icons/accomp.png'))
  tray.setPressedImage(path.join(__dirname, '/icons/accomp_white.png'));

  win = new BrowserWindow({  
    height: 265,
    width: 300,
    resizable: false,
    frame: false
  })
  win.hide();

  // console.log(win.getPosition())
  win.setPosition(600,0)
  win.loadURL(`file://${__dirname}/index.html`)
  win.hide();



  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
  win.on('show', () => {
    // tray.setHighlightMode('always')
    tray.setImage(path.join(__dirname, '/icons/accomp_select.png'));

  })
  win.on('hide', () => {
    // tray.setHighlightMode('never')
    tray.setImage(path.join(__dirname, '/icons/accomp.png'));

  })
  app.dock.hide();
})



// var menubar = require('menubar')

// var mb = menubar({
//   icon: path.join(__dirname, '/icons/accomp.png') ,
  // height: 265,
  // width: 300,
  // resizable: false,
  // frame: false
// })


// mb.on('ready', () => {
//   console.log('app is ready')
//   // your app code here

//   ipcMain.on('show-list', (event, data)=>{
//     // mb.window.loadURL(process.cwd() + '/list.html')
//     var docs = getData()
//     console.log(docs);
//     event.sender.send('updated-accomps', docs);
//   })

//   function getData () {
//     var data =  db.find({}, function (err, docs) {
//     // console.log(docs);
//     return docs;
//   });
//     console.log(data);
//     // return data;
//   }

//   mb.on('after-create-window', ()=>{
//     console.log("TESTING"); 
// //   mb = menubar({
// //   icon: path.join(__dirname, '/icons/accomp.png') ,
// //   height: 265,
// //   width: 300,
// //   resizable: false,
// //   frame: false
// // })
//   mb.window.loadUrl(process.cwd() + '/list.html')
// });



// })

ipcMain.on('show-list', (event, data)=>{
    // win.loadURL(`file://${__dirname}/list.html`)
    // var docs = getData()
    // console.log(docs);
    // event.sender.send('updated-accomps', docs);

    db.find({}, function (err, docs) {
      console.log(docs);
      event.sender.send('updated-accomps', docs);
    });
  })

ipcMain.on('show-form', (event, data)=>{
    win.loadURL(`file://${__dirname}/index.html`)
    // var docs = getData()

    
  })


    ipcMain.on('saving-accomp', (event, data)=>{
  // console.log(data);
  db.insert({accomp: data}, function (err, newDoc) {  
    console.log(newDoc);
  });
})

    //   function getData () {
//     var data =  db.find({}, function (err, docs) {
//     // console.log(docs);
//     return docs;
//   });

