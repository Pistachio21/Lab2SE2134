import { IncomingMessage, ServerResponse } from 'node:http';
import * as http from 'node:http';
import * as fs from 'node:fs';
import { insertToDatabase, showValues, showUserToken, getTokenInput, getName, getStatus } from './databaseData';
const crypto = require('node:crypto')
const querystring = require('node:querystring')

async function handleRequest(request: IncomingMessage, response: ServerResponse) {
  const url = request.url;
  const method = request.method;

  console.log('Debugging -- url is', url, 'while method is', method);

  if (url === '/apply-loan') {
    try {
      const mainHTMLContent = fs.readFileSync('./main.html', 'utf-8');
      response.writeHead(200, { 'Content-Type': 'text/html' }).end(mainHTMLContent);
    } catch (error) {
      console.log(error);
    }
  } else if (url === '/apply-loan-success' && method === 'POST') {
    let content = '';
    request.on('data', function(chunk) {
      content += chunk.toString();
    });
    request.on('end', async function () {
      let form = querystring.parse(content)
      let loanName: string = form.name
      let loanEmail: string = form.email
      let loanNumber: string = form.phone

      let loanAmount: number = Number(form.amount)
      let loanReason: string = form.reason
      let loanStatus
      if (Number.isNaN(loanAmount)) {
        loanStatus = 'rejected'
      } else if (loanAmount === await showValues()) {
        loanStatus = 'Repaid'
      } else if (loanName === loanName.toString()) {
        loanStatus = 'applied'
      } else if (loanAmount === Number(loanAmount) && 
      loanName === String(loanName))  {
        loanStatus = 'approved'
      } else {
        loanStatus = 'cash released'
      }
      let loanToken = crypto.randomBytes(32).toString('base64url')
      let dateApproved = new Date()

      try {
        await insertToDatabase(
          {
            name: String(loanName),
            email: String(loanEmail),
            phone_number: String(loanNumber),
            amount: loanAmount,
            reason: String(loanReason),
            status : loanStatus,
            token: String(loanToken),
            date_approved : String(dateApproved),
            deadline : String(dateApproved)
          }
        )
        const html = /* html */`
          <!DOCTYPE html>
          <html lang="en">

          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
          </head>

          <body>
          <form action = "/loan-status" method = "POST">
          Your loan:
          ${await showValues()}<br>
          Date issued: ${dateApproved}<br>
          Your deadline is : ${dateApproved.toLocaleString()}<br>
          Your token is: ${await showUserToken()}<br>
          <button type = "submit">Click here to check the status of your loan</button>
          </form>
          </body>

          </html>`;
        response.writeHead(200, {'Content-Type': 'text/html' }).end(html);
      } catch (error) {
        console.log("Error happened.", error)
      }
    }
  )

  } else if (url === '/loan-status') {
    const html = /* html */ `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      
      <body>
      Please enter your token:
      <form action="/apply-loan-status-verification" method = "POST" id='loanToken'>
      <input type = "text" name = "token"><br>
      <button>Click to check the status of your loan</button>
        </form>
      </body>
      </html>
    `;
    response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
  } else if (url === "/apply-loan-status-verification" && method === "POST") {

    let content = '';
    request.on('data', function(chunk) {
      content += chunk.toString();
    });

    request.on('end', async function() {
      let html = ''
      let getToken = querystring.parse(content)
      let userToken = String(getToken.token)
      try {
        const token = await getTokenInput(userToken)
        if (token) {
          html = /* html */ `
          <!DOCTYPE html>
          <html lang="en">
          
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
          </head>
          
          <body>
          Your loan is : ${await getTokenInput(userToken)}<br>
          and it belongs to : ${await getName(userToken)}<br>
          Your loan status is : ${await getStatus(userToken)}
          </body>
          </html>
        `;
        } else {
          html = /* html */ `
          <!DOCTYPE html>
          <html lang="en">
          
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
          </head>
          
          <body>
          Invalid token detected, someone is trying to snoop around.
          </body>
          </html>
        `;
        }
      } catch (error) {
        console.log(error)
      }
      response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
    }
 )
  } else {
    response.writeHead(200, { 'Content-Type': 'text/plain' }).end(url);
  }
}
const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});