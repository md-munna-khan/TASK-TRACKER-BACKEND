import dotenv from "dotenv";

dotenv.config()

interface IEnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    BCRYPT_SALT_ROUND: number,
    JWT_ACCESS_SECRET: string,
    JWT_ACCESS_EXPIRES: string,
    JWT_REFRESH_SECRET: string,
    JWT_REFRESH_EXPIRES: string,
    ADMIN_EMAIL: string,
    ADMIN_PASSWORD: string,
    FRONTEND_URL: string,
}

const loadEnvVariables = (): IEnvConfig => {
    const requiredEnvVariables: string[] = [
        "PORT",
        "DB_URL",
        "NODE_ENV",
        "BCRYPT_SALT_ROUND",
        "JWT_ACCESS_EXPIRES",
        "JWT_ACCESS_SECRET",
        "ADMIN_EMAIL",
        "ADMIN_PASSWORD",
        "JWT_REFRESH_SECRET",
        "JWT_REFRESH_EXPIRES",
        "FRONTEND_URL",
    ];
    

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variable ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        BCRYPT_SALT_ROUND: Number(process.env.BCRYPT_SALT_ROUND),
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
    }
}

export const envVars = loadEnvVariables()