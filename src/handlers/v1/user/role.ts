let logger;

export default class UserRoleHandler {
  private api;

  constructor(private engine, private user) {
    logger = engine.log.log('@user-role');
    this.api = this.engine.user;
  }

  put(req, res, next) {
    const split = req.path.split('/');
    const userId = split[3];
    const roleId = split[5];

    this.api
      .addRoleToUser(userId, roleId)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        return err.send(res);
      });
  }

  delete(req, res, next) {
    const split = req.path.split('/');
    const userId = split[3];
    const roleId = split[5];

    this.api
      .removeRoleFromUser(userId, roleId)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        return err.send(res);
      });
  }
}
