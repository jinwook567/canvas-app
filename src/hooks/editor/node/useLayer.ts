import { curry } from 'ramda';
import { useSetRecoilState } from 'recoil';
import { stagesState } from 'recoils/editor/atoms';
import { Shape, Stage } from 'utils/editor/node';
import S from 'utils/editor/stages';

function useLayer() {
  const setStages = useSetRecoilState(stagesState);

  const layerIndexInStage = curry(
    (shape: Shape, f: (index: number) => number, stage: Stage) =>
      stage.setChildren(children => {
        const shapeIndex = children.findIndex(child => child.equals(shape));
        if (shapeIndex === -1) return children;

        const targetIndex = f(shapeIndex);

        return children.map((child, index) => {
          if (index === shapeIndex) return children[targetIndex];
          if (index === targetIndex) return children[shapeIndex];
          return child;
        });
      })
  );

  const layerIndex = (shape: Shape, f: (shapeIndex: number) => number) => {
    setStages(S.map(layerIndexInStage(shape, f)));
  };

  return {
    layerIndex,
  };
}

export default useLayer;
