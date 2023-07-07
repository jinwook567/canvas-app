import { atom, DefaultValue, selector } from 'recoil';
import { Shape, Stage } from 'utils/editor/node';
import S, { Stages } from 'utils/editor/stages';

export const stagesState = atom<Stages>({
  key: 'stagesState',
  default: [],
});

const selectedStageIdState = atom<string | null>({
  key: 'selectedStageIdState',
  default: null,
});

export const selectedStageState = selector<Stage | null>({
  key: 'selectedStageState',
  get: ({ get }) => {
    const id = get(selectedStageIdState);
    if (!id) return null;

    const stages = get(stagesState);
    return S.filter(S.equals({ id }), stages)[0] || null;
  },
  set: ({ set }, newValue) => {
    set(
      selectedStageIdState,
      newValue instanceof DefaultValue ? newValue : newValue?.id || null
    );
  },
});

export const selectedIdsState = atom<string[]>({
  key: 'selectedIdsState',
  default: [],
});

export const selectedNodesState = selector<Shape[]>({
  key: 'selectedChildState',
  get: ({ get }) => {
    const stages = get(stagesState);
    const selectedIds = get(selectedIdsState);
    const allNodes = S.iter(stages).flatMap(stage => stage.children);

    const isSelected = (child: Shape) => selectedIds.includes(child.id);
    return allNodes.filter(isSelected);
  },
});

type HistoryState = {
  stages: Stages;
  prev: HistoryState;
  next: HistoryState;
} | null;

export const historyState = atom<HistoryState>({
  key: 'historyState',
  default: null,
});

export const tabValue = {
  assetImage: 'asset-image' as const,
  assetTemplate: 'asset-template' as const,
  assetText: 'asset-text' as const,
  assetFigure: 'asset-figure' as const,
  assetUpload: 'asset-upload' as const,
  handlerPosition: 'handler-position' as const,
};

type SelectedTabValue = (typeof tabValue)[keyof typeof tabValue];

export const selectedTabState = atom<SelectedTabValue>({
  key: 'selectedTab',
  default: tabValue.assetImage,
});
