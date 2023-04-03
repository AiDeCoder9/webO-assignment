export function sanitizeController(
  apiDetail: APIDetailType,
  pathVariables?: { [key: string]: Primitive }
) {
  return pathVariables && Object.keys(pathVariables).length
    ? {
        ...apiDetail,
        controllerName: Object.entries(pathVariables).reduce(
          (acc, [key, value]) => (acc = acc.replace(`{${key}}`, value?.toString())),
          apiDetail.controllerName
        )
      }
    : apiDetail;
}
