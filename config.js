/**
 * App environment control
 */


//Environment container
var environments = {};

//Development environment
environments.development = {
  'PORT': 3000,
  'PGHOST': '',
  'PGUSER': '',
  'PGDATABASE': '',
  'PGPASSWORD': '',
  'PGPORT': '',
  'JWTSECRET': 'X8JFnt1ZFobcpVQ1qHNdL7RQAWQb8N4MNMPj5SZvVHveysaO1FspgGnQtqTEmjSKlq7/cwBK7MhYKZC29cD1IhI6To73BqJmbP1aE9SXfhNMB6rXyecECrdVjUszFfu0rmLmZmcMSigPb9YXUVQWN8IQXr+2xB9juRIhx+sX4bzRv+WpM/Oloi0YUGlSA+jH5KGgHrcFqGOI2mTkh8hqPD/hJojvkhmq0sW+8crcMtjAuI4/toJkrK2iHvqKUrkeBkW7UKNaJvsSzqnuaez8QDQAT8xYPv3eZh2PbdBMSIQ3sPDl+H/CWUQG4WAKS27R6r1/WXUIL52wl6lvNRlkFA==',
  'envName': 'development',
};
//Production environment
environments.production = {
  'PORT': 3000,
  'PGHOST': '',
  'PGUSER': '',
  'PGDATABASE': '',
  'PGPASSWORD': '',
  'PGPORT': '',
  'JWTSECRET': 'X8JFnt1ZFobcpVQ1qHNdL7RQAWQb8N4MNMPj5SZvVHveysaO1FspgGnQtqTEmjSKlq7/cwBK7MhYKZC29cD1IhI6To73BqJmbP1aE9SXfhNMB6rXyecECrdVjUszFfu0rmLmZmcMSigPb9YXUVQWN8IQXr+2xB9juRIhx+sX4bzRv+WpM/Oloi0YUGlSA+jH5KGgHrcFqGOI2mTkh8hqPD/hJojvkhmq0sW+8crcMtjAuI4/toJkrK2iHvqKUrkeBkW7UKNaJvsSzqnuaez8QDQAT8xYPv3eZh2PbdBMSIQ3sPDl+H/CWUQG4WAKS27R6r1/WXUIL52wl6lvNRlkFA==',
  'envName': 'production',
};

//The current environment
var currEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : '';
//Export the environment
var environmentToExport = typeof (environments[currEnvironment]) == 'object' ? environments[currEnvironment] : environments.development;
//Export environments module
module.exports = environmentToExport;