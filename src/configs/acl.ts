import { Ability, AbilityBuilder } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}
export type acl = {
  action: string[]
  module: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string, acl: acl[]) => {
  const { can, /*cannot,*/ rules } = new AbilityBuilder(AppAbility)
  if (role === 'admin') {
    can('manage', 'all')
    acl?.forEach((element) =>{
      console.log('elementAction => ', element?.action);
      console.log('elementModule => ', element?.module);
    });
  } else if (role === 'Lead underwriter') {
    acl?.forEach((element) =>{
      can(element?.action, element?.module)
    });
  } else if (role === 'Underwriter') {
    acl?.forEach((element) =>{
      can(element?.action, element?.module)
    });
  } else if (role === 'Technical assistant') {
    acl?.forEach((element) =>{
      can(element?.action, element?.module)
    });
  } else if (role === 'Suscriptor') {
    acl?.forEach((element) =>{
      can(element?.action, element?.module)
    });
  } else if (role === 'Reasegurador') {
    acl?.forEach((element) =>{
      can(element?.action, element?.module)
    });
  } else if (role === 'Asegurado') {
    acl?.forEach((element) =>{
      can(element?.action, element?.module)
    });
  } else if (role === 'Asegurador') {
    acl?.forEach((element) =>{
      can(element?.action, element?.module)
    });
  } else if (role === 'Técnico') {
    acl?.forEach((element) =>{
      can(element?.action, element?.module)
    });
  } else {
    can(['read', 'create', 'update', 'delete'], subject)
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string, acl: acl[]): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject, acl), {
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
