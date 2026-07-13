
        document.addEventListener('DOMContentLoaded',() =>{
            const ExpenseForm = document.getElementById("expense-form");
            const ExpenseName = document.getElementById("expense-name");
            const ExpenseAmount = document.getElementById("expense-amount");
            const ExpenseList = document.getElementById("expense-list");
            const TotalAmountDisplay = document.getElementById("total-amount");
            
            let expenses = JSON.parse(localStorage.getItem('expenses')) ||[];
            let totalAmount = calculateAmount();
            renderExpense();
            
            ExpenseForm.addEventListener('submit' ,(e) =>{
                e.preventDefault();
                const name = ExpenseName.value.trim();
                const Amount = parseFloat(ExpenseAmount.value);
                
                if(name!="" && !isNaN(Amount) && Amount>0){
                    const newExpense = {
                        id: Date.now(),
                        name,
                        Amount
                    }
                    expenses.push(newExpense);
                    saveExpense();
                    renderExpense();
                    ExpenseName.value = "";
                    ExpenseAmount.value = "";
                    updateTotal();
                }
            })
            
            function updateTotal(){
                totalAmount = calculateAmount();
                TotalAmountDisplay.textContent = totalAmount;
            }
            
            function calculateAmount(){
                return expenses.reduce((sum , expense) => sum + expense.Amount, 0 );
            }
            
            function saveExpense(){
                localStorage.setItem('expenses' , JSON.stringify(expenses));
            }
            
            function renderExpense(){
                ExpenseList.innerHTML = "";
                expenses.forEach((expense) =>{
                    const li = document.createElement('li');
                    li.innerHTML = `
                    ${expense.name} - $${expense.Amount}
                    <button data-id ="${expense.id}">Delete</button>
                    `;
                    ExpenseList.appendChild(li);
                });
            }
            
            ExpenseList.addEventListener("click" ,(e) =>{
                if(e.target.tagName === "BUTTON"){
                    const ExpenseId = parseInt(e.target.getAttribute("data-id"));
                    expenses =  expenses.filter((expense) => expense.id !== ExpenseId );
                    saveExpense();
                    renderExpense();
                    updateTotal();
               
                }
            })

        })
        
  
