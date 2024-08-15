import React, { createContext } from 'react';

type Props = {
  show: boolean;
  selectedType: string;
  children: React.ReactNode;
};

const Context = createContext<string>('');

function Toggle({ show, selectedType, children }: Props) {
  if (!show) return null;
  return <Context.Provider value={selectedType}>{children}</Context.Provider>;
}

type ItemProps = {
  type: string;
  children: React.ReactNode;
};

function Item({ type, children }: ItemProps) {
  return (
    <Context.Consumer>{value => value === type && children}</Context.Consumer>
  );
}

Toggle.Item = Item;

export default Toggle;
