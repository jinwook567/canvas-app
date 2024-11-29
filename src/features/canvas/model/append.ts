import { Subject } from 'rxjs';
import { Container } from 'features/canvas/model/base';
import { PackageConfig } from 'entities/canvas';

type Event = { type: 'append'; container: Container; shape: PackageConfig };

export const append =
  (subject: Subject<Event>) => (container: Container, shape: PackageConfig) => {
    subject.next({ type: 'append', container, shape });
  };

export const subscribe = (setState: any) => (event: Event) => {
  event.container;
};
