export function replaceStage<T extends { id: string }>(
  stages: T[],
  stageToUpdate: T
) {
  return stages.map(stage =>
    stage.id === stageToUpdate.id ? stageToUpdate : stage
  );
}
