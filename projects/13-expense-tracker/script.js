// selecting elements (quering)
let expenseForm = document.querySelector("#expense-form");
let expenseNameInput = document.querySelector("#expense-name");
let expenseAmountInput = document.querySelector("#expense-amount");
let totalExpense = document.querySelector("#total-expenses");
let expenseList = document.querySelector("#expense-list");
let emptyNote = document.querySelector("#empty-message");

// arry of objects to strore the user's data
const expenses = [];

// creating the element and objects that is gonna be in the list
expenseForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // getting the expenses input value
    const name = expenseNameInput.value;
    const amount = expenseAmountInput.valueAsNumber;

    // putting those values into object
    const expense = {
        id: crypto.randomUUID(),
        name: name,
        amount: amount
    };

    // putting the object into the array
    expenses.push(expense);


    // creating the li element 
    const li = document.createElement("li");

    // giving li its class
    li.classList.add("expense-item");

    // putting the expense id in li element
    li.dataset.id = expense.id;

    // creating span element for expense name
    const spanName = document.createElement("span");

    // giving span its class
    spanName.classList.add("expense-name");

    // putting the value inside its content
    spanName.textContent = expense.name;

    // creating span element for expense amount
    const spanAmount = document.createElement("span");

    // giving span its class
    spanAmount.classList.add("expense-amount");

    // putting the value inside its content
    spanAmount.textContent = expense.amount;

    // creating delete element for deletion of the item
    const dlt = document.createElement("button");

    // giving dlt its class
    dlt.classList.add("delete");

    // giving dlt its text content
    dlt.textContent = "x";

    // appending these elements into li
    li.append(spanName, spanAmount, dlt);

    // appendig the li into the html's ul element to make it visible
    expenseList.append(li);

    // clearing the input after the list got created
    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    // calling the total calculation function
    updateTotal();

    // calling the empty note function
    updateEmptyState();

});



// function for the total calculation
function updateTotal() {

    let total = 0;

    expenses.forEach(function (item) {

        total += item.amount;

    });

    // putting the total inside the total expense element in html
    totalExpense.textContent = total;
}


// function for the emptystate
function updateEmptyState() {
    
    // removing the empty note
    if (expenses.length === 0) {
        emptyNote.hidden = false;
    } else {
        emptyNote.hidden = true;
    }

}


// event listner for deletion of the list item
expenseList.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete")) {
        const expenseItem = event.target.closest(".expense-item");
        const id = expenseItem.dataset.id;

        const index = expenses.findIndex(function (expense) {
            return expense.id == id;
        });

        if (index !== -1) {
            expenses.splice(index, 1);
            expenseItem.remove();
            updateTotal();
            updateEmptyState();
            
        }
    }
});