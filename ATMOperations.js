/* Deposit: Deverá possuir um atributo para o valor e um atributo para a data de criação.(OK)
Transfer: Deverá possuir atributos para: o usuário que enviou a transferência, o que recebeu a transferência, o valor e a data de criação. (OK)
Loan: Deverá possuir um atributo estático privado para a taxa de juros e que possuir um getter estático para ler o atributo privado e um setter estático para definir uma nova taxa de juros a partir de uma porcentagem (OK).
 Deverá possuir os atributos para o valor do empréstimo e para a data de criação. Também deverá possuir um atributo para as parcelas do empréstimo, sendo que o construtor deve ter como parâmetro o número de parcelas e então deve calcular as parcelas (instâncias de Installments) e armazená-las nesse atributo. (OK)

Installment: Deve possuir atributos para: o valor da parcela, o número dela e sua situação (paga ou pendente) (OK)
Account: 
Deve possuir atributos para: o saldo, todos os depósitos realizados, todos os empréstimos, todas as transferências e para o dono da conta. (OK)
O atributo do saldo deve ser privado e somente de leitura, ou seja, seu valor não pode ser reatribuído, somente podendo ser modificado através dos depósitos, empréstimos e transferências. (OK)
Deve possuir um mé\ntodo para fazer um novo depósito, onde o valor do deposito será acrescentado ao saldo e a instância de Deposit ao atributos array de depósitos. (OK)
Deve possuir um mé\ntodo para fazer um novo empréstimo, que deverá acrescentar o valor do empréstimo ao saldo e salvar a instância de Loan no atributo array de empréstimos. (OK)
Deve possuir um mé\ntodo de fazer uma transferência, onde é verificado se a transferência foi feita para o dono da conta ou pelo dono da conta para outro usuário. Se feito para o dono da conta, o valor dela deve ser acrescentado ao saldo. Se feito pelo dono da conta para outro usuário, o valor dela deve ser descontado do saldo. Além disso, a transferência deve ser salva no atributo array de transferências. (OK)
User: Deve possuir atributos para nome completo, email e conta. (OK)
 App: 
Deve possuir um mé\ntodo estático para criar um novo usuário que só permite criar um usuário por email, ou seja, se o email já estiver sendo usado por outro usuário não deverá ser utilizado novamente. (OK)
Deve possuir um mé\ntodo estático para encontrar um usuário a partir do seu email. (OK)
Deve possuir mé\ntodos estáticos para realizar as operações de depósito, transferência e empréstimo. Elas devem ter como parâmetro as informações necessárias, como o email do usuário que está realizando a operação e o valor. (OK)
Deve possuir um mé\ntodo para alterar a taxa dos empréstimos.(OK)
 */
class Deposit {
  constructor(value) {
    this.value = value;
    this.createdAt = new Date();
  }
}

class Transfer {
  constructor(userSent, userRec, value) {
    this.userSent = userSent;
    this.userRec = userRec;
    this.value = value;
    this.createdAt = new Date();
  }
}
class Loan {
  //Emprestimo
  static #intRate = 1.05;
  constructor(value, installments) {
    this.value = value;
    this.installments = [];
    for (let i = 1; i <= installments; i++) {
      this.installments.push(
        new Installment((value * Loan.#intRate) / installments, i)
      );
    }
    this.createdAt = new Date();
  }
  static get getRate() {
    return Loan.#intRate;
  }
  static set setRate(perc) {
     Loan.#intRate = 1 + perc / 100;
  }
}
class Installment {
  constructor(value, nr) {
    this.value = value;
    this.nr = nr;
    this.status = "pending";
  }
}
class Account {
  #balance;
  constructor(user) {
    this.#balance = 0;
    this.deposits = [];
    this.transfers = [];
    this.loans = [];
    this.owner = User;
  }
  get getBalance() {
    return this.#balance;
  }
  makeDeposit(deposit) {
    this.#balance += deposit.value;
    this.deposits.push(deposit);
  }
  makeTransfer(transfer) {
    if (transfer.userRec.email === this.owner.email) {
      this.#balance += transfer.value;
      this.transfers.push(transfer);
    } else if (transfer.userSent.email === this.owner.email) {
      this.#balance -= transfer.value;
      this.transfers.push(transfer);
    }
  }
  makeLoan(loan) {
    this.#balance += loan.value;
    this.loans.push(loan);
  }
}
class User {
  constructor(fullName, email) {
    this.fullName = fullName;
    this.email = email;
    this.account = new Account(this);
  }
}
class App {
  #intRate;
  static #users = [];
  static createUser(email, fullName) {
    if (App.findUser(email)) {
      console.log("User already exists!");
    } else {
      this.#users.push(new User(fullName, email));
    }
  }
  static findUser(email) {
    const user = this.#users.find((user) => user.email === email);
    if(user){return user} else {return null;}
  }
  static makeDeposit(email, value) {
    const user = App.findUser(email);
    if (user) {
      const newDeposit = new Deposit(value);
      user.account.makeDeposit(newDeposit);
    }
  }
  static makeTransfer(userSent, userRec, value) {
    const userSent1 = App.findUser(userSent);
    const userRec1 = App.findUser(userRec);

    if (userSent1 && userRec1) {
      const newTransfer = new Transfer(userSent, userRec, value);
      userSent1.account.makeTransfer(newTransfer);
      userRec1.account.makeTransfer(newTransfer);
    }
  }
  static makeLoan(email, value, installments) {
    const user = App.findUser(email);
    if (user) {
      const newLoan = new Loan(value, installments);
      user.account.makeLoan(newLoan);
    }
  }

  static changeintRate(perc) {
    Loan.setRate=perc;
  } 
}

App.createUser("breno@email.com", "Breno da Cunha");
App.createUser("sandral@email.com", "Sandra da Cunha");
App.createUser("josehac@email.com", "José H A C");

App.makeDeposit("sandral@email.com", 1000);
App.makeTransfer("josehac@email.com", "breno@email.com", 100);
App.changeintRate(15);
App.makeLoan("sandral@email.com", 1000, 10);

console.log(App.findUser("breno@email.com"));
console.log(App.findUser("breno@email.com").account);

console.log(App.findUser("sandral@email.com"));
console.log(App.findUser("sandral@email.com").account);
console.log(App.findUser("sandral@email.com").account.loans[0].installments);
console.log(App.findUser("josehac@email.com"));
console.log(App.findUser("josehac@email.com").account);

console.log(App.findUser("breno@email.com").account.getBalance)
console.log(App.findUser("sandral@email.com").account.getBalance)
console.log(App.findUser("josehac@email.com").account.getBalance)
