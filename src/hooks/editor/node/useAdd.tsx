import _ from 'lodash';
import { useSetRecoilState } from 'recoil';
import { stageClassesState } from '../../../recoil/editor/atoms';
import { Shape, Size } from '../../../types/editor';
import { getResizeScale } from '../../../utils/editor/scale';

function useAdd() {
  const setStages = useSetRecoilState(stageClassesState);

  function addShapeToStage(shapeToAdd: Shape, stageId: string) {
    setStages(stages =>
      stages.map(stage =>
        stage.id === stageId
          ? stage.setChildren([
              ...stage.children,
              _.chain(shapeToAdd)
                .thru(shape => resize(shape, stage.bounds.size, 0.35))
                .thru(shape => center(shape, stage.bounds.size))
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

function resize(shapeToUpdate: Shape, size: Size, ratio: number) {
  const scale = getResizeScale(shapeToUpdate.bounds.size, size, ratio);
  return shapeToUpdate.setConfig({
    ...shapeToUpdate.config,
    scaleX: shapeToUpdate.bounds.scaleX * scale,
    scaleY: shapeToUpdate.bounds.scaleY * scale,
  });
}

function center(shapeToUpdate: Shape, size: Size) {
  return shapeToUpdate.setConfig({
    ...shapeToUpdate.config,
    x: (size.width - shapeToUpdate.bounds.actualWidth) / 2,
    y: (size.height - shapeToUpdate.bounds.actualHeight) / 2,
  });
}

function avoidSamePos(shapeToUpdate: Shape, shapes: Shape[]): Shape {
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
