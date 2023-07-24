/**
 * Read-only variables
 *
 */

//Contains read-only variables
class ConstantsUtil {
  //The base uri for retrieving S3-stored images
  BUCKET_URI = "https://gigney.s3.ap-southeast-2.amazonaws.com/";
  //The file extension S3-stored images use
  IMG_EXT = ".jpeg";
  //Number of events to return for pagination
  PAGE_LIMIT = 10;
  //The possible cities that events can reside in
  CITIES = [
    "Sydney",
    "Balmain",
    "Surry Hills",
    "Parramatta",
    "Marrickville",
    "Lane Cove",
  ];

  //Default order fields for event page search queries
  DEFAULT_ORDERBY = {
    FIELD: "createdAt",
    DIRECTION: "ASC",
  };
}

//Export ConstantsUtil
module.exports = new ConstantsUtil();
