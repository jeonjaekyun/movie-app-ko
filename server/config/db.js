const mongoose = require('mongoose');

//local mongodb랑 연결하는 코드
module.exports = () => {
    function connect() {
        mongoose.connect('mongodb://localhost:27017', 
        {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false, dbName: 'test' }, 
        function (err) {
            if (err) {
                console.error('mongodb connection error', err);
            } else {
                console.log('mongodb connected');
            }
        });
    }
    connect();
    mongoose.connection.on('disconnected', connect);
}