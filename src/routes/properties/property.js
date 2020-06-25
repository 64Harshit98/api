const route = require("express").Router();

/**
 * @swagger
 * paths:
 *  /api/property/:
 *   get:
 *    tags:
 *    - "Property"
 *    summary: To get all the properties
 *    responses:
 *     "200":
 *      description: retun the properties
 */

/**
 * @swagger
 * paths:
 *  /api/property/{propId}:
 *   get:
 *    tags:
 *    - "Property"
 *    summary: To get the property with the given id
 *    responses:
 *     "200":
 *      description: retun the desired property
 */

module.exports = route;
