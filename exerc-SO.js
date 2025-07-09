const os = require("node:os")
const fs = require("node:fs")
const path = require("node:path")

function exibeinfos(){
    //console.clear()
    const osinfo=os.platform()
    const arq = os.arch()
    const cpusinfo = os.cpus()[0].model
    const ativ = ((os.uptime()/60)/60).toFixed(2)
    const memuse = ((os.totalmem()-os.freemem())/(1024*1024)).toFixed(2)
    const memuseperc=Math.round((memuse/(os.totalmem()/(1024*1024)))*100)
    console.log("SO: ", osinfo)
    console.log("Arquitetura: ", arq)
    console.log("Processador: ", cpusinfo)
    console.log("Tempo de atividade: ", ativ, "H")
    console.log("Uso de memória: ", memuseperc,"%")
    const data = `${osinfo},${arq}, ${cpusinfo}, ${ativ}, ${memuseperc+"%"} \n`
    
    return data
}
setInterval(()=>{
    exibeinfos()
    createFile()
}, 1000)

function createFile(){
    const dire = path.join(__dirname, "log")
    if(!fs.existsSync(dire)){
        fs.mkdirSync(dire)
        console.log("Pasta LOG criada.")
    }
    const diree = path.join(dire, "/log.txt")
    fs.appendFile(diree, exibeinfos(), "utf-8", (error) =>{
        if (error){
            console.log("Erro ao atualizar arquivo")
            return
        }else{
            console.log("Arquivo atualizado com sucesso")
        }
    })
}

/* const readline = require("node:readline")
const rl = readline.createInterface({input: process.stdin, output: process.stdout})
rl.on("close", () =>{rl.write("getting out...")})
rl.on("SIGINT", ()=> {
    rl.question("Realmente quer sair? (s/n)", (resposta) =>{
        if(resposta.trim()==='s'){
            rl.close()
        } else {
            rl.write("Ok hombre! Ficando!")
        }
    })
}) */
