import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'

function setup() {
  const dom = new JSDOM('<body data-control-mode="avatar"><dialog id="room-layout-dialog"></dialog><div id="help-modal"></div><div class="avatar-setting-modal"></div></body>', { runScripts: 'outside-only' })
  const w = dom.window as any
  let takeovers = 0
  w.campusExplorer = { manualTakeover: () => takeovers++ }
  for (const file of ['mobile-control-math.js', 'mobile-controls.js']) {
    const path = `public/campus-explorer/${file}`
    if (existsSync(path)) w.eval(readFileSync(path, 'utf8'))
  }
  const move = w.document.getElementById('mobile-move-stick')
  const look = w.document.getElementById('mobile-look-stick')
  for (const el of [move, look]) if (el) {
    el.getBoundingClientRect = () => ({ left: 0, top: 0, width: 112, height: 112 })
    el.setPointerCapture = () => {}
    el.releasePointerCapture = () => {}
  }
  function pointer(el: any, type: string, id: number, x = 56, y = 16) {
    expect(el).toBeTruthy()
    const e = new w.Event(type, { bubbles: true, cancelable: true })
    Object.assign(e, { pointerId: id, clientX: x, clientY: y, button: 0 })
    el.dispatchEvent(e)
  }
  return { dom, w, move, look, pointer, takeovers: () => takeovers }
}

describe('mobile joystick math', () => {
  it('limits diagonal magnitude, maps upward to forward and has a .12 deadzone', () => {
    const { w } = setup()
    expect(w.CampusMobileControlMath?.vector).toBeTypeOf('function')
    expect(w.CampusMobileControlMath.vector(3, 0)).toEqual({ x: 0, y: 0 })
    expect(w.CampusMobileControlMath.vector(4.8, 0)).toEqual({ x: 0, y: 0 })
    const axis = w.CampusMobileControlMath.vector(40, -40)
    expect(Math.hypot(axis.x, axis.y)).toBeCloseTo(1)
    expect(axis.x).toBeGreaterThan(0)
    expect(axis.y).toBeGreaterThan(0)
    expect(w.CampusMobileControlMath.vector(0, -40)).toEqual({ x: 0, y: 1 })
  })
})

describe('independent pointer controls', () => {
  it('supports two pointers and keeps the other joystick held after pointerup', () => {
    const s = setup()
    s.pointer(s.move, 'pointerdown', 11)
    s.pointer(s.look, 'pointerdown', 22, 96, 56)
    expect(s.w.campusMobileControls.move).toEqual({ x: 0, y: 1 })
    expect(s.w.campusMobileControls.look).toEqual({ x: 1, y: 0 })
    expect(s.takeovers()).toBe(2)
    s.pointer(s.move, 'pointerup', 11)
    expect(s.w.campusMobileControls.move.y).toBe(0)
    expect(s.w.campusMobileControls.look.x).toBe(1)
    expect(s.look.dataset.x).toBe('1')
  })
  it('ignores unrelated pointers and takes over only after effective motion', () => {
    const s = setup()
    s.pointer(s.move, 'pointerdown', 11, 56, 56)
    expect(s.takeovers()).toBe(0)
    s.pointer(s.move, 'pointermove', 12)
    expect(s.w.campusMobileControls.move.y).toBe(0)
    s.pointer(s.move, 'pointermove', 11)
    expect(s.takeovers()).toBe(1)
    s.pointer(s.move, 'pointermove', 11)
    expect(s.takeovers()).toBe(1)
  })
  for (const event of ['pointercancel', 'lostpointercapture']) it(`clears ${event} and visual state`, () => {
    const s = setup()
    s.pointer(s.move, 'pointerdown', 1)
    s.pointer(s.move, event, 1)
    expect(s.w.campusMobileControls.move).toEqual({ x: 0, y: 0 })
    expect(s.move.dataset.active).toBe('false')
    expect(s.move.dataset.y).toBe('0')
  })
  it('clears both sticks on blur and hidden visibility', () => {
    const s = setup()
    s.pointer(s.move, 'pointerdown', 1)
    s.pointer(s.look, 'pointerdown', 2)
    s.w.dispatchEvent(new s.w.Event('blur'))
    expect(s.w.campusMobileControls.move.y).toBe(0)
    expect(s.w.campusMobileControls.look.y).toBe(0)
    s.pointer(s.move, 'pointerdown', 3)
    Object.defineProperty(s.w.document, 'hidden', { value: true })
    s.w.document.dispatchEvent(new s.w.Event('visibilitychange'))
    expect(s.w.campusMobileControls.move.y).toBe(0)
  })
  it('clears input when mode changes and prevents bird mode movement', async () => {
    const s = setup()
    s.pointer(s.move, 'pointerdown', 1)
    s.w.document.body.dataset.controlMode = 'firstperson'
    await Promise.resolve()
    expect(s.w.campusMobileControls.move.y).toBe(0)
    s.w.document.body.dataset.controlMode = 'bird'
    s.pointer(s.move, 'pointerdown', 2)
    expect(s.w.campusMobileControls.move.y).toBe(0)
  })
  for (const selector of ['dialog', '#help-modal', '.avatar-setting-modal']) it(`clears when ${selector} opens`, async () => {
    const s = setup()
    s.pointer(s.move, 'pointerdown', 1)
    const dialog = s.w.document.querySelector(selector)
    if (selector === 'dialog') dialog.setAttribute('open', '')
    else dialog.classList.add('open')
    await Promise.resolve()
    expect(s.w.campusMobileControls.move.y).toBe(0)
    s.pointer(s.move, 'pointerdown', 2)
    expect(s.w.campusMobileControls.move.y).toBe(0)
  })
})
