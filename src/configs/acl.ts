import { Ability, AbilityBuilder } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility)
  if (role === 'admin') {
    can('manage', 'all')
  } else if (role === 'Lead underwriter') {
    can('manage', 'all')
    cannot(['delete', 'update', 'create', 'read'], 'catalog')
    cannot(['delete', 'update', 'create', 'read'], 'user')
  } else if (role === 'Underwriter') {
    can('manage', 'all')
    cannot(['delete', 'update', 'create', 'read'], 'catalog')
    cannot(['delete', 'update', 'create', 'read'], 'user')
    cannot(['delete', 'update', 'read'], 'accountSublimits')
    cannot(['delete', 'update', 'read'], 'accountGenerateEndt')
    cannot(['delete', 'update', 'read', 'create'], 'selectActionsChangeStatus')
  } else if (role === 'Technical assistant') {
    can('manage', 'all')
    cannot(['delete', 'update', 'create', 'read'], 'catalog')
    cannot(['delete', 'update', 'create', 'read'], 'user')
    cannot(['delete', 'update', 'read'], 'accountGenerateEndt')
  } else {
    can(['read', 'create', 'update', 'delete'], subject)
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
