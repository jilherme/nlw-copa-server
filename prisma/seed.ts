import { PrismaClient} from '@prisma/client'

// conexao com o banco
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/jilherme.png',
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id, // user criado acima

      participants: {
        create: {
          userId: user.id, // user criado acima
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-12-03T12:00:00.314Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'DE',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-12T12:00:00.314Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}

main()