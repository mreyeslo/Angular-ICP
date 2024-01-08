export const idlFactory = ({ IDL }) => {
  const Item = IDL.Record({ 'id' : IDL.Text, 'content' : IDL.Text });
  return IDL.Service({
    'addItem' : IDL.Func([Item], [IDL.Opt(Item)], ['query']),
    'getAll' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'test' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
