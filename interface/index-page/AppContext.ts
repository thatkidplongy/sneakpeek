import { ProductsModel } from'./products'

export interface AppContextModel {
    cartItems: ProductsModel[],
    increaseQuantity(): number,
    decreaseQuantity(): number,
    onAddToCart(product: ProductsModel, quantity: number): any,
    onRemove(product: ProductsModel): any,
    quantity: number,
    setCartItems(cartItems: ProductsModel[]): ProductsModel[],
    setTotalPrice(totalPrice: number): number,
    setTotalQuantities(totalPrice: number): number,
    showCart: boolean,
    setShowCart(isShown: boolean): boolean,
    toggleCartItemQuantity(id: string, value: string): string,
    totalPrice: number,
    totalQuantities: number
}