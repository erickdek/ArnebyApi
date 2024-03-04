//Los tamaños que utilizaremos para la web
export const IMAGE_SIZES = [
    { name: "icon", width: 150, height: 150 },
    { name: "little", width: 280, height: 350 },
    { name: "medium", width: 780, height: 1024 },
    { name: "larg", width: 1200, height: 1500 },
    { name: "extralarge", width: 1920, height: 1080 }
];

export const APP_CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL
}

export const SMTP_CONFIG = {
    SMTP_EMAILFROM : process.env.SMTP_EMAILFROM,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_TLS: process.env.SMTP_TLS,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
}

export const AWS_CONFIG = {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_BUCKET_PUBLIC_KEY: process.env.AWS_BUCKET_PUBLIC_KEY,
    AWS_BUCKET_PRIVATE_KEY: process.env.AWS_BUCKET_PRIVATE_KEY,
    AWS_BUCKET_ENDPOINT: process.env.AWS_BUCKET_ENDPOINT,
}

export const JWT_CONFIG = {
    SECRET_KEY_TOKEN: process.env.SECRET_KEY_TOKEN
}

export const DB_CONFIG = {
    APP_MONGODB_SERVER: process.APP_MONGODB_SERVER,
    APP_MONGODB_HOST: process.env.APP_MONGODB_HOST,
    APP_MONGODB_DATABASE: process.env.APP_MONGODB_DATABASE,
}