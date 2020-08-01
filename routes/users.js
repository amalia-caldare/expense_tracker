const router = require('express');

const User = require('./User');

router.get('/user', async (req, res) => {
    const userDetails = await User.query().select('username').withGraphFetched('expenses');
    return res.send({response: userDetails});
})