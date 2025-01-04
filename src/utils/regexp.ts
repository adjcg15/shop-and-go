const EMAIL_PATTERN = new RegExp(
  "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
);

const USERNAME_PATTERN = new RegExp("^[a-zA-Z0-9]+$");

const ONLY_LETTERS_PATTERN = new RegExp("^[A-Za-zÁ-ÿ\\s]+$");

const PHONE_NUMBER_PATTERN = new RegExp("^[0-9]{10}$");

const MONTH_PATTERN = new RegExp("^(0[1-9]|1[0-2])$");

const YEAR_PATTERN = new RegExp("^(2[5-9]|[3-9][0-9])$");

const CVV_PATTERN = new RegExp("^[0-9]{3}$");

const SECURE_PASSWORD_PATTERN = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[\\d!_\\-@&%$#])[A-Za-z\\d!_\\-@&%$#]{8,64}$"
);


const CATEGORY_NAME_FORMAT = new RegExp("^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{1,255}$");

const FULL_NAME_PATTERN = new RegExp("^(?=.*\\s)[\\p{L}\\s\\-']+$", "u");


export {
  EMAIL_PATTERN,
  PHONE_NUMBER_PATTERN,
  SECURE_PASSWORD_PATTERN,
  ONLY_LETTERS_PATTERN,
  MONTH_PATTERN,
  YEAR_PATTERN,
  CVV_PATTERN,
  USERNAME_PATTERN,
  CATEGORY_NAME_FORMAT,
  FULL_NAME_PATTERN,
};
