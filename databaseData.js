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
exports.getStatus = exports.getName = exports.getTokenInput = exports.showUserToken = exports.showValues = exports.insertToDatabase = exports.formsContent = void 0;
var pg_1 = require("pg");
exports.formsContent = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Lab 2',
    password: 'shawn',
    port: 5433
});
function insertToDatabase(data) {
    return __awaiter(this, void 0, void 0, function () {
        var connectDatabase, pushContent, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, exports.formsContent.connect()];
                case 1:
                    connectDatabase = _a.sent();
                    return [4 /*yield*/, connectDatabase.query("\n    INSERT INTO loans(name,email,phone_number,amount, reason, status, token, date_approved, deadline) \n    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)", [data.name, data.email, data.phone_number,
                            data.amount, data.reason, data.status, data.token, data.date_approved, data.deadline])];
                case 2:
                    pushContent = _a.sent();
                    console.log("Sent to database!");
                    return [2 /*return*/, pushContent];
                case 3:
                    error_1 = _a.sent();
                    console.log("Error inserting data into the database:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.insertToDatabase = insertToDatabase;
function showValues() {
    return __awaiter(this, void 0, void 0, function () {
        var accessDatabaseValues, getLoanAmount, loanAmountValues, yourLoan, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.formsContent.connect()];
                case 1:
                    accessDatabaseValues = _a.sent();
                    return [4 /*yield*/, accessDatabaseValues.query("SELECT amount FROM loans")];
                case 2:
                    getLoanAmount = _a.sent();
                    loanAmountValues = getLoanAmount.rows;
                    yourLoan = [];
                    for (i = 0; i < loanAmountValues.length; i++) {
                        yourLoan.push(loanAmountValues[i].amount);
                    }
                    return [2 /*return*/, yourLoan.pop()];
            }
        });
    });
}
exports.showValues = showValues;
function showUserToken() {
    return __awaiter(this, void 0, void 0, function () {
        var accessDatabase, getUserToken, databaseTokenValues, yourToken, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.formsContent.connect()];
                case 1:
                    accessDatabase = _a.sent();
                    return [4 /*yield*/, accessDatabase.query("SELECT token FROM loans")];
                case 2:
                    getUserToken = _a.sent();
                    databaseTokenValues = getUserToken.rows;
                    yourToken = [];
                    for (i = 0; i < databaseTokenValues.length; i++) {
                        yourToken.push(databaseTokenValues[i].token);
                    }
                    return [2 /*return*/, yourToken.pop()];
            }
        });
    });
}
exports.showUserToken = showUserToken;
function getTokenInput(token) {
    return __awaiter(this, void 0, void 0, function () {
        var openDatabase, compareTokenInput, compareToDatabase, showLoan, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.formsContent.connect()];
                case 1:
                    openDatabase = _a.sent();
                    return [4 /*yield*/, openDatabase.query("\n  SELECT token, amount FROM loans \n  WHERE token = '".concat(token, "'"))];
                case 2:
                    compareTokenInput = _a.sent();
                    compareToDatabase = compareTokenInput.rows;
                    showLoan = 0;
                    for (i = 0; i < compareToDatabase.length; i++) {
                        showLoan += Number(compareToDatabase[i].amount);
                    }
                    return [2 /*return*/, showLoan];
            }
        });
    });
}
exports.getTokenInput = getTokenInput;
function getName(token) {
    return __awaiter(this, void 0, void 0, function () {
        var databaseAccess, compareInput, loanName, name, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.formsContent.connect()];
                case 1:
                    databaseAccess = _a.sent();
                    return [4 /*yield*/, databaseAccess.query("\n  SELECT token, name FROM loans \n  WHERE token = '".concat(token, "'"))];
                case 2:
                    compareInput = _a.sent();
                    loanName = compareInput.rows;
                    name = '';
                    for (i = 0; i < loanName.length; i++) {
                        name += loanName[i].name;
                    }
                    return [2 /*return*/, name];
            }
        });
    });
}
exports.getName = getName;
function getStatus(token) {
    return __awaiter(this, void 0, void 0, function () {
        var databaseAccess, compareInput, loanName, status, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.formsContent.connect()];
                case 1:
                    databaseAccess = _a.sent();
                    return [4 /*yield*/, databaseAccess.query("\n  SELECT token, status FROM loans \n  WHERE token = '".concat(token, "'"))];
                case 2:
                    compareInput = _a.sent();
                    loanName = compareInput.rows;
                    status = '';
                    for (i = 0; i < loanName.length; i++) {
                        status += String(loanName[i].status);
                    }
                    return [2 /*return*/, status];
            }
        });
    });
}
exports.getStatus = getStatus;
