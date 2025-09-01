class supabaseClient {
  private url: string
  private key: string
  private headers: Record<string, string>

  constructor(url: string, key: string) {
    this.url = url
    this.key = key
    this.headers = {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }
  }

  // Auth methods
  auth = {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      const response = await fetch(`${this.url}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ email, password }),
      })
      return await response.json()
    },

    signUp: async ({ email, password }: { email: string; password: string }) => {
      const response = await fetch(`${this.url}/auth/v1/signup`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ email, password }),
      })
      return await response.json()
    },

    signOut: async () => {
      const response = await fetch(`${this.url}/auth/v1/logout`, {
        method: "POST",
        headers: this.headers,
      })
      return await response.json()
    },
  }

  // Database methods
  from(table: string) {
    return {
      select: (columns = "*") => ({
        eq: (column: string, value: any) => this.query("GET", table, { [column]: `eq.${value}` }),
        order: (column: string, options?: { ascending?: boolean }) =>
          this.query("GET", table, { order: `${column}.${options?.ascending ? "asc" : "desc"}` }),
        limit: (count: number) => this.query("GET", table, { limit: count.toString() }),
        single: () => this.query("GET", table, { limit: "1" }),
        then: (callback: (result: any) => void) => {
          this.query("GET", table).then(callback)
        },
      }),
      insert: (data: any) => ({
        select: () => this.query("POST", table, {}, data),
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => this.query("PATCH", table, { [column]: `eq.${value}` }, data),
      }),
      delete: () => ({
        eq: (column: string, value: any) => this.query("DELETE", table, { [column]: `eq.${value}` }),
      }),
    }
  }

  private async query(method: string, table: string, params: Record<string, string> = {}, body?: any) {
    const url = new URL(`${this.url}/rest/v1/${table}`)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    const response = await fetch(url.toString(), {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()
    return { data, error: response.ok ? null : data }
  }
}

export function createClient() {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return new supabaseClient(supabaseUrl, supabaseAnonKey)
}
