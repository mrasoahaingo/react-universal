import {
    createResolver,
    createClientResolver as _createClientResolver,
    createTransitionHook,
    PRE_RESOLVE_HOOK,
    DEFER_RESOLVE_HOOK
} from 'reasync'

export const createServerResolver = () => {
  const resolver = createResolver()
  console.log('[SERVER] createServerResolver')
  resolver
      .addHooks(PRE_RESOLVE_HOOK)
      .addHooks(createTransitionHook())

  return resolver
}

export const createClientResolver = (history, location, initLocation, customAttributes) => {
  const resolver = _createClientResolver(history, location, initLocation, customAttributes);
  console.log('[BROWSER] createClientResolver')
  resolver
      .addHooks(PRE_RESOLVE_HOOK)
      .addHooks(createTransitionHook({ executeIfPreviousFailed: true }), DEFER_RESOLVE_HOOK);

  return resolver
}