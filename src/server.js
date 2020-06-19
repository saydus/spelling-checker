"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sirv_1 = __importDefault(require("sirv"));
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var sapper = __importStar(require("@sapper/server"));
var _a = process.env, PORT = _a.PORT, NODE_ENV = _a.NODE_ENV;
var dev = NODE_ENV === 'development';
var app = express_1.default();
app.use(compression_1.default({ threshold: 0 }), sirv_1.default('static', { dev: dev }), sapper.middleware());
app.get('/ger', function (req, res) {
    res.send('Post');
});
app.listen(PORT, function (err) {
    if (err)
        console.log('error', err);
});
