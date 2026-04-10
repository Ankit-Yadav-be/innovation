import express from 'express';
import * as postHandler from './handler.js';


const router = express.Router();

router.get('/fetch', postHandler.fetchPosts);
router.get('/', postHandler.getPosts);
router.get('/search', postHandler.searchPosts);
router.get('/:id', postHandler.getPost);

export default router;