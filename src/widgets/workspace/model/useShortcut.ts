import { useHotkeys } from 'react-hotkeys-hook';
import { Control } from './useControl';

const controlKeys = ['meta', 'ctrl'];

function useShortcut(control: Control) {
  const shortCuts = [
    { key: 'backspace', f: control.remove },
    { key: 'delete', f: control.remove },
    ...controlKeys.map(ctrl => ({ key: `${ctrl}+z`, f: control.undo })),
    ...controlKeys.map(ctrl => ({
      key: `${ctrl}+shift+z`,
      f: control.redo,
    })),
  ];

  const ref = useHotkeys(shortCuts.map(({ key }) => key).join(','), (_, b) => {
    const f = shortCuts.find(s => s.key === b.hotkey)?.f;
    if (f) f();
  });

  return ref;
}

export default useShortcut;
