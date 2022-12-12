import { S3Client, AbortMultipartUploadCommand, ListBucketsCommand } from '@aws-sdk/client-s3';

import { EC2Client, DescribeRegionsCommand } from '@aws-sdk/client-ec2';

import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';
import { useRecoilState } from 'recoil';
import { currentUserState, currentRegionList } from '../../stores/user-store';

export const useS3 = () => {
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
	const [currentRegions, setCurrentRegions] = useRecoilState(currentRegionList);
	const getRegions = async (accessKeyId, secretAccessKey) => {
		if (currentRegions.length > 0) return;
		console.log('getRegions', currentUser);
		let ec2Client = new EC2Client({
			region: 'ap-southeast-1',
			credentials: {
				accessKeyId: accessKeyId || currentUser.accessKeyId,
				secretAccessKey: secretAccessKey || currentUser.secretAccessKey,
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
	};

	const getBuckets = async (accessKeyId, secretAccessKey) => {
		let s3Client = new S3Client({
			region: 'ap-southeast-1',
			credentials: {
				accessKeyId: accessKeyId || currentUser.accessKeyId,
				secretAccessKey: secretAccessKey || currentUser.secretAccessKey,
			},
		});
		console.log('accessKeyId || currentUser.accessKeyId,', accessKeyId || currentUser.accessKeyId);
		let command = new ListBucketsCommand({});
		try {
			let response = await s3Client.send(command);
			console.log(response);
		} catch (e) {
			console.log(e);
			console.log('currentuser', currentUser);
		}
	};
	return { getRegions, getBuckets };
};
