export const POST_DTO_CONSTRAINTS = {
 TITLE: {
  MIN_LENGTH: 5,
  MAX_LENGTH: 100,
 },

 SHORT_DESCRIPTION: {
  MIN_LENGTH: 30,
  MAX_LENGTH: 300,
 },
};

export const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
export const IMAGE_ALLOWED_MIME_TYPES = /(image\/jpeg|image\/png)/;

export const PUBLIC_FOLDER_NAME = "public";
export const UPLOADS_FOLDER_NAME = "uploads";
