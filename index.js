var express = require('express');
var cors = require('cors');
const multer = require('multer');

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    const {mimetype: type, originalname: name, size} = req.file;
    return res.json({name, type, size});
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Your app is listening on port ' + port)
});
