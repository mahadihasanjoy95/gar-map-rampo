export const statesData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "1",
      properties: { name: "10 Seabring St", density: 412.3 },
      img:"./10",
      details: "Distance: 0.91 miles\n" +
          "Printkey: 57.39-2-50\n" +
          "Sale Date: 03/25/2021\n" +
          "Sq Foot Living Area: 2,328\n" +
          "Building Style : Raised Ranch\n" +
          "Neighborhood: SPRING VALLEY",
      marker: [41.1129866497784, -74.04109586871861],
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-74.041242,41.112885],
            [ -74.041135,41.113255],
            [ -74.040968,41.113244],
            [ -74.040951,41.112869],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "2",
      img:'./10',
      marker: [41.112439, -74.041205],
      properties: { name: "11 Seabring St", density: 412.3 },
      details: "Distance: 0.89 miles\n" +
          "Printkey: 50.11-3-26\n" +
          "Sale Date: 06/17/2021\n" +
          "Sq Foot Living Area: 2,076\n" +
          "Building Style : Raised Ranch\n" +
          "Neighborhood: TOWN OUT",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-74.041242,41.112885],
            [ -74.041365,41.112349],
            [ -74.040854,41.112096],
            [ -74.040951,41.112869],
          ],
        ],
      },
    }
  ],
};
