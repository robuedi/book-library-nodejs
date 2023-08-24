import { Dialect } from "sequelize"

namespace NodeJS {
    interface ProcessEnv {
        APP_ENV: string
        APP_PORT: number
        DB_DIALECT: Dialect
        DB_HOST: string
        DB_PORT: number
        DB_DATABASE: string
        DB_USERNAME: string
        DB_PASSWORD: string
        DB_POOL_MAX: number
        DB_POOL_MIN: number
        DB_POOL_ACQUIRE: number
        DB_POOL_IDLE: number
    }
}