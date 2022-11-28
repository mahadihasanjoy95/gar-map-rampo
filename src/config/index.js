const baseLocation = require('./base_location');

module.exports = {
    DEFAULT_LANGUAGE: 'en', // for english en and for japanese use ja
    API_URL: baseLocation,
    aws: baseLocation.aws,
    firebase: baseLocation.firebase,
    payment: baseLocation.payment,
    userRoles: ['Student', 'Instructor'],
};
