let personalFinanceAPI = [];

const form = document.querySelector('form')
form.addEventListener('submit', async(ev) =>{
  ev.preventDefault()
  const id = document.querySelector('#id').value;
  const name = document.querySelector('#name').value;
  const amount = parseFloat(document.querySelector('#value').value);
  console.log('Value: ', amount);
  if (id && name.trim() !=="" && !Number.isNaN(amount)) {
    const response = await fetch(
      `http://localhost:3000/personalFinanceAPI/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, amount}),
      }
    )
    const transaction = await response.json()

    const indextoRemove = personalFinanceAPI.findIndex((p) => p.id === id);
    personalFinanceAPI.splice(indextoRemove, 1, transaction);
    document.querySelector(`#transaction-${id}`).remove();
    renderTransaction(transaction);
  } else if(name.trim() !=="" && !Number.isNaN(amount)){
    const response = await fetch('http://localhost:3000/personalFinanceAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, amount}),
    })//.then((res) => res.json());
    const transaction = await response.json()
    
    personalFinanceAPI.push(transaction);
    renderTransaction(transaction);
    ev.target.reset()
    updateBalance()
  } else console.log("Híjole! No obtuvo un número! :C")
})

function createButton(transaction) {
  const btn = document.createElement('button');
  btn.classList.add('transaction');
  btn.id = 'btn-${transaction.id}';
  btn.innerHTML = 'Edit';

  btn.addEventListener('click', async function () {
    document.getElementById('id').value = transaction.id;
    document.getElementById('name').value = transaction.name;
    transaction.amount = parseFloat(document.querySelector('#value').value);
  });
  return btn;
}
function createDeleteTransactionButton(id) {
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('transaction');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/personalFinanceAPI/${id}`, {
      method: 'DELETE',
    });
    deleteBtn.parentElement.remove();
    const indexToRemove = personalFinanceAPI.findIndex((p) => p.id === id);
    personalFinanceAPI.splice(indexToRemove, 1);
    updateBalance();
  });
  return deleteBtn;
}

function renderTransaction(transaction) {
  const container = document.createElement('div');
  container.classList.add('transactions');
  container.id = `trans-${transaction.id}`;
  
  const name = document.createElement('span');
  name.classList.add('transactions');
  name.textContent = transaction.name;

  const br = document.createElement("br");
  br.classList.add('transactions')
  const span = document.createElement('span');
  const amount = transaction.amount
  console.log('Value 2: ', amount);
  span.classList.add('transactions');
  const formater = Intl.NumberFormat('pt-BR', {
    compactDisplay: 'long',
    currency: 'BRL',
    style: 'currency',
  });
  const formatedAmount = formater.format(amount);
  span.textContent = `${amount}`;

  container.append(name, br, formatedAmount, createButton(transaction), createDeleteTransactionButton(transaction.id));
  document.querySelector('#operations').appendChild(container);
}

function updateBalance() {
  const balSpan = document.querySelector('#balance');
  balSpan.classList.add('transactions')
  const balance = personalFinanceAPI.reduce(
    (sum, personalFinanceAPI) => sum + personalFinanceAPI.amount,
    0
  );
  const formater = Intl.NumberFormat('pt-BR', {
    compactDisplay: 'long',
    currency: 'BRL',
    style: 'currency',
  });
  balSpan.textContent = formater.format(balance);
}

async function setup() {
  const results = await fetchTransactions();
  personalFinanceAPI.push(...results);
  personalFinanceAPI.forEach(renderTransaction);
  //ev.target.reset();
  updateBalance();
}
async function fetchTransactions() {
  return await fetch('http://localhost:3000/personalFinanceAPI').then((res) =>
    res.json()
  );
}
document.addEventListener('DOMContentLoaded', setup);