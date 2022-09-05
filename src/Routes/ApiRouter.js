const { Router } = require('express');
const { ApiController } = require('../Controllers/ApiController');
const router = Router();

router.get('/guid', ApiController.guidController);
router.get('/uid', ApiController.uidController);


module.exports = router;