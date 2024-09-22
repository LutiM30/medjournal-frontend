export default function removeEmailFromData(data = {}) {
  const shallowCopy = { ...data };

  delete shallowCopy.email;

  return shallowCopy;
}
