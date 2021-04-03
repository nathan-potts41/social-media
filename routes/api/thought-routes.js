const router = require("express").Router();
const {
    getAllThoughts,
    getOneThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,
} = require("../../controllers/thoughts-controller");

// /api/thgouhts
router.route("/").get(getAllThoughts);

// /api/thoughts/:<userId>
router.route("/:userId").post(addThought);

// /api/thoughts/:<thoughtId>
router.route("/:thoughtId").get(getOneThoughtById).put(updateThought);

// / api/thoughts/:<userId>/:<thoughtId>
router.route("/:userId/:thoughtId").delete(removeThought);

// /api/thoughts/<thoughtId>/reactions
router.route("/:thoughtId/reactions").put(addReaction);

// /api/thoughts/<thoughtId>/reactions/<reactionId>
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;