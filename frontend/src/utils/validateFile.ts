import { ALLOWED_FILE_TYPES, ALLOWED_MAX_FILE_SIZE } from "../types/types";

const validateFile = (file: File | null): string | null => {
  if (!file) return null;
  if (file.size > ALLOWED_MAX_FILE_SIZE * 1024) return "File too large";
  if (!ALLOWED_FILE_TYPES.test(file.name)) return "Invalid file type";
  return null;
};

export default validateFile;
