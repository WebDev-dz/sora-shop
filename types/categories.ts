

export interface CategoryItem {
    id: number
    name: string
    slug: string
    parent: number
    description: string
    display: string
    image: CategoryItemImage
    menu_order: number
    count: number
  }
  export interface CategoryItemImage {
    id: number
    date_created?: string
    date_created_gmt?: string
    date_modified?: string
    date_modified_gmt?: string
    src: string
    name: string
    alt: string
  }