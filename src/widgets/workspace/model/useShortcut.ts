import { useHotkeys } from 'react-hotkeys-hook';

const controlKeys = ['meta', 'ctrl'];

type Props = {
  onRemove: () => void;
  onUndo: () => void;
  onRedo: () => void;
};

function useShortcut({ onRemove, onUndo, onRedo }: Props) {
  const shortCuts = [
    { key: 'backspace', f: onRemove },
    { key: 'delete', f: onRemove },
    ...controlKeys.map(ctrl => ({ key: `${ctrl}+z`, f: onUndo })),
    ...controlKeys.map(ctrl => ({
      key: `${ctrl}+shift+z`,
      f: onRedo,
    })),
  ];

  const ref = useHotkeys(shortCuts.map(({ key }) => key).join(','), (_, b) => {
    const f = shortCuts.find(s => s.key === b.hotkey)?.f;
    if (f) f();
  });

  return ref;
}

export default useShortcut;
