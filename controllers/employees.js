// GET employees listing.

const Employee = require('../models/db.js');

module.exports =
function(req, res)
{
    Employee.find(function(err, employees)
    {
        res.send(employees);
    });
};
