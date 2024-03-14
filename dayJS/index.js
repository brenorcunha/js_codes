const dayjs = require('dayjs')

function birthday(date){
	const birthday=dayjs(date)
	const today = dayjs() //Pega data de hoje.
	const ageInYears = today.diff(birthday, 'year')
	console.log(`idade: ${ageInYears}`)
	const nextBirthday = dayjs(date).add(ageInYears+1, 'year').format('DD/MM/YYYY')
	console.log(`próximo niver: ${nextBirthday}`)
	const days = nextBirthday.diff(today, 'day')
	console.log(`Faltam ${days} dias para ele!`)
}
birthday("1995-6-20")