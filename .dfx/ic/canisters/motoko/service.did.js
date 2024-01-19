export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addData' : IDL.Func([IDL.Text, IDL.Text], [], ['oneway']),
    'getData' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
