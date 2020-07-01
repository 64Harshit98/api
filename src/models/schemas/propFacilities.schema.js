const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   PropFacilities:
 *    type: object
 *    properties:
 *     wifi:
 *      type: String
 *     laundry:
 *      type: String
 *     propFacilities:
 *      type: array
 *      items:
 *       type: String
 *     sportsFacilities:
 *      type: array
 *      items:
 *       type: String
 *     security:
 *      type: array
 *      items:
 *       type: String
 */
const propFacilitiesSchema = new mongoose.Schema({});

module.exports = propFacilitiesSchema;
