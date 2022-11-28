/**
 * No-op pipeline request.
 */
export function request() {
  return {};
}

/**
 * Returns the previous response
 * @param ctx the request context
 */
export function response(ctx) {
  const data = ctx.prev.result;
  data.fileBasedJSOverride = 'I was set by a file-based JS resolver';
  return data;
}