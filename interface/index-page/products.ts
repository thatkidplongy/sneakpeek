export interface ProductsModel {
    quantity: number
    details: string,
    image: ProductImageModel[],
    name: string,
    price: number
    slug: SlugModel,
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string,
}

export interface ProductImageModel {
    asset:  AssetModel,
    _key: string,
    _type: string
}[]

export interface AssetModel {
    _ref: string,
    _type: string
}

export interface SlugModel {
    current: string,
    _type: string
}