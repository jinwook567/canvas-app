/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';

function DebugObserver() {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  });
  return null;
}

export default DebugObserver;
