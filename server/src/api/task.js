const express = require('express'); 
const nodeCouchDb = require('node-couchdb');
const router = express.Router();

const couch = new nodeCouchDb({
  protocol: 'http',
  host: process.env.COUCHDB_HOST,
  port: process.env.COUCHDB_PORT,
  auth: {
    username: process.env.COUCHDB_USERNAME,
    password: process.env.COUCHDB_PASSWORD
  }
});
const database = 'task-list-app';
const viewAll = '_design/view_all/_view/view_all';

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const taskList = await couch.get(database, viewAll).then( ({ data }) => {
      let tasks = data.rows.map((item) => {
        const {id, value} = item;
        return {
          id,
          content: value.content,
          tags: value.tags,
          status: value.isDone ? 'completed' : 'active',
          created_at: value.created_at,
          rev: value._rev,
        }
      })
      return tasks;
    })

    res.json(taskList);
  } catch (error) {
    next(error);
  }
})

// READ ONE
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await couch.get(database, id).then( ({ data }) => data);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
})

// CREATE ONE
router.post('/', async (req, res, next) => {
  try {
    const now = new Date();
    const createdTask = await couch.insert(database, {
      ...req.body,
      created_at: JSON.stringify(now)
    }).then( ({ data }) => data)
    
    res.json(createdTask);
  } catch (error) {
    next(error);
  }
})

// UPDATE ONE
router.put('/:id', async (req, res, next) => {
  try {
    const task = await couch.get(database, req.params.id).then( ({ data }) => data );

    const updatedTask = await couch.update(database, {
      ...task,
      ...req.body
    }).then( ({ data }) => data );

    res.json(updatedTask);
  } catch (error) {
    next(error);
  } 
})

// DELETE ONE
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rev } = req.body;

    const deletedTask = await couch.del(database, id, rev).then( ({ data }) => data);

    res.json(deletedTask);
  } catch(error) {
    console.log(error);
    next(error)
  }
})

module.exports = router;