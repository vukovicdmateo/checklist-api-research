import { prisma } from '../../app/database';

export const resetDB = async () => {
  await prisma.$transaction([
    prisma.group.deleteMany(),
    prisma.tODO.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};
