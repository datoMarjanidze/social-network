'use strict'

const d = {
    ///--- LOGGER ---\\\
    c(param){
        if(param)
            console.log(param)
        else
            console.warn('DEV-MODE: Logger is missing argument')
    },
    ///--- CLEAR CONSOLE ---\\\ 
    get cc(){ console.clear() },
    
} 

///--- TIMER ---\\\
class DTimeIsPrecious{
    //constructor params:
    //  1. timerPosition must be an object with the predefined properties - verticalAlign,horizontalAlign.
    //     expected values of the first propertie: top, bottom; second propertie: left, right.
    //     example: {verticalAlign: 'top', horizontalAlign: 'right'}
    constructor(timerPosition){
        if(timerPosition)
            this.timerPosition = timerPosition
        else
            console.error('DEV-MODE: timeIsPrecious Constructor: timerPosition isn\'t defined')
        
        this.createTimerEl()
        this.preciousTime = window.localStorage.getItem('preciousTime')
        this.setTimeInStorage()
        this.setTimerInterval()
    }
    createTimerEl(){
        this.timerEl = document.createElement('p')
        this.timerEl.setAttribute('style', `
            color:rgba(255, 0, 0, 1);
            font-size:25px;
            margin:0px;
            ${this.timerPosition.verticalAlign}:5px;
            ${this.timerPosition.horizontalAlign}:5px;
            position:fixed;
            width:140px;
            user-select: none;
        `)

        document.body.appendChild(this.timerEl)
    }
    setTimeInStorage(){
        if(this.preciousTime === null){
            this.preciousTime = new Date().getTime()
            window.localStorage.setItem('preciousTime', this.preciousTime)
        }
    }
    setTimerInterval(){
        let hours, minutes, seconds, milliseconds = 0
        var timerInterval = setInterval(()=>{
            milliseconds += 4
            seconds = Math.floor((new Date().getTime() - this.preciousTime) / 1000)
            minutes = Math.floor((new Date().getTime() - this.preciousTime) / (1000 * 60))
            hours = Math.floor((new Date().getTime() - this.preciousTime) / (1000 * 60 * 60))
            this.timerEl.innerHTML = `${hours%24}:${minutes%60}:${seconds%60}:${milliseconds%100}`
        }, 40)
        
        this.timerEl.addEventListener('dblclick', ()=>{
            clearInterval(timerInterval)
            window.localStorage.removeItem('preciousTime')
            this.preciousTime = null
            this.setTimeInStorage()
            this.setTimerInterval()
        })
    }
}
new DTimeIsPrecious({verticalAlign: 'top', horizontalAlign: 'right'})

///--- TASKS LIST ---\\\
//const DMtasksList = {
//    tasks: [],
//    addBodyCssForCntMenu: () => {
//        document.body.setAttribute('style', `
//            position: absolute;
//            z-index: -1;
//        `)
//    },
//    initContextMenuEl: () => {
//        let contextMenuEl = document.createElement('div')
//        contextMenuEl.setAttribute('id', 'DM-contextMenu')
//        contextMenuEl.setAttribute('class', 'collection')
//        contextMenuEl.setAttribute('style', `
//            display:none;
//            position:absolute;
//            cursor: pointer;
//        `)
//        contextMenuEl.addEventListener('click', () => {
//            DMtasksList.getTasksList()
//        })
//        let collectionItem = document.createElement('a')
//        collectionItem.setAttribute('class', 'collection-item')
//        collectionItem.innerHTML = 'Open task list'
//
//        contextMenuEl.appendChild(collectionItem)
//        document.body.appendChild(contextMenuEl)
//    },
//    initContextMenuListeners: () => {
//        var body = document.body
//        body.addEventListener('contextmenu', (event) => {
//            event.preventDefault()
//            let contextMenu = document.getElementById('DM-contextMenu')
//            contextMenu.style.display = 'block'
//            contextMenu.style.left = (event.pageX - 10) + 'px'
//            contextMenu.style.top = (event.pageY - 10) + 'px'
//        },false)
//        body.addEventListener('click', (event) => {
//            let contextMenu = document.getElementById('DM-contextMenu')
//            contextMenu.style.display = ''
//            contextMenu.style.left = ''
//            contextMenu.style.top = ''
//            document.getElementById('DM-contextMenu').style.display = 'none'
//        },false)
//    },
//    getTasksList: () => {
//        if(!document.getElementById('DM-tasks-list'))
//        {
//            let tasksList = document.createElement('ul')
//            tasksList.setAttribute('id', 'DM-tasks-list')
//            tasksList.setAttribute('style', `
//                margin: 0;
//                padding: 0;
//                list-style-type: none;
//
//            `)
////                    tasksList.querySelector(' li').setAttribute('style', `
////                        border: 1px solid rgba(0,0,0, .4);
////                        border-radius: 5px;
////                    `)
//            document.body.appendChild(tasksList)
//        }
//
//    },
//    setTask: () => {
//        // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
//        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
//
//        // Open (or create) the database
//        var open = indexedDB.open('developerModeDB', 1);
//
//        // Create the schema
//        open.onupgradeneeded = () => {
//            var db = open.result;
//            var store = db.createObjectStore('tasksTable', {keyPath: 'id'});
//            var index = store.createIndex('tasksIndex', 'text');
//        };
//
//        open.onsuccess = function() {
//            // Start a new transaction
//            var db = open.result;
//            var tx = db.transaction('tasksTable', 'readwrite');
//            var store = tx.objectStore('tasksTable');
//            var index = store.index('tasksIndex');
//
//            // Add some data
//            store.put({id: 12345, {text:'task desc 1'}});
//            store.put({id: 67890, {text: 'task desc 2'}});
//
//            // Query the data
////                    var getJohn = store.get(12345);
////                    var getBob = index.get(["Smith", "Bob"]);
////
////                    getJohn.onsuccess = function() {
////                        console.log(getJohn.result.name.first);  // => "John"
////                    };
////
////                    getBob.onsuccess = function() {
////                        console.log(getBob.result.name.first);   // => "Bob"
////                    };
////
////                    // Close the db when the transaction is done
////                    tx.oncomplete = function() {
////                        db.close();
////                    };
//        }
//    },
//    init: () => {
//        DMtasksList.addBodyCssForCntMenu()
//        DMtasksList.initContextMenuEl()
//        DMtasksList.initContextMenuListeners()
//        DMtasksList.getTasksList()
//        DMtasksList.setTask()
//    }
//}
//
//DMtasksList.init()    
