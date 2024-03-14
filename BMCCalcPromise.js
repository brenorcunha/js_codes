//With ASYNC and AWAIT
let status = true
async function BMCCalc(weight, height){
    return new Promise((resolve, reject) => {
        console.log("The promise is running...")
         if(isNaN(weight) || isNaN(height) ){
                status = false
                reject("Incorrect type of data!")
            } else{
                console.log("Solving the promise...")
                BMC = weight/(height**2)
                resolve(BMC)
            }
    })
}
async function run(){
    const bmc = await BMCCalc(60, "null")
	if(status==true){
        console.log(`Your BMC index is: ${BMC}`);
    	console.log("Less than 18.5: Underweight. ");
    	console.log("Between 18.6 and 24.9: Normal weight. ");
    	console.log("Between 25 and 29.9 = Light overweight. ");
    	console.log("Between 30 and 34.9 = Grade 1 obesity. ");
    	console.log("Between 35 and 39,9 = Grade 2 obesity. ");
    	console.log("More than 40: Morbid obesity. ");
    }
}

run().then((result) =>{
    console.log(`The promise has been resolved.`)
}).catch((err) =>{
    console.log(`The promise was rejected. RESULT: ${err}`)
})

//With just PROMISE
/* 
let status = true
function BMCCalc(weight, height){
    return new Promise((resolve, reject) => {
        console.log("The promise is running...")
         if(isNaN(weight) || isNaN(height) ){
                status = false
                reject("Incorrect type of data!")
            } else{
                console.log("Solving the promise... JAS")
                BMC = weight/(height**2)
                resolve(BMC)
            }
    }).then((result) =>{
    console.log(`The promise has been resolved.`)
}).catch((err) =>{
    console.log(`The promise was rejected. RESULT: ${err}`)
})
}
function calc2(weight, height){
    BMCCalc(weight, height)
    if(status==true){
        console.log(`Your BMC index is: ${BMC}`);
    	console.log("Less than 18.5: Underweight. ");
    	console.log("Between 18.6 and 24.9: Normal weight. ");
    	console.log("Between 25 and 29.9 = Light overweight. ");
    	console.log("Between 30 and 34.9 = Grade 1 obesity. ");
    	console.log("Between 35 and 39,9 = Grade 2 obesity. ");
    	console.log("More than 40: Morbid obesity. ");
    }
    console.log("Finalizando promise(calc2)")
}
calc2(60, 1.86) */