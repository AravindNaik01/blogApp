const express = require("express");
const postController = require("../controllers/postController");
const {protect } = require('../middleware/authMiddleware')
 
const router  = express.Router();

// router.route('/').post(createPost).get(getAllPosts)
// router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost)

router.get('/',postController.getAllPosts)

// This route must be placed *before* the '/:slug' route. Express matches routes
// in order, and if '/:slug' came first, it would incorrectly interpret 'category'
// as a slug.

router.get('/category/:categoryName',postController.getPostsByCategory)


router.get('/:slug',postController.getPostBySlug)


// --- PROTECTED ADMIN ROUTES ---
router.post('/',protect,postController.createPost)
router.patch('/:slug',protect,postController.updatePost)
router.delete('/:id',protect,postController.deletePost)

module.exports =router;