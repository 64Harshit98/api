const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   Visit:
 *    type: object
 *    required:
 *     - propId
 *     - userId
 *    properties:
 *     propId:
 *      type: array
 *      format: mongoDB
 *     userId:
 *      type: String
 *      format: mongoDB
 *     amount:
 *      type: integer
 *     confirmed:
 *      type: boolean
 *     paid:
 *      type: boolean
 *     created:
 *      type: String
 *      format: date
 */
