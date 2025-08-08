import "reflect-metadata";
import { DataSource } from "typeorm";
import {User} from "./entity/User";
import {UserPosts} from "./entity/Post";
import {CommentPost} from "./entity/Comment";
import {PostLike} from "./entity/PostLike";
import { FriendRequest } from "./entity/FriendRequest";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5434,
    username: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "hajox245",
    database: process.env.DB_NAME || "todo",
    synchronize: true,
    logging: false,
    entities: [User,UserPosts,CommentPost,PostLike,FriendRequest],
    migrations: [],
    subscribers: [],

});
