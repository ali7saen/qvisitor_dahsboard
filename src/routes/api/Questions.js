const router = require("express").Router();
const { authenticateApiKey } = require("../../middlewares/authMiddlewares");
const {
    getLatestQuestionUpdate_get,
} = require("../../controllers/questionsController");



/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Operations related to questions
 */

/**
 * @swagger
 * /api/questions/latest:
 *   get:
 *     summary: Retrieve the latest questions
 *     tags: [Questions]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Public API key required for authorization
 *         schema:
 *           type: string
 *           example: your-api-key-here
 *     responses:
 *       200:
 *         description: Successful response with the latest questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 66bf2c41358a7a9fbe6840be
 *                   question:
 *                     type: string
 *                     example: متى استُشهِدَ الإمام الحسن المجتبى (عليه السلام) ؟
 *                   choice_1:
 *                     type: string
 *                     example: يوم 7 صفر سنة 50هـ
 *                   choice_2:
 *                     type: string
 *                     example: يوم 15 محرم الحرام سنة 50 هـ
 *                   choice_3:
 *                     type: string
 *                     example: يوم 15 رجب سنة 50 هـ
 *                   type:
 *                     type: string
 *                     example: السيرة
 *                   age_group:
 *                     type: string
 *                     example: 2
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-08-16T10:38:57.433Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-08-16T10:38:57.433Z
 *                   __v:
 *                     type: integer
 *                     example: 0
 *       400:
 *         description: Invalid API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid API key
 *       401:
 *         description: Authorization header is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Authorization header is missing
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get("/latest", authenticateApiKey, getLatestQuestionUpdate_get);

module.exports = router;
