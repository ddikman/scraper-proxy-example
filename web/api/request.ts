
export default async function handler(request: any, response: any) {
    console.log({ 'body': request.body, 'query': request.query, 'headers': request.headers })
    response.setHeader('Access-Control-Allow-Origin', '*')
    return response.end("Saved!");
  }
  