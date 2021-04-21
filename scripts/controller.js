window.addEventListener('load',init);
function init(){
    bindEvents();
    countUpdates();
    // load();
}


function bindEvents(){
    document.querySelector('#add').addEventListener('click',add);
    document.querySelector('#remove').addEventListener('click',remove);
    document.querySelector('#save').addEventListener('click',save);
    document.querySelector('#load').addEventListener('click',load);
    document.querySelector('#loadfromserver').addEventListener('click',loadServer);
    document.querySelector('#sort').addEventListener('click',sort);
    document.querySelector('#update').addEventListener('click',updateRecords);
    document.querySelector('#search').addEventListener('click',showSearch);
    document.querySelector('#searchQuery').addEventListener('keyup',searchRecords);
    document.querySelector('#clear').addEventListener('click',()=>{
        localStorage.clear();
        expenseOperation.resetExpenses();
        printExpenses();

    })
}

function loadServer(){
    let promise = fetch('http://127.0.0.1:5500/expenseapp/expenseapp/server/expenses.json');
    promise.then(response=>{
        response.json().then(data=>{
            let expenses = data.expenses;
            expenses.forEach(expense=>expenseOperation.add(expense));
        printExpenses();
            console.log('Expenses',expenses);
        }).catch(err=>{
            console.log('Invalid JSON',err);
        }).catch(e=>{
            console.log('Problem in server Call',e);
        })
    })
}

function updateRecords(){
    var obj  = readDOM();
    for(let key in expenseObject){
        expenseObject[key] = obj[key];
    }
    printExpenses();
    resetFormData();
    
}


function showSearch(){
    document.querySelector('#searachBar').classList.toggle('search');
}
function searchRecords(){
    let record = document.querySelector('#searchQuery').value;
    let newRecord = expenseOperation.searchRecord(record);
    printExpenses(newRecord); 
}

function load(){
    if(window.localStorage){
        let expenses = JSON.parse(localStorage.expenses);
        expenses.forEach(expense=>expenseOperation.add(expense));
        printExpenses();
    }
    else{
        alert('Nothing To Load...')
    }
}


function save(){
    if(window.localStorage){
        let jsonString = JSON.stringify(expenseOperation.getExpenses());
        localStorage.expenses = jsonString;
        alert('Data Saved....')
    }
    else{
        alert('Your Browser Is Outdated');
    }
}


function sort(){
    // alert('sort call');
    expenseOperation.sort();
    printExpenses();
}

function remove(){
    expenseOperation.remove();
    printExpenses();
    resetFormData();
}


function printExpenses(){
    document.querySelector('#expenses').innerHTML = '';
    // let expenses = expenseOperation.getExpenses();
    let exp = expenseOperation.getExpenses();
    exp.forEach(printExpense);
    countUpdates();
}

function add(){
    const expenseObject = readDOM();
    expenseOperation.add(expenseObject);
    printExpense(expenseObject);
    countUpdates();
    resetFormData();
}
function countUpdates(){
    document.querySelector('#total').innerText = expenseOperation.getTotal();
    document.querySelector('#mark').innerText = expenseOperation.countMarked();
    document.querySelector('#unmark').innerText = expenseOperation.countUnMarked();
}


function toggleMark(){
    let id = this.getAttribute('data-eid');
    expenseOperation.toggleMark(id);
    countUpdates();
    let tr = this.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
}

function createIcon(className,fn,id){
    let icon =  document.createElement('i');
    icon.className = className;
    icon.addEventListener('click',fn);
    icon.setAttribute('data-eid',id);
    return icon;
 }
let expenseObject;
function edit(){
    let id = this.getAttribute('data-eid');
    expenseObject = expenseOperation.findById(id);
    for(let key in expenseObject){
        if(key == 'isMarked'){
            continue;
        }
        document.querySelector(`#${key}`).value = expenseObject[key];
        // resetFormData();
    }
    // resetFormData();
}

function printExpense(expenseObject){
    let tbody = document.querySelector('#expenses');
    let tr = tbody.insertRow();
    let index = 0 ;
    for(let key in expenseObject){
        if(key=='isMarked'){
            continue;
        }
        let td = tr.insertCell(index);
        index++;
        td.innerText = expenseObject[key];
    }
    let td = tr.insertCell(index);
    td.appendChild(createIcon('fas fa-user-edit', edit,expenseObject.id));
    // resetFormData();
    td.appendChild(createIcon('fas fa-trash',toggleMark,expenseObject.id));
}

function readDOM(){
    let id = document.querySelector('#id').value;
    let name = document.querySelector('#name').value;
    let range  =document.querySelector('#range').value;
    let date = document.querySelector('#date').value;
    let remarks = document.querySelector('#remarks').value;
    let url = document.querySelector('#url').value;
    // console.log(id,name,range,date,remarks,url);
    const obj = {id ,name,range,date,remarks,url}
    return obj;
}
function resetFormData(){
    document.querySelector('#id').value = "";
    document.querySelector('#name').value = "";
    document.querySelector('#range').value = "";
    document.querySelector('#date').value = "";
    document.querySelector('#remarks').value = "";
    document.querySelector('#url').value = "";
    edit = null;
    
}
