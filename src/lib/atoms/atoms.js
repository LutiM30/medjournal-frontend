import { atom } from 'jotai';

export const isLoadingAtom = atom(true);
export const triggerAtom = atomWithToggle(true);

export function atomWithToggle(initialValue = false) {
  const anAtom = atom(initialValue, (get, set, nextValue) => {
    const update = nextValue ?? !get(anAtom);
    set(anAtom, update);
  });

  return anAtom;
}
