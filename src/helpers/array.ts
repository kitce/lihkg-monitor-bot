export const deduplicate = <T extends unknown> (array: T[]) => {
  return array.filter((item, index) => array.indexOf(item) === index);
};
