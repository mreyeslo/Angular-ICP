export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'clearOrganization' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'getFromKey' : IDL.Func(
        [IDL.Text],
        [
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Text,
              'internetIdentity' : IDL.Principal,
              'username' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'insertOrganization' : IDL.Func([IDL.Text, IDL.Principal], [IDL.Text], []),
    'itemsOrganization' : IDL.Func(
        [IDL.Nat32],
        [
          IDL.Vec(
            IDL.Tuple(
              IDL.Text,
              IDL.Record({
                'id' : IDL.Text,
                'internetIdentity' : IDL.Principal,
                'username' : IDL.Text,
              }),
            )
          ),
        ],
        ['query'],
      ),
    'keysOrganization' : IDL.Func([IDL.Nat32], [IDL.Vec(IDL.Text)], ['query']),
    'valuesOrganization' : IDL.Func(
        [IDL.Nat32],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'internetIdentity' : IDL.Principal,
              'username' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
