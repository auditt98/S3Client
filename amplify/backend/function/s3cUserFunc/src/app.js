/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require('aws-sdk');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const express = require('express');
var jwt = require('jsonwebtoken');

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = 'Users';
if (process.env.ENV && process.env.ENV !== 'NONE') {
	tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = 'id';
const partitionKeyType = 'S';
const sortKeyName = 'email';
const sortKeyType = 'S';
const hasSortKey = sortKeyName !== '';
const path = '/user';
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	next();
});

const getCircularReplacer = () => {
	const seen = new WeakSet();
	return (key, value) => {
		if (typeof value === 'object' && value !== null) {
			if (seen.has(value)) {
				return;
			}
			seen.add(value);
		}
		return value;
	};
};

// convert url string param to expected Type
const convertUrlType = (param, type) => {
	switch (type) {
		case 'N':
			return Number.parseInt(param);
		default:
			return param;
	}
};

app.post(path + '/get-buckets', async (req, res) => {
	res.statusCode = 200;
	const s3 = new AWS.S3({
		credentials: {
			accessKeyId: req.body.accessKeyId,
			secretAccessKey: req.body.secretAccessKey,
		},
		region: 'ap-southeast-1',
	});
	const buckets = await s3.listBuckets().promise();

	res.json({
		body: {
			accessKeyId: req.body.accessKeyId,
			secretAccessKey: req.body.secretAccessKey,
			buckets,
		},
	});
});

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path + hashKeyPath, function (req, res) {
	const condition = {};
	condition[partitionKeyName] = {
		ComparisonOperator: 'EQ',
	};

	if (userIdPresent && req.apiGateway) {
		condition[partitionKeyName]['AttributeValueList'] = [
			req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH,
		];
	} else {
		try {
			condition[partitionKeyName]['AttributeValueList'] = [
				convertUrlType(req.params[partitionKeyName], partitionKeyType),
			];
		} catch (err) {
			res.statusCode = 500;
			res.json({ error: 'Wrong column type ' + err });
		}
	}

	let queryParams = {
		TableName: tableName,
		KeyConditions: condition,
	};

	dynamodb.query(queryParams, (err, data) => {
		if (err) {
			res.statusCode = 500;
			res.json({ error: 'Could not load items: ' + err });
		} else {
			res.json(data.Items);
		}
	});
});

app.get(path + hashKeyPath + sortKeyPath, (req, res) => {
	let result = {};
	let queryParams = {
		TableName: tableName,
		Key: {
			id: req.params.id,
			email: req.params.email,
		},
	};
	dynamodb.get(queryParams, (error, d) => {
		if (error) {
			result = {
				result: 'error',
				error: error,
				data: null,
			};
			res.statusCode = 500;
		} else {
			result = {
				result: 'success',
				error: null,
				data: d,
			};
			res.statusCode = 200;
		}
		res.send(result);
	});
});

/*****************************************
 * HTTP POST method to update an user *
 *****************************************/
app.post(path + hashKeyPath + sortKeyPath, (req, res) => {
	//validate if the request body has accessKeyId and secretAccessKey
	if (!req.body.accessKeyId || !req.body.secretAccessKey) {
		res.statusCode = 400;
		res.send({
			result: 'error',
			code: 'UpdateMissingArgs',
			message: 'Missing AccessKeyId or SecretAccessKey',
		});
	}
	//put item in dynamo
	let queryParams = {
		TableName: tableName,
		Item: {
			id: req.params.id,
			email: req.params.email,
			accessKeyId: req.body.accessKeyId,
			secretAccessKey: req.body.secretAccessKey,
		},
		Expected: {
			id: {
				Value: req.params.id,
				ComparisonOperator: 'EQ',
			},
		},
	};
	dynamodb.put(queryParams, (error, data) => {
		if (error) {
			res.statusCode = 500;
			res.send({
				result: 'error',
				code: 'UpdateUserFailed',
				message: 'Failed to update user',
				error: error,
			});
		} else {
			res.statusCode = 200;
			res.send({
				result: 'success',
				data: data,
			});
		}
	});
});

app.get(path + hashKeyPath, (req, res) => {
	let json = JSON.stringify(req, getCircularReplacer());
	res.statusCode = 200;
	res.send(json);
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

// app.get(path + '/object' + hashKeyPath + sortKeyPath, function (req, res) {
// 	const params = {};
// 	if (userIdPresent && req.apiGateway) {
// 		params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
// 	} else {
// 		params[partitionKeyName] = req.params[partitionKeyName];
// 		try {
// 			params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
// 		} catch (err) {
// 			res.statusCode = 500;
// 			res.json({ error: 'Wrong column type ' + err });
// 		}
// 	}
// 	if (hasSortKey) {
// 		try {
// 			params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
// 		} catch (err) {
// 			res.statusCode = 500;
// 			res.json({ error: 'Wrong column type ' + err });
// 		}
// 	}

// 	let getItemParams = {
// 		TableName: tableName,
// 		Key: params,
// 	};

// 	dynamodb.get(getItemParams, (err, data) => {
// 		if (err) {
// 			res.statusCode = 500;
// 			res.json({ error: 'Could not load items: ' + err.message });
// 		} else {
// 			if (data.Item) {
// 				res.json(data.Item);
// 			} else {
// 				res.json(data);
// 			}
// 		}
// 	});
// });

/************************************
 * HTTP put method for insert object *
 *************************************/

// app.put(path, function (req, res) {
// 	if (userIdPresent) {
// 		req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
// 	}

// 	let putItemParams = {
// 		TableName: tableName,
// 		Item: req.body,
// 	};
// 	dynamodb.put(putItemParams, (err, data) => {
// 		if (err) {
// 			res.statusCode = 500;
// 			res.json({ error: err, url: req.url, body: req.body });
// 		} else {
// 			res.json({ success: 'put call succeed!', url: req.url, data: data });
// 		}
// 	});
// });

/************************************
 * HTTP post method for insert object *
 *************************************/

app.post(path + '/register', function (req, res) {
	if (userIdPresent) {
		req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
	}

	let putItemParams = {
		TableName: tableName,
		Item: req.body,
	};
	dynamodb.put(putItemParams, (err, data) => {
		if (err) {
			res.statusCode = 500;
			res.json({ error: err, url: req.url, body: req.body });
		} else {
			res.json({ success: 'post call succeed!', url: req.url, data: data });
		}
	});
});

/**************************************
 * HTTP remove method to delete object *
 ***************************************/

// app.delete(path + '/object' + hashKeyPath + sortKeyPath, function (req, res) {
// 	const params = {};
// 	if (userIdPresent && req.apiGateway) {
// 		params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
// 	} else {
// 		params[partitionKeyName] = req.params[partitionKeyName];
// 		try {
// 			params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
// 		} catch (err) {
// 			res.statusCode = 500;
// 			res.json({ error: 'Wrong column type ' + err });
// 		}
// 	}
// 	if (hasSortKey) {
// 		try {
// 			params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
// 		} catch (err) {
// 			res.statusCode = 500;
// 			res.json({ error: 'Wrong column type ' + err });
// 		}
// 	}

// 	let removeItemParams = {
// 		TableName: tableName,
// 		Key: params,
// 	};
// 	dynamodb.delete(removeItemParams, (err, data) => {
// 		if (err) {
// 			res.statusCode = 500;
// 			res.json({ error: err, url: req.url });
// 		} else {
// 			res.json({ url: req.url, data: data });
// 		}
// 	});
// });

app.listen(3000, function () {
	console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
