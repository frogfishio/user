let logger;

export default class UserRolesHandler {
  private api;

  constructor(private engine, private user) {
    logger = engine.log.log('service:user:roles');
  }

  async get(req, res, params, callback) {
    const split = req.path.split('/');
    const userId = split[3];

    try {
      res.json(await this.engine.user.getUserRoles(userId));
    } catch (err) {
      return err.send(res);
    }
  }
}
