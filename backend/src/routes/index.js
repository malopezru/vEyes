const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
    const data = {
        "name": "Mateo",
        "website": "hola.com"
    }
    res.json({data});
})

module.exports = router;