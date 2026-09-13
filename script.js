const expenseTable = document.getElementById("expense-table");
const totalExpenseDisplay = document.getElementById("total-expense");
const categoryFilter = document.getElementById("category-filter");
const addExpenseButton = document.getElementById("add-expense");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseDate = document.getElementById("expense-date");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editingExpenseId = null;
let deletingExpenseId = null;
let expenseChart = null;

function updateUI(list = expenses) {
    expenseTable.innerHTML = "";
    let total = 0;

    if (list.length === 0) {
        const emptyMessageRow = document.createElement("tr");
        emptyMessageRow.innerHTML = `<td colspan='5' class='empty-table-message'>No expenses recorded.</td>`;
        expenseTable.appendChild(emptyMessageRow);
    } else {
        list.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td data-label="Expense Name">${expense.name}</td>
            <td data-label="Amount">Rp${expense.amount.toLocaleString("id-ID")}</td>
            <td data-label="Category">${expense.category}</td>
            <td data-label="Date">${expense.date}</td>
            <td>
            <button class='edit-btn' onclick='openEditModal(${expense.id})'>Edit</button>
            <button class='delete-btn' onclick='openDeleteModal(${expense.id})'>Delete</button>
            </td>`;
            expenseTable.appendChild(row);
            total += expense.amount;
        });
    }
    totalExpenseDisplay.textContent = total.toLocaleString("id-ID");
}
function checkInputs() {
    if (expenseName.value.trim() && expenseAmount.value && expenseCategory.value && expenseDate.value) {
        addExpenseButton.disabled = false;
    } else {
        addExpenseButton.disabled = true;
    }
}
[expenseName, expenseAmount, expenseCategory, expenseDate].forEach(input => {
    input.addEventListener("input", checkInputs);
});
addExpenseButton.addEventListener("click", () => {
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const category = expenseCategory.value;
    const date = expenseDate.value;

    if (!name || isNaN(amount) || !date) {
        alert("Please fill in all fields.");
        return;
    }
    const expense = { id: Date.now(), name, amount, category, date };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    expenseName.value = "";
    expenseAmount.value = "";
    expenseCategory.value = "";
    expenseDate.value = "";
    addExpenseButton.disabled = true;

    updateUI();
    updateChart();
});
function openEditModal(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (!expense) return;

    document.getElementById("edit-expense-name").value = expense.name;
    document.getElementById("edit-expense-amount").value = expense.amount;
    document.getElementById("edit-expense-category").value = expense.category;
    document.getElementById("edit-expense-date").value = expense.date;

    editingExpenseId = id;
    openModal("edit-modal");
}
document.getElementById("confirm-edit").addEventListener("click", () => {
    const name = document.getElementById("edit-expense-name").value.trim();
    const amount = parseFloat(document.getElementById("edit-expense-amount").value);
    const category = document.getElementById("edit-expense-category").value;
    const date = document.getElementById("edit-expense-date").value;

    if (!name || isNaN(amount) || !date) {
        alert("Please fill in all fields.");
        return;
    }
    const index = expenses.findIndex(exp => exp.id === editingExpenseId);
    if (index > -1) {
        expenses[index] = { id: editingExpenseId, name, amount, category, date };
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateUI();
        updateChart();
    }
    closeModal("edit-modal");
});
function openDeleteModal(id) {
    deletingExpenseId = id;
    openModal("delete-modal");
}
document.getElementById("confirm-delete").addEventListener("click", () => {
    expenses = expenses.filter(exp => exp.id !== deletingExpenseId);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateUI();
    updateChart();
    closeModal("delete-modal");
});
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
categoryFilter.addEventListener("change", () => {
    const all = JSON.parse(localStorage.getItem("expenses")) || [];
    const filterValue = categoryFilter.value;
    const filtered = filterValue !== "All" ? all.filter(exp => exp.category === filterValue) : all;
    updateUI(filtered);
    updateChart(filtered);
});
function updateChart(list = expenses) {
    const categories = ["Food", "Transport", "Shopping", "Other"];
    const totals = categories.map(cat =>
        list.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0),
    );

    const ctx = document.getElementById("expense-chart").getContext("2d");

    if (expenseChart) {
        expenseChart.data.datasets[0].data = totals;
        expenseChart.update();
    } else {
        expenseChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: categories,
                datasets: [
                    {
                        data: totals,
                        backgroundColor: ["#28a745", "#007bff", "#ffc107", "#dc3545"],
                    },
                ],
            },
            options: {
                plugins: {
                    legend: { position: "bottom" },
                },
            },
        });
    }
}

updateUI();
updateChart();
