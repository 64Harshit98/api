const route = require("express").Router();

/**
 * @swagger
 * paths:
 *  /api/property/{propId}:
 *   put:
 *    tags:
 *    - "Property"
 *    summary: Use for updating the property with the specific userId
 *    requestBody:
 *     required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Property'
 *    responses:
 *     "201":
 *      description: successfully updated the property and return it
 */

/**
 * @swagger
 * paths:
 *  /api/property/{propId}:
 *   delete:
 *    tags:
 *    - "Property"
 *    summary: To delete the property with the given id
 *    responses:
 *     "200":
 *      description: retun the property deleted
 */

module.exports = route;
