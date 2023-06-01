import { NodeConfig } from 'konva/lib/Node';
import _ from 'lodash';
import { useSetRecoilState } from 'recoil';
import { stageClassesState } from '../../../recoil/editor/atoms';
import { Shape } from '../../../types/editor';
import { getResizeScale } from '../../../utils/editor/scale';
import { Size } from '../../../utils/editor/size';

function useAdd() {
  const setStages = useSetRecoilState(stageClassesState);

  function addShapeToStage<Config extends NodeConfig>(
    shapeToAdd: Shape<Config>,
    stageId: string
  ) {
    setStages(stages =>
      stages.map(stage =>
        stage.id === stageId
          ? stage.setChildren([
              ...stage.children,
              _.chain(shapeToAdd)
                .thru(shape => resize(shape, stage.bounds.originSize, 0.35))
                .thru(shape => center(shape, stage.bounds.originSize))
                .thru(shape => avoidSamePos(shape, stage.children))
                .value(),
            ])
          : stage
      )
    );
  }

  return {
    addShapeToStage,
  };
}

function resize<Config extends NodeConfig>(
  shapeToUpdate: Shape<Config>,
  size: Size,
  ratio: number
) {
  const scale = getResizeScale(shapeToUpdate.bounds.size, size, ratio);
  return shapeToUpdate.setConfig({
    ...shapeToUpdate.config,
    scaleX: shapeToUpdate.bounds.scaleX * scale,
    scaleY: shapeToUpdate.bounds.scaleY * scale,
  });
}

function center<Config extends NodeConfig>(
  shapeToUpdate: Shape<Config>,
  size: Size
) {
  return shapeToUpdate.setConfig({
    ...shapeToUpdate.config,
    x: (size.width - shapeToUpdate.bounds.actualWidth) / 2,
    y: (size.height - shapeToUpdate.bounds.actualHeight) / 2,
  });
}

function avoidSamePos<Config extends NodeConfig>(
  shapeToUpdate: Shape<Config>,
  shapes: Shape[]
): Shape<Config> {
  const properties = ['x', 'y', 'actualWidth', 'actualHeight'];

  const samePosShape = shapes.find(shape =>
    _.isEqual(
      _.pick(shapeToUpdate.bounds, properties),
      _.pick(shape.bounds, properties)
    )
  );

  return samePosShape
    ? avoidSamePos(
        shapeToUpdate.setConfig({
          ...shapeToUpdate.config,
          x: shapeToUpdate.bounds.x + 10,
          y: shapeToUpdate.bounds.y + 10,
        }),
        shapes
      )
    : shapeToUpdate;
}

export default useAdd;
