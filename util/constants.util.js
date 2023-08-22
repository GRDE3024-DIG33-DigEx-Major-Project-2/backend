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

  /**
   * Creates and returns array of Sydney suburbs
   * @returns List of suburbs in Sydney
  */
  SUBURBS = () => {
    let suburbs = [];
    suburbs.push("Alexandria");
    suburbs.push("Annandale");
    suburbs.push("Ashfield");
    suburbs.push("Balmain");
    suburbs.push("Barangaroo");
    suburbs.push("Beaconsfield");
    suburbs.push("Bellevue Hill");
    suburbs.push("Birchgrove");
    suburbs.push("Bondi Beach");
    suburbs.push("Bondi Junction");
    suburbs.push("Bronte");
    suburbs.push("Camperdown");
    suburbs.push("Centennial Park");
    suburbs.push("Chatswood");
    suburbs.push("Chinatown");
    suburbs.push("Chippendale");
    suburbs.push("Clifton Gardens");
    suburbs.push("Clovelly");
    suburbs.push("Concord");
    suburbs.push("Coogee");
    suburbs.push("Cremorne");
    suburbs.push("Crows Nest");
    suburbs.push("Darling Harbour");
    suburbs.push("Darlinghurst");
    suburbs.push("Darling Point");
    suburbs.push("Darlington");
    suburbs.push("Dawes Point");
    suburbs.push("Double Bay");
    suburbs.push("Dover Heights");
    suburbs.push("Drummoyne");
    suburbs.push("East Sydney");
    suburbs.push("Edgecliff");
    suburbs.push("Elizabeth Bay");
    suburbs.push("Erskineville");
    suburbs.push("Eveleigh");
    suburbs.push("Forest Lodge");
    suburbs.push("Glebe");
    suburbs.push("Greenwich");
    suburbs.push("Haberfield");
    suburbs.push("Haymarket");
    suburbs.push("Homebush");
    suburbs.push("Kings Cross");
    suburbs.push("Kingsford");
    suburbs.push("Kirribilli");
    suburbs.push("Lane Cove");
    suburbs.push("Lavender Bay");
    suburbs.push("Leichhardt");
    suburbs.push("Lewisham");
    suburbs.push("Lilyfield");
    suburbs.push("Manly");
    suburbs.push("Maroubra");
    suburbs.push("Marrickville");
    suburbs.push("Mascot");
    suburbs.push("McMahons Point");
    suburbs.push("Millers Point");
    suburbs.push("Milsons Point");
    suburbs.push("Moore Park");
    suburbs.push("Mosman");
    suburbs.push("Newtown");
    suburbs.push("Neutral Bay");
    suburbs.push("North Bondi");
    suburbs.push("North Sydney");
    suburbs.push("Northwood");
    suburbs.push("Paddington");
    suburbs.push("Parramatta");
    suburbs.push("Petersham");
    suburbs.push("Point Piper");
    suburbs.push("Potts Point");
    suburbs.push("Pyrmont");
    suburbs.push("Randwick");
    suburbs.push("Redfern");
    suburbs.push("Rose Bay");
    suburbs.push("Rosebery");
    suburbs.push("Rozelle");
    suburbs.push("Rushcutters Bay");
    suburbs.push("Ryde");
    suburbs.push("Stanmore");
    suburbs.push("St Peters");
    suburbs.push("Strathfield");
    suburbs.push("Surry Hills");
    suburbs.push("Sydenham");
    suburbs.push("Sydney");
    suburbs.push("Sydney Olimpic Park");
    suburbs.push("Tamarama");
    suburbs.push("Tempe");
    suburbs.push("The Rocks");
    suburbs.push("Ultimo");
    suburbs.push("Vaucluse");
    suburbs.push("Waterloo");
    suburbs.push("Waverley");
    suburbs.push("Waverton");
    suburbs.push("Watsons Bay");
    suburbs.push("Woollahra");
    suburbs.push("Wolli Creek");
    suburbs.push("Woolloomooloo");
    suburbs.push("Woolstonecraft");
    suburbs.push("Zetland");
    return suburbs;
  };

  //Default order fields for event page search queries
  DEFAULT_ORDERBY = {
    FIELD: "createdAt",
    DIRECTION: "ASC",
  };
}

//Export ConstantsUtil
module.exports = new ConstantsUtil();
