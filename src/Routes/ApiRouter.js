const { Router } = require('express');
const { ApiController } = require('../Controllers/ApiController');
const { HealthCheckController } = require('../Controllers/HealthCheckController');
const router = Router();

router.get('/guid', ApiController.guidController);
router.get('/uid', ApiController.uidController);
router.get('/health-check', HealthCheckController.healthCheck);

module.exports = router;