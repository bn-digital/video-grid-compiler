export const getFileExtension = (fileName?: string | null): string | null => {
  if (!fileName) {
    return null;
  }
  const match = fileName.match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toLowerCase() : null;
};

export const bytesToMB = (bytes?: number | null): number | null => {
  if (bytes == null) {
    return null;
  }
  return bytes / (1024 * 1024);
};

export const formatMB = (mb: number): string => {
  const rounded = Math.round(mb * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}` : `${rounded.toFixed(1)}`;
};
