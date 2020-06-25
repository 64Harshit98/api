const AWS = require("aws-sdk");
const awsConfig = require("../../configs/aws.config");

const s3 = new AWS.S3(awsConfig);

module.exports = s3;
