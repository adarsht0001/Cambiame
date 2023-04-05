import http from 'http'
import express,{Application, NextFunction} from 'express';

const app:Application = express();
const server = http.createServer(app)