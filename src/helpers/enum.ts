/**
 * map enum into `[key, value]` tuples
 * @param enumObject - the enum object
 */
export const mapEnumToTuples = <E extends Record<K, V>, K extends keyof E, V extends E[K]> (enumObject: E) => {
  const keys = Object.keys(enumObject);
  return keys.map((key) => {
    const value = enumObject[key as K];
    return [key, value] as [K, E[K]];
  });
};
