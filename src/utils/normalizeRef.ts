export const normalizeRef = <T>(
  ref: React.Ref<T> | null,
): React.RefObject<T | null> | null => {
  if (ref && typeof ref !== 'function') {
    return ref;
  }
  return null;
};
