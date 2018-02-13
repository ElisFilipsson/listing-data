import * as models from "../models";

export async function generateData() {
  const count = await models.Home.count()
    .then(count => count)
    .catch(err => console.log(err));
  if (!(count > 0)) {
    const chalk = require("chalk");
    const casual = require("casual");
    const roomTypes = [
      "Sovrum",
      "Toalett",
      "Kök",
      "Hall",
      "Vardagsrum",
      "Farstu",
      "Allrum",
    ];
    casual.seed(392);
    console.log("Please wait while generating data into db.");
    const Homes = await Promise.all(
      Array(10)
        .fill(1)
        .map(() => {
          return models.Home.create(
            {
              name: casual.title.replace(/\s+/g, ""),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            { logging: false }
          );
        })
    );
    await Promise.all(
      Homes.map(async home => {
        const Rooms = await Promise.all(
          Array(casual.integer(3, 7))
            .fill(1)
            .map((room, index) => {
              return models.Room.create(
                {
                  name: roomTypes[index],
                  temperature: casual.integer(-50, 50),
                  humidity: casual.integer(-50, 50),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
                { logging: false }
              );
            })
        );
        return await home.setRooms(Rooms);
      })
    );
    await console.log("Done: Database is created.");
  }
}
