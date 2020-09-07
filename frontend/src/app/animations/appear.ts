import { trigger, state, style, transition, animate } from '@angular/animations'

export default trigger('appear', [
  state('void', style({
    transform: 'rotateX(-90deg)',
    opacity: 0
  })),

  transition('void <=> *', [
    animate('.35s ease-in')
  ])
])