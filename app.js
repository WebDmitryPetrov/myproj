var express = require('express');
var path = require('path');//модуль работы с путями в файловой системе
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');


var app = express();
/*функция app.use фключает определенный middlewear(обработчик) в нашу цепочку */ 
app.use(logger('dev')); //логгирование(вывод проблем в консоль)
app.use(express.json()); //подключается модуль для обработки(парсинг) json-запросов
app.use(express.urlencoded({ extended: false }));//парсинг запросов с urlencoded данными(можем парсить запросы у которыйх нет body)
app.use(cookieParser());//позволяет обрабатывать(читать) куки-файлов ,кот. приходят от клиента
app.use(express.static(path.join(__dirname, 'public')));//сервируем статические файлы нашего веб-сайта из папки<путь к серверу>/public

app.use('/', usersRouter);
app.use('/', filmsRouter);

module.exports = app;
