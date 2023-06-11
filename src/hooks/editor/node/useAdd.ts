import { partial, pick, pipe, equals } from 'ramda';
import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Shape, Stage } from '../../../utils/editor/node';
import { getResizeScale } from '../../../utils/editor/scale';
import S from '../../../utils/editor/stages';

function useAdd() {
  const setStages = useSetRecoilState(stagesState);

  function addNodeToStage(node: Shape, stage: Stage) {
    const locate = pipe(
      partial(resize(0.35), [stage]),
      partial(center, [stage]),
      partial(avoidSamePos, [stage])
    );

    setStages(S.replace(stage, stage.addChild(locate(node))));
  }

  return {
    addNodeToStage,
  };
}

const resize = (ratio: number) => (stage: Stage, node: Shape) => {
  const scale = getResizeScale(node.bounds.size, stage.bounds.size, ratio);
  return node.map(config => ({
    ...config,
    scaleX: node.bounds.scaleX * scale,
    scaleY: node.bounds.scaleY * scale,
  }));
};

const center = (stage: Stage, node: Shape): Shape =>
  node.map(config => ({
    ...config,
    x: (stage.bounds.width - node.bounds.actualWidth) / 2,
    y: (stage.bounds.height - node.bounds.actualHeight) / 2,
  }));

const avoidSamePos = (stage: Stage, node: Shape): Shape => {
  const properties = ['x', 'y', 'actualWidth', 'actualHeight'];

  const hasSamePosChild =
    stage.filterChild(child =>
      equals(pick(properties, child.bounds), pick(properties, node.bounds))
    ).children.length !== 0;

  if (hasSamePosChild)
    return avoidSamePos(
      stage,
      node.map(config => ({
        ...config,
        x: node.bounds.x + 10,
        y: node.bounds.y + 10,
      }))
    );
  return node;
};

export default useAdd;
