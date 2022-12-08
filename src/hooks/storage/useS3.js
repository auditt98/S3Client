import { S3Client, AbortMultipartUploadCommand } from '@aws-sdk/client-s3';

import { EC2Client, DescribeRegionsCommand } from '@aws-sdk/client-ec2';

import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';
import { useRecoilState } from 'recoil';
import { currentUserState, currentRegionList } from '../../stores/user-store';

export const useS3 = () => {
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
	const [currentRegions, setCurrentRegions] = useRecoilState(currentRegionList);
	const getCallerIdentity = async () => {
		let ec2Client = new EC2Client({
			region: 'ap-southeast-1',
			credentials: {
				accessKeyId: currentUser.accessKeyId,
				secretAccessKey: currentUser.secretAccessKey,
			},
		});
		let command = new DescribeRegionsCommand({});
		try {
			let response = await ec2Client.send(command);
			let regionList = response.Regions.map((region) => region.RegionName);
			setCurrentRegions(regionList);
		} catch (e) {
			console.log(e);
		}

		//create new aws credentials object
		// let stsClient = new STSClient({
		// 	credentials: {
		// 		accessKeyId: currentUser.accessKeyId,
		// 		secretAccessKey: currentUser.secretAccessKey,
		// 	},
		// 	region: 'ap-southeast-1',
		// });
		// let command = new GetCallerIdentityCommand({});
		// try {
		// 	let response = await stsClient.send(command);
		// 	console.log('response', response);
		// } catch (e) {
		// 	console.log(e);
		// }
	};
	return { getCallerIdentity };
};
