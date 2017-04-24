const express = require('express'),
      router = express.Router()

router.get('/', (req,res)=>{
    res.send("Test")
    console.log('test')
})

module.exports = router;
