import { trigger, state, style, transition, animate } from '@angular/animations'

export default trigger('delete', [
  state('void', style({
    transform: 'translateX(-100%)',
    opacity: 0
  })),

  transition('void <=> *', [
    animate('.7s ease-in')
  ])
])