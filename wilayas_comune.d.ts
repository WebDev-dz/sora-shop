declare module "@/lib/wilayas_comune.json" {
    const value: {
      wilaya_id: number
      wilaya_name_ar: string
      wilaya_name_fr: string
      capital_ar: string
      capital_fr: string
      num_municipalities: number
      municipalities: { ar: string; fr: string }[]
    }[]
    export default value
  }

  declare module "@/lib/cities.json" {
    const value: {
      id: number
      commune_name_ascii: string
      commune_name: string
      daira_name_ascii: string
      daira_name: string
      wilaya_code: string
      wilaya_name_ascii: string
      wilaya_name: string
    }[]
    export default value
  }
 
  declare module "@/lib/wilaya.json" {
    const value: {
      id: string
      code: string
      name: string
      ar_name: string
      longitude: string
      latitude: string
    }[]
    export default value
  }