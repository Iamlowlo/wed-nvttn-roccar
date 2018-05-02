import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import index from '@angular/cli/lib/cli';

export const defaultDuration = 300;
export const defaultDelay = 0;

export const dropDown = trigger('dropDown', [
  transition(
    ':enter',
    [
      style( {height: 0, opacity: 0}),
      animate(
        '{{duration}}ms {{delay}}ms ease-in',
        style( {height: '*', opacity: 1})
      )
    ],
    { params: { duration: defaultDuration, delay: defaultDelay } }
  ),
  transition(
    ':leave',
    [
      animate(
        '{{duration}}ms {{delay}}ms ease-in',
        style( {height: 0, opacity: 0})
      )
    ],
    { params: { duration: defaultDuration, delay: defaultDelay } }
  )
]);

export const showUp = trigger('showUp', [
  transition(
    ':enter',
    [
      style( {transform: 'translateY(75%)', 'z-index': 0}),
      animate(
        '{{duration_1}}ms {{delay}}ms ease-in-out',
        style( {transform: 'translateY(-25%)'})
      ),
      style( {'z-index': '1'}),
      animate(
        '{{duration_2}}ms {{delay}}ms ease-in',
        style( {transform: 'translateY(0%)'})
      )
    ],
    { params: { duration_1: 0.9 * defaultDuration, duration_2: 0.1 * defaultDuration, delay: defaultDelay } }
  )
]);

export const fadeIn = trigger('fadeIn', [
  transition(
    ':enter',
    [
      style( {opacity: 0}),
      animate(
        '{{duration}}ms {{delay}}ms ease-in-out',
        style( {opacity: 1})
      )
    ],
    { params: { duration: defaultDuration, delay: defaultDelay } }
  )
]);

export const fadeOut = trigger('fadeOut', [
  transition(
    ':leave',
    [
      style( {opacity: 1, position: 'absolute'}),
      animate(
        '{{duration}}ms {{delay}}ms ease-in-out',
        style( {opacity: 0})
      )
    ],
    { params: { duration: defaultDuration, delay: defaultDelay } }
  )
]);

export const fadeOutShrinking = trigger('fadeOutShrinking', [
  transition(
    ':enter',
    [
      style( {
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(1)'}),
      animate(
        '{{duration}}ms {{delay}}ms ease-in-out',
        style( {
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.1)'})
      )
    ],
    { params: { duration: defaultDuration, delay: defaultDelay } }
  )
]);

export const textCrawl = trigger('textCrawl', [
  transition(
    ':enter',
    [
      style( {
        transform: ' perspective(200px) rotateX(25deg) translateZ(0px) translateY(80%)'}),
      animate(
        '{{duration}}ms {{delay}}ms linear',
        style( {
          transform: ' perspective(200px) rotateX(25deg) translateZ(0px) translateY(-10%)'})
      )
    ],
    { params: { duration: defaultDuration, delay: defaultDelay } }
  )
]);

