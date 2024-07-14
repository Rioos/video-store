import { Sequelize, DataTypes, Model, Optional } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
  },
});

interface MovieAttributes {
  id: number;
  title: string;
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MovieCreationAttributes
  extends Optional<MovieAttributes, "id" | "likes"> {}

class Movie
  extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes
{
  public id!: number;
  public title!: string;
  public likes!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    tableName: "movies",
    timestamps: true,
  }
);

export { sequelize, Movie };
