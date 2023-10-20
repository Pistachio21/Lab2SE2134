"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("node:http");
var fs = require("node:fs");
var databaseData_1 = require("./databaseData");
var crypto = require('node:crypto');
var querystring = require('node:querystring');
function handleRequest(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var url, method, mainHTMLContent, content_1, html, content_2;
        return __generator(this, function (_a) {
            url = request.url;
            method = request.method;
            console.log('Debugging -- url is', url, 'while method is', method);
            if (url === '/apply-loan') {
                try {
                    mainHTMLContent = fs.readFileSync('./main.html', 'utf-8');
                    response.writeHead(200, { 'Content-Type': 'text/html' }).end(mainHTMLContent);
                }
                catch (error) {
                    console.log(error);
                }
            }
            else if (url === '/apply-loan-success' && method === 'POST') {
                content_1 = '';
                request.on('data', function (chunk) {
                    content_1 += chunk.toString();
                });
                request.on('end', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var form, loanName, loanEmail, loanNumber, loanAmount, loanReason, loanStatus, _a, loanToken, dateApproved, html, _b, _c, _d, error_1;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    form = querystring.parse(content_1);
                                    loanName = form.name;
                                    loanEmail = form.email;
                                    loanNumber = form.phone;
                                    loanAmount = Number(form.amount);
                                    loanReason = form.reason;
                                    if (!Number.isNaN(loanAmount)) return [3 /*break*/, 1];
                                    loanStatus = 'rejected';
                                    return [3 /*break*/, 3];
                                case 1:
                                    _a = loanAmount;
                                    return [4 /*yield*/, (0, databaseData_1.showValues)()];
                                case 2:
                                    if (_a === (_e.sent())) {
                                        loanStatus = 'Repaid';
                                    }
                                    else if (loanName === loanName.toString()) {
                                        loanStatus = 'applied';
                                    }
                                    else if (loanAmount === Number(loanAmount) &&
                                        loanName === String(loanName)) {
                                        loanStatus = 'approved';
                                    }
                                    else {
                                        loanStatus = 'cash released';
                                    }
                                    _e.label = 3;
                                case 3:
                                    loanToken = crypto.randomBytes(32).toString('base64url');
                                    dateApproved = new Date();
                                    _e.label = 4;
                                case 4:
                                    _e.trys.push([4, 8, , 9]);
                                    return [4 /*yield*/, (0, databaseData_1.insertToDatabase)({
                                            name: String(loanName),
                                            email: String(loanEmail),
                                            phone_number: String(loanNumber),
                                            amount: loanAmount,
                                            reason: String(loanReason),
                                            status: loanStatus,
                                            token: String(loanToken),
                                            date_approved: String(dateApproved),
                                            deadline: String(dateApproved)
                                        })];
                                case 5:
                                    _e.sent();
                                    _c = "\n          <!DOCTYPE html>\n          <html lang=\"en\">\n\n          <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>Document</title>\n          </head>\n\n          <body>\n          <form action = \"/loan-status\" method = \"POST\">\n          Your loan:\n          ".concat;
                                    return [4 /*yield*/, (0, databaseData_1.showValues)()];
                                case 6:
                                    _d = (_b = _c.apply("\n          <!DOCTYPE html>\n          <html lang=\"en\">\n\n          <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>Document</title>\n          </head>\n\n          <body>\n          <form action = \"/loan-status\" method = \"POST\">\n          Your loan:\n          ", [_e.sent(), "<br>\n          Date issued: "]).concat(dateApproved, "<br>\n          Your deadline is : ").concat(dateApproved.toLocaleString(), "<br>\n          Your token is: ")).concat;
                                    return [4 /*yield*/, (0, databaseData_1.showUserToken)()];
                                case 7:
                                    html = _d.apply(_b, [_e.sent(), "<br>\n          <button type = \"submit\">Click here to check the status of your loan</button>\n          </form>\n          </body>\n\n          </html>"]);
                                    response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
                                    return [3 /*break*/, 9];
                                case 8:
                                    error_1 = _e.sent();
                                    console.log("Error happened.", error_1);
                                    return [3 /*break*/, 9];
                                case 9: return [2 /*return*/];
                            }
                        });
                    });
                });
            }
            else if (url === '/loan-status') {
                html = "\n      <!DOCTYPE html>\n      <html lang=\"en\">\n      \n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Document</title>\n      </head>\n      \n      <body>\n      Please enter your token:\n      <form action=\"/apply-loan-status-verification\" method = \"POST\" id='loanToken'>\n      <input type = \"text\" name = \"token\"><br>\n      <button>Click to check the status of your loan</button>\n        </form>\n      </body>\n      </html>\n    ";
                response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
            }
            else if (url === "/apply-loan-status-verification" && method === "POST") {
                content_2 = '';
                request.on('data', function (chunk) {
                    content_2 += chunk.toString();
                });
                request.on('end', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var html, getToken, userToken, token, _a, _b, _c, _d, _e, error_2;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    html = '';
                                    getToken = querystring.parse(content_2);
                                    userToken = String(getToken.token);
                                    _f.label = 1;
                                case 1:
                                    _f.trys.push([1, 8, , 9]);
                                    return [4 /*yield*/, (0, databaseData_1.getTokenInput)(userToken)];
                                case 2:
                                    token = _f.sent();
                                    if (!token) return [3 /*break*/, 6];
                                    _c = "\n          <!DOCTYPE html>\n          <html lang=\"en\">\n          \n          <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>Document</title>\n          </head>\n          \n          <body>\n          Your loan is : ".concat;
                                    return [4 /*yield*/, (0, databaseData_1.getTokenInput)(userToken)];
                                case 3:
                                    _d = (_b = _c.apply("\n          <!DOCTYPE html>\n          <html lang=\"en\">\n          \n          <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>Document</title>\n          </head>\n          \n          <body>\n          Your loan is : ", [_f.sent(), "<br>\n          and it belongs to : "])).concat;
                                    return [4 /*yield*/, (0, databaseData_1.getName)(userToken)];
                                case 4:
                                    _e = (_a = _d.apply(_b, [_f.sent(), "<br>\n          Your loan status is : "])).concat;
                                    return [4 /*yield*/, (0, databaseData_1.getStatus)(userToken)];
                                case 5:
                                    html = /* html */ _e.apply(_a, [_f.sent(), "\n          </body>\n          </html>\n        "]);
                                    return [3 /*break*/, 7];
                                case 6:
                                    html = /*html*/ "\n          <!DOCTYPE html>\n          <html lang=\"en\">\n          \n          <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>Document</title>\n          </head>\n          \n          <body>\n          Invalid token detected, someone is trying to snoop around.\n          </body>\n          </html>\n        ";
                                    _f.label = 7;
                                case 7: return [3 /*break*/, 9];
                                case 8:
                                    error_2 = _f.sent();
                                    console.log(error_2);
                                    return [3 /*break*/, 9];
                                case 9:
                                    response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            }
            else {
                response.writeHead(200, { 'Content-Type': 'text/plain' }).end(url);
            }
            return [2 /*return*/];
        });
    });
}
var server = http.createServer(handleRequest);
server.listen(3000, function () {
    console.log('Server started at http://localhost:3000');
});
