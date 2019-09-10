import { BehaviorSubject } from 'rxjs';

export const cart$ = new BehaviorSubject(window.localStorage.getItem('cart') || []);

export function updateCart(newCart) {
  if(!newCart){
    window.localStorage.removeItem('cart');
  }
  else{
    window.localStorage.setItem('cart', newCart);
  }
 cart$.next(newCart);
 console.log(cart$.value)
}

/*
{
  name: '',
  quantity: 0,
  price: 0,
  totalPrice: 0
}
*/