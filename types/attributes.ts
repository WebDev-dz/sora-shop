



export interface Attribute {
    id: number
    name: string
    slug: string
    type: string
    order_by: string
    has_archives: boolean
  }


  export interface Term {
    id: number
    name: string
    slug: string
    description: string
    menu_order: number
    count: number
  }
  