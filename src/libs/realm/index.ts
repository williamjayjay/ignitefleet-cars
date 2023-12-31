import Realm from 'realm'
import { createRealmContext } from '@realm/react';

import { Historic } from './schemas/Historic';

Realm.flags.THROW_ON_GLOBAL_REALM = true;


const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: any = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior
}

export const {
  RealmProvider,
  useRealm,
  useQuery,
  useObject
} = createRealmContext({
  schema: [Historic]
});