const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync('./data/states_and_cities.json', 'utf-8'));

  for (const state of data) {
    // Use upsert to create or update state
    const upsertedState = await prisma.state.upsert({
      where: { name: state.name },
      update: {},
      create: { name: state.name }
    });

    for (const cityName of state.cities) {
      // Upsert each city by unique compound key [name, stateId]
      await prisma.city.upsert({
        where: {
          name_stateId: {
            name: cityName,
            stateId: upsertedState.id,
          },
        },
        update: {},
        create: {
          name: cityName,
          stateId: upsertedState.id
        }
      });
    }

    console.log(`Seeded: ${state.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
