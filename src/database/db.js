import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  username: 'postgres',
  password: 'tentaqwerty07',
  database: 'lesson42',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
})

export default sequelize
