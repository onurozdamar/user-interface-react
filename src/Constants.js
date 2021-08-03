export const ONLY_LETTER = /^[A-Za-züÜıİğĞÖöçÇşŞ]+$/;
export const ONLY_LETTER_SPACE = /^[A-Za-züÜıİğĞÖöçÇşŞ ]+$/;
export const ONLY_DIGIT = /^[0-9 \+()]+$/;
export const BIRTHDATE = /^\d.+$/;
export const EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const NAME_VALIDATION_MESSAGE_MIN = "Name must be at least 3 characters";
export const NAME_VALIDATION_MESSAGE_MAX =
  "Name must be less then 20 characters";
export const NAME_VALIDATION_MESSAGE_REGEX =
  "Name cannot contain special characters or spaces";

export const EMAIL_VALIDATION_MESSAGE_MIN =
  "Email must be at least 2 characters";
export const EMAIL_VALIDATION_MESSAGE_MAX =
  "Email must be less then 20 characters";
export const EMAIL_VALIDATION_MESSAGE_REGEX = "Email cannot or spaces";

export const BIRTHDATE_VALIDATION_MESSAGE_MIN =
  "Job must be at least 2 characters";
export const BIRTHDATE_VALIDATION_MESSAGE_MAX =
  "Job must be less then 20 characters";
export const BIRTHDATE_VALIDATION_MESSAGE_REGEX =
  "Job cannot contain special characters or spaces";

export const PHONE_VALIDATION_MESSAGE_LENGTH = "Phone must be 11 digit";
export const PHONE_VALIDATION_MESSAGE_REGEX = "Phone can contain only numbers";

export const SALARY_VALIDATION_MESSAGE_MIN =
  "Salary must be at least 1 characters";
export const SALARY_VALIDATION_MESSAGE_REGEX =
  "Salary can contain only numbers";

export const GENDER_VALIDATION_MESSAGE_REGEX =
  "Age must be at least 1 characters";

export const VALIDATION_MESSAGE_REQUIRED = "This field is required";
