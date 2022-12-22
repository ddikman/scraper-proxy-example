import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(request, response) {
    
    let { data, error } = await supabase
        .from('Requests')
        .select('*')
        .range(0, 20)
        .order('id', { ascending: false })

    if (error) {
        response.statusCode = 500
        return response.end(JSON.stringify(error))
    }

    response.setHeader('Access-Control-Allow-Origin', '*')
    return response.end(JSON.stringify(data))
  }
  