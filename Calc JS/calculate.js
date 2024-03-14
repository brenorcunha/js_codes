export default function calculate() {
    const resultInput = document.getElementById("result")
    resultInput.value = "ERROR"
    resultInput.classList.add("error")
    const result = eval(input.value)
    resultInput.value = result
    resultInput.classList.remove("error")
    //Nesta funcao, ela executa as 2 primeiras linhas, e se passar do eval, exibe resultado normalmente.
    //As 1as linhas sempre exibem o erro, mas depois é limpo, super rápido, por isso não percebemos.
  }