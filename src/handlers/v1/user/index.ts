import { Engine } from '@frogfish/engine';
import { BaseHandler } from '../../base';

let logger;
const ADMIN_ROLE = 'user_admin';

export default class UserHander extends BaseHandler {
  constructor(engine: Engine, user) {
    super(engine, user);
    logger = engine.log.log('@user');
  }

  async get(req, res, next) {
    const split = req.path.split('/');
    const userId = split[3];

    try {
      res.json(await this.engine.user.get(userId));
    } catch (err) {
      return err.send(res);
    }
  }

  async post(req, res, next) {
    const accountData = { name: req.body.account_name };
    const options: any = {};

    try {
      res.json(await this.engine.user.create(req.body, accountData, options));
    } catch (err) {
      return err.send(res);
    }
  }

  async put(req, res, next) {
    const userId = req.path.split('/')[3];

    try {
      res.json(await this.engine.user.update(userId, req.body));
    } catch (err) {
      console.error(err);
      return err.send(res);
    }
  }

  // // DEPRECATED
  // async put(req, res, next) {
  //   const userId = req.path.split('/')[3];

  //   require('@frogfish/engine/util/authorize')(this.user, 'write_users')
  //     .then(() => {
  //       return this.engine.user.updateMeta(userId, req.body);
  //     })
  //     .then(result => {
  //       return res.json(result);
  //     })
  //     .catch(err => {
  //       if (err && err.error === 'insufficient_scope' && this.user.id === userId) {
  //         return this.engine.user.updateMeta(userId, req.body);
  //       }

  //       return Promise.reject(err);
  //     })
  //     .then(result => {
  //       return res.json(result);
  //     })
  //     .catch(err => {
  //       return err.send(res);
  //     });
  // }

  async delete(req, res, next) {
    const userId = req.path.split('/')[3];

    try {
      res.json(await this.engine.user.remove(userId));
    } catch (err) {
      err.send(res);
    }
  }
}
