// User -> Logout

export const logout = async (req, res) => {
  res.cookie('access-token', '', { maxAge: 1 })
  res.status(200).json('Logout Successfully')
};
