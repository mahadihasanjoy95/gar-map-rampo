const baseLocation = require('./base_location');

export const S3_Pool_conf = {
    Auth: {
        identityPoolId: baseLocation.identityPoolId,
        region: baseLocation.region,
    },
    Storage: {
        AWSS3: {
            bucket: baseLocation.bucket,
            region: baseLocation.region,
        }
    }
};
