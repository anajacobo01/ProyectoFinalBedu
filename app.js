const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(helmet()); 
app.use(cors()) 

app.use('/api', require('./routes'));



app.listen(3001, () => {
    console.log(`Express on port 3001`);
  });



module.exports = router;

