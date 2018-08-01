// @ts-check

import uuid from 'uuid/v4';
import loremIpsum from 'lorem-ipsum';

function randomize(id) {
  return {
    id,
    uid: uuid(),
    message: loremIpsum(),
    createAt: new Date().toJSON(),
  };
}

export const users = {
  users: Array.from(Array(100)).map((n, i) => randomize(i + 1)),
  createdAt: new Date().toJSON(),
  createdBy: 'John Doe',
};

export default users;