/**
 * Read-only variables
 *
 */

class ConstantsUtil {
  BUCKET_URI = "https://gigney.s3.ap-southeast-2.amazonaws.com/";

  IMG_MIMETYPE = ".jpeg";

  PAGE_LIMIT = 10;
}

//Export ConstantsUtil
module.exports = new ConstantsUtil();
