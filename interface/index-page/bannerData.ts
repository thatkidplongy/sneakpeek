export interface BannerModel {
    buttonText: string,
    desc: string,
    discount: string,
    image: BannerImageModel,
    largeText1: string,
    largeText2: string,
    midText: string,
    product: string,
    saleTime: string,
    smallText: string,
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string,
}

export interface BannerImageModel {
    asset:  AssetModel,
    _type: string
}

export interface AssetModel {
    _ref: string,
    _type: string
}