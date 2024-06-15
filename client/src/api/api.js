const config = require('../config/config');

class Api {
    constructor() {
        this.serverUrl = config.serverUrl;
    }

    async getIssues() {
        try {
            console.log(`Sending a GET request to ${this.serverUrl}/issues`);
            const response = await fetch(`${this.serverUrl}/issues`);
            if (!response.ok) {
                throw new Error(`Error in GET issues request: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            throw new Error(`Error in GET issues request: ${error.message}`);
        }
    }

    async addIssue(issue) {
        try {
            console.log(`Sending a POST request to ${this.serverUrl}/issues`, issue);
            const response = await fetch(`${this.serverUrl}/issues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(issue)
            });
            if (!response.ok) {
                throw new Error(`Error in POST issue request: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Error in POST issue request: ${error.message}`);
        }
    }

    async updateIssue(id, issue) {
        try {
            console.log(`Sending a PUT request to ${this.serverUrl}/issues/${id}`, issue);
            const response = await fetch(`${this.serverUrl}/issues/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(issue)
            });
            if (!response.ok) {
                throw new Error(`Error in PUT issue request: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Error in PUT issue request: ${error.message}`);
        }
    }

    async deleteIssue(id) {
        try {
            console.log(`Sending a DELETE request to ${this.serverUrl}/issues/${id}`);
            const response = await fetch(`${this.serverUrl}/issues/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error in DELETE issue request: ${response.statusText}`);
            }
        } catch (error) {
            throw new Error(`Error in DELETE issue request: ${error.message}`);
        }
    }
}

module.exports = new Api();
