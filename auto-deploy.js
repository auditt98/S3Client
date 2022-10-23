const https = require('https');
const axios = require('axios');
const AWS = require('aws-sdk');
let AdmZip = require('adm-zip');
let fs = require('fs');
const dir = './deploy';
const buildDir = 'dist';
const extension = '.zip';

async function autoDeploy() {
	const data = JSON.stringify({
		password: process.argv[2],
	});
	let result = await axios.post('https://id645qfns2skgllqzl6nrwve3e0awigz.lambda-url.ap-southeast-1.on.aws/');
	console.log('result', result.data);
	if (result.data) {
		const accessKeyId = result.data.accessKeyId;
		const secretAccessKey = result.data.secretAccessKey;
		let date_ob = new Date();
		let day = ('0' + date_ob.getDate()).slice(-2);
		let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		let date = `${year}-${month}-${day}-${date_ob.getHours()}-${date_ob.getMinutes()}-${date_ob.getSeconds()}`;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		let zip = new AdmZip();
		zip.addLocalFolder(`${buildDir}`);
		let filePath = `${dir}/${buildDir}${date}${extension}`;
		console.log('> Zipping file');
		zip.writeZip(filePath, () => {
			console.log(`> Zipped ${filePath}`);
			upload(filePath, accessKeyId, secretAccessKey);
		});
	}
}

const upload = (path, accessKeyId, secretAccessKey) => {
	console.log(`> Uploading ${path.split('/').pop()} to S3`);
	const s3 = new AWS.S3({
		accessKeyId: accessKeyId,
		secretAccessKey: secretAccessKey,
		region: 'ap-southeast-1',
	});
	const content = fs.readFileSync(path);
	const params = {
		Bucket: 'deployment-bucket-ali33',
		Key: `frontend/${path.split('/').pop()}`,
		Body: content,
	};
	s3.upload(params, null, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(`> Uploaded ${path.split('/').pop()} to S3`);
			console.log(`----------Uploading process finished----------`);
		}
	});
};

autoDeploy();
