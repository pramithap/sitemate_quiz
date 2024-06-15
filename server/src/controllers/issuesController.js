const issues = require('../data/data'); //import data
console.log(issues);

class IssuesController {
    constructor() {
        this.items = issues;
    }

    getIssues(req, res) {
        res.json(this.items);
    }
    
    //create
    addIssue(req, res) {
        const newItem = req.body;
        this.items.push(newItem);
        res.status(201).json(newItem);
    }
    
    //update
    updateIssue(req, res) {
        const id = parseInt(req.params.id, 10);
        const updatedItem = req.body;
        let issueIndex = this.items.findIndex(item => item.id === id);

        if (issueIndex !== -1) {
            this.items[issueIndex] = { ...this.items[issueIndex], ...updatedItem };
            res.json(this.items[issueIndex]);
        } else {
            res.status(404).send('data not found!!!');
        }
    }
    
    //delete
    deleteIssue(req, res) {
        const id = parseInt(req.params.id, 10);
        this.items = this.items.filter(item => item.id !== id);
        res.status(204).end();
    }

}

module.exports = new IssuesController();
