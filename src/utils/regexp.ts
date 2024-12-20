const EMAIL_PATTERN = new RegExp("^[a-zA-Z0-9._\-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");

const USERNAME_PATTERN = new RegExp("^[a-zA-Z0-9]+$");

const PHONE_NUMBER_PATTERN = new RegExp("^[0-9]{10}$");

const SECURE_PASSWORD_PATTER = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[\\d!_\\-@&%$#])[A-Za-z\\d!_\\-@&%$#]{8,}$");

export  {
    EMAIL_PATTERN,
    PHONE_NUMBER_PATTERN,
    SECURE_PASSWORD_PATTER,
    USERNAME_PATTERN
};