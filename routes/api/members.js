const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members'); 




// get all members
router.get('/', (req, res) => res.json(members));

// get single mamber
router.get('/:id', (req, res) =>{

    // req.params.id will send a string => need to wrap them into parseInt
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

// create memebers
router.post('/', (req, res) => {
    const newMemnber = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMemnber.name || !newMemnber.email) {
       return res.status(400).json({ msg: 'Please include a name and email' });
    }
    members.push(newMemnber);
    res.json(members);
    // res.redirect('/');
})

// update members
// on postman, select request type, header = 'content-type', body type = 'raw', then change what is needed
router.put('/:id', (req, res) =>{

    // req.params.id will send a string => need to wrap them into parseInt
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member updated', member });
            }
        })
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});


// delete member
router.delete('/:id', (req, res) =>{

    // req.params.id will send a string => need to wrap them into parseInt
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json({ 
            msg: 'Member deleted', 
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});


module.exports = router;