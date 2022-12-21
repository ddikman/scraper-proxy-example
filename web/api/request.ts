
function removeVercelHeaders(headers) {
  const newHeaders = {}
  for (const [key, value] of Object.entries(headers)) {
    if (!key.startsWith('x-vercel-')) {
      newHeaders[key] = value
    }
  }
  return newHeaders
}

export default async function handler(request: any, response: any) {
    console.log({ 'body': request.body ?? '', 'query': { ...request.query }, 'headers': removeVercelHeaders(request.headers) })
    response.setHeader('Access-Control-Allow-Origin', '*')
    return response.end("Saved!");
  }
  