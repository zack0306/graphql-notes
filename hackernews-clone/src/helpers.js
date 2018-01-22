const jwt = require('jwtwebtoken');

const getUserId = (context) => {
  const Authorization = context.request.get('Authorization');
  if (!Authorization) throw new Error('Not authenticated');

  const token = Authorization.replace('Bearer ', '');
  const { userId } = jwt.verify(token, APP_SECRET);
  return userId;
};

module.exports = { getUserId };
