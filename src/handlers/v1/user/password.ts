import { ApplicationError } from '@frogfish/engine/error';

let logger;

export default class UserPasswordHandler {
  private api;

  constructor(private engine, private user) {
    logger = engine.log.log('@user-password');
    this.api = this.engine.user;
  }

  put(req, res, params, callback) {
    const split = req.path.split('/');
    const userId = split[3];

    require('@frogfish/engine/util/authorize')(this.user, 'write_users')
      .then(() => {
        return this.api.updatePassword(userId, req.body.password, req.body.newpassword);
      })
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        if (err && err.error === 'insufficient_scope' && this.user.id === userId) {
          return this.api.updatePassword(userId, req.body.password, req.body.newpassword);
        }

        return Promise.reject(err);
      })
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        return err.send(res);
      });
  }
}
