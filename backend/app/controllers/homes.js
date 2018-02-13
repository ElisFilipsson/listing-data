import * as models from "../models";

export async function getAHome(req, res) {
  const { name } = req.params;
  const { timeOfFetch } = req.body;
  
  const query = {
    where: { name },
    attributes: ["id", "name", "createdAt"],
    include: [
      {
        model: models.Room,
        attributes: [
          "id",
          "name",
          "temperature",
          "humidity",
          "createdAt",
          "updatedAt",
        ],
      },
    ],
  };
  if (!!timeOfFetch) {
    query.include[0].where = {
      updatedAt: {
        $gt: timeOfFetch,
      },
    };
  }
  models.Home.findAll(query)
    .then(homes => {
      return res.status(200).json({
        success: true,
        data: homes,
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        error: err,
      });
    });
}
export async function getSomeHomes(req, res) {
  models.Home.findAll({
    attributes: ["id", "name", "createdAt"]
  })
    .then(homes => {
      return res.status(200).json({
        success: true,
        data: homes,
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        error: err,
      });
    });
}
