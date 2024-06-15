const express = require('express');
const router = express.Router();
const issuesController = require('../controllers/issuesController');

router.get('/issues', (req, res) => issuesController.getIssues(req, res));

//create
router.post('/issues', (req, res) => issuesController.addIssue(req, res));
//update
router.put('/issues/:id', (req, res) => issuesController.updateIssue(req, res));

//delete
router.delete('/issues/:id', (req, res) => issuesController.deleteIssue(req, res));

module.exports = router;