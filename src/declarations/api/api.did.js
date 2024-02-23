export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'deleteAllOrgs' : IDL.Func([], [IDL.Vec(IDL.Text)], []),
    'deleteAllUsers' : IDL.Func([], [IDL.Vec(IDL.Text)], []),
    'getAllActivity' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getOrganizationAdmins' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Vec(IDL.Text))],
        ['query'],
      ),
    'getOrganizations' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getUsers' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'insertOrganization' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'insertOrganizationUser' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Opt(IDL.Text)],
        [],
      ),
    'isLoggedIn' : IDL.Func([], [IDL.Bool], []),
    'logActivity' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'logLogin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
