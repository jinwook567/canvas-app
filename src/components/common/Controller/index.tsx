import React, { createContext } from 'react';

type Props = {
  show: boolean;
  type: string;
  children: React.ReactNode;
};

const Context = createContext<string>('');

function Controller({ show, type, children }: Props) {
  if (!show) return null;
  return <Context.Provider value={type}>{children}</Context.Provider>;
}

type ItemProps = Omit<Props, 'show'>;

function Item({ type, children }: ItemProps) {
  return (
    <Context.Consumer>{value => value === type && children}</Context.Consumer>
  );
}

Controller.Item = Item;

export default Controller;
