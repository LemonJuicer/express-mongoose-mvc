const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const employeeSchema = new Schema({
    name: String,
    address: String,
    phone: String,
    email: String,
});

module.exports = mongoose.model('Employee', employeeSchema);
