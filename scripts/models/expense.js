function Expense(id,name,range,date,remarks,url){
    this.id = id;
    this.name = name;
    this.range = range;
    this.date = date;
    this.remarks = remarks;
    this.url = url;
    this.isMarked = false;
}



// function createExpenseobject(expenseObject){
//     const expense = {}
//     for(let key in expenseObject){
//         expense[key] = expenseObject[key];
//     }
//     expense.isMarked = false;
//     // expense.id = id;
//     // expense.name = name;
//     // expense.range = range;
//     // expense.date = date;
//     // expense.remarks = remarks;
//     // expense.url = url;
//     return expense;
// }