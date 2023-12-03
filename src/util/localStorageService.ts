export const localStorageService = (food: any, amount: any) => {
  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify({ cart: [] }))
  }
  let user: any = localStorage.getItem('user')
  const getUser = JSON.parse(user)
  console.log(getUser.cart.length)
  if (getUser.cart.length == 0) {
    console.log(user.cart)
    const recentCart: any = user.cart
    const newUser = JSON.parse(user)
    const newCart = newUser.cart
    console.log(newCart)
    user = {
      cart: [
        {
          ...food,
          quantity: amount
        }]
    }
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    console.log('cart not null')
    console.log(food.quantity)
    console.log(getUser.cart)
    let isExisted = false
    for (let i = 0; i < getUser.cart.length; i++) {
      if (getUser.cart[i].id == (food.id || food.foodID)) {
        console.log(getUser.cart[i].id, food.id)
        getUser.cart[i].quantity = amount
        isExisted = true
        localStorage.setItem('user', JSON.stringify(getUser))
        break;
      }
    }
    if (isExisted === false) {
      console.log('isExisted is false')
      const newUser = {
        cart: [
          ...getUser.cart,
          {
            ...food,
            quantity: amount
          }
        ]
      }
      localStorage.setItem('user', JSON.stringify(newUser))
    }
  }
}