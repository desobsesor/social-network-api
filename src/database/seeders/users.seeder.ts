import { DataSource } from 'typeorm';
import { User } from '../../domains/users/entities/user.entity';

export class UserSeeder {
  constructor(private dataSource: DataSource) { }

  async run() {
    const userRepository = this.dataSource.getRepository(User);

    const usersData = [
      {
        firstName: 'Yovany',
        lastName: 'Suárez Silva',
        username: 'yosuarez',
        email: 'yovany@suarez.com',
        passwordHash: 'yosuarez',
        alias: 'yosuarez',
        dateOfBirth: '1983-03-09',
        isLogged: true,
        role: 'Member'
      },
      {
        firstName: 'André',
        lastName: 'Suárez Medina',
        username: 'ansuarez',
        email: 'janesmith@example.com',
        passwordHash: 'ansuarez',
        alias: 'ansuarez',
        dateOfBirth: '2014-03-15',
        isLogged: true,
        role: 'Member'
      },
      {
        firstName: 'Selena',
        lastName: 'Suárez Medina',
        username: 'sesuarez',
        email: 'michaeljohnson@example.com',
        passwordHash: 'sesuarez',
        alias: 'sesuarez',
        dateOfBirth: '2012-04-16',
        isLogged: true,
        role: 'Member'
      },
    ];

    for (const userData of usersData) {
      const existingUser = await userRepository.findOne({
        where: { username: userData.username },
      });

      if (!existingUser) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
        console.log(`User ${user.username} seeded.`);
      } else {
        console.log(`User ${userData.username} already exists, skipping.`);
      }
    }
  }
}