import { Pool } from 'pg'
export const formsContent = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Lab 2',
  password: 'shawn',
  port: 5433
})


export async function insertToDatabase(data: {
  name: string, email: string, phone_number: string,
  amount: number, reason: string, status : string, 
  token : string, date_approved: string, deadline: string}) {

  try {
    let connectDatabase = await formsContent.connect()
    let pushContent = await connectDatabase.query(`
    INSERT INTO loans(name,email,phone_number,amount, reason, status, token, date_approved, deadline) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [data.name, data.email, data.phone_number, 
      data.amount, data.reason,data.status,data.token, data.date_approved, data.deadline])
    console.log(`Sent to database!`)
    return pushContent
  } catch (error) {
    console.log("Error inserting data into the database:", error)
  }
}


export async function showValues() {
  let accessDatabaseValues = await formsContent.connect()
let getLoanAmount = await accessDatabaseValues.query(`SELECT amount FROM loans`)
let loanAmountValues = getLoanAmount.rows
let yourLoan : number[] = []

for (let i = 0; i < loanAmountValues.length; i++) {
  yourLoan.push(loanAmountValues[i].amount)
}
return yourLoan.pop()
}


export async function showUserToken() {
  let accessDatabase = await formsContent.connect()
let getUserToken = await accessDatabase.query(`SELECT token FROM loans`)
let databaseTokenValues = getUserToken.rows
let yourToken : string[] = []

for (let i = 0; i < databaseTokenValues.length; i++) {
  yourToken.push(databaseTokenValues[i].token)
}
return yourToken.pop()
}

export async function getTokenInput(token: string) {
  let openDatabase = await formsContent.connect()
  let compareTokenInput = await openDatabase.query(`
  SELECT token, amount FROM loans 
  WHERE token = '${token}'`)
  let compareToDatabase = compareTokenInput.rows
  let showLoan = 0
  
  for (let i = 0; i < compareToDatabase.length; i++) {
    showLoan += Number(compareToDatabase[i].amount)
  }
  return showLoan
}


export async function getName(token: string) {
  let databaseAccess = await formsContent.connect()
  let compareInput = await databaseAccess.query(`
  SELECT token, name FROM loans 
  WHERE token = '${token}'`)
  let loanName = compareInput.rows
  let name = ''
  
  for (let i = 0; i < loanName.length; i++) {
    name += loanName[i].name
  }
  return name
}

export async function getStatus(token: string) {
  let databaseAccess = await formsContent.connect()
  let compareInput = await databaseAccess.query(`
  SELECT token, status FROM loans 
  WHERE token = '${token}'`)
  let loanName = compareInput.rows
  let status = ''
  
  for (let i = 0; i < loanName.length; i++) {
    status += String(loanName[i].status)
  }
  return status
}