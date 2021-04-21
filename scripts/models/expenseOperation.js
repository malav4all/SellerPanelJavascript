const expenseOperation = {
    expenses:[],
    add(exp){
        // let expObj = createExpenseobject(expenseObject);
        let expenseObject = new Expense(exp.id,exp.name,exp.range,exp.date,exp.remarks,exp.url);
        this.expenses.push(expenseObject)
    },
    resetExpenses(){
        this.expenses = [];
    },
    sort(){
        this.expenses.sort((first,second)=>first.range - second.range)
    },
    getExpenses(){
        return this.expenses;
    },
    getTotal(){
        return this.expenses.length;
    },
    remove(){
        this.expenses = this.expenses.filter(expense=>!expense.isMarked);
    },
    countUnMarked(){
        return this.getTotal() - this.countMarked();
    },
    countMarked(){
        return this.expenses.filter(expense=>expense.isMarked).length;
    },
    toggleMark(id){
        let expObject = this.findById(id);
        if(expObject){
            expObject.isMarked = !expObject.isMarked;
        }
    },
    findById(id){
        return this.expenses.find(expense=>expense.id == id);
    },
    searchRecord(record){
        return this.expenses.filter(expense=>expense.range == record);
        // return this.expenses;
    },
    selectedExpense(id){
        return this.findById(id);
    }

}