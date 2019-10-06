let logger;

export default class UserRolesHandler {
  private api;

  constructor(private engine, private user) {
    logger = engine.log.log('service:user:roles');
    this.api = this.engine.user;
  }

  get(req, res, params, callback) {
    const split = req.path.split('/');
    const userId = split[3];

    this.api
      .listUserRoles(userId)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        return err.send(res);
      });
  }
}
