import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function removeVercelHeaders(headers) {
  const newHeaders = {}
  for (const [key, value] of Object.entries(headers)) {
    if (!key.startsWith('x-vercel-')) {
      newHeaders[key] = value
    }
  }
  return newHeaders
}

export default async function handler(request, response) {

    const query = { ...request.query }
    const headers = removeVercelHeaders(request.headers)
    console.log({ 'query': query, 'headers': headers })

    const { data, error } = await supabase
    .from('Requests')
    .insert([
      { 'headers': JSON.stringify(headers), 'query': JSON.stringify(query) },
    ])

    if (error) {
      console.error(error)
    } else {
      console.log("Saved new entry")
    }

    let message = 'Saved!'
    if (query.status_code) {
      response.setStatus(query.status_code)
      message = 'Saved with status code: ' + query.status_code
    }

    response.setHeader('Access-Control-Allow-Origin', '*')
    return response.end(message);
  }
  