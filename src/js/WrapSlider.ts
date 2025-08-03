interface SliderOptions {
  offset?: number
  deceleration?: number
  sensitivity?: number
  damping?: number
  outputElement?: HTMLElement | null
}

interface Position {
  x: number
  y: number
}

export class WrapAroundSlider {
  private container: HTMLElement
  private stage: HTMLElement
  private outputElement: HTMLElement | null

  private offset: number = 40
  private deceleration: number = 0.95
  private sensitivity: number = 0.2
  private damping: number = 0.02

  private containerWidth: number = 0
  private stageWidth: number = 0

  private xpos: number = 0
  private acceleration: number = 0

  private previousLocation: Position = { x: 0, y: 0 }
  private currentLocation: Position = { x: 0, y: 0 }
  private dragging: boolean = false
  private isTouch: boolean = false

  private boundOnTouchStart = this.onTouchStart.bind(this)
  private boundOnTouchEnd = this.onTouchEnd.bind(this)
  private boundOnTouchMove = this.onTouchMove.bind(this)
  private boundOnMouseDown = this.onMouseDown.bind(this)
  private boundOnMouseUp = this.onMouseUp.bind(this)
  private boundOnMouseMove = this.onMouseMove.bind(this)
  private boundUpdate = this.update.bind(this)
  private boundOnWheel = this.onWheel.bind(this)  // NEW wheel binding

  private onUpdateScrollOffset: ((percent: number) => void) | null = null
  private onDrag: (() => void) | null = null
  private onDragEnd: (() => void) | null = null

  constructor(
    container: HTMLElement,
    stage: HTMLElement,
    options: SliderOptions = {},
    onUpdateScrollOffset?: (percent: number) => void,
    onDrag?: () => void,
    onDragEnd?: () => void,
  ) {
    this.container = container
    this.stage = stage
    this.outputElement = options.outputElement || null

    this.offset = options.offset ?? this.offset
    this.deceleration = options.deceleration ?? this.deceleration
    this.sensitivity = options.sensitivity ?? this.sensitivity
    this.damping = options.damping ?? this.damping

    this.isTouch = 'ontouchstart' in window

    if (typeof onUpdateScrollOffset === 'function') {
      this.onUpdateScrollOffset = onUpdateScrollOffset
    }
    if (typeof onDragEnd === 'function') {
      this.onDragEnd = onDragEnd
    }
    if (typeof onDrag === 'function') {
      this.onDrag = onDrag
    }
    this.init()
  }

  private init(): void {
    this.stageWidth = this.stage.offsetWidth
    this.containerWidth = this.container.offsetWidth

    this.xpos = this.stageWidth / 2

    this.container.style.position = 'absolute'
    this.setPosition()
    this.addEventListeners()
  }

  private addEventListeners(): void {
    if (this.isTouch) {
      this.container.addEventListener('touchstart', this.boundOnTouchStart, false)
      this.container.addEventListener('touchend', this.boundOnTouchEnd, false)
    } else {
      this.container.addEventListener('mousedown', this.boundOnMouseDown, false)
      this.container.addEventListener('mouseup', this.boundOnMouseUp, false)
      // this.container.addEventListener('mouseout', this.boundOnMouseUp, false)
      this.container.addEventListener('wheel', this.boundOnWheel, { passive: false })  // Added wheel listener
    }
  }

  private removeEventListeners(): void {
    if (this.isTouch) {
      this.container.removeEventListener('touchstart', this.boundOnTouchStart)
      this.container.removeEventListener('touchmove', this.boundOnTouchMove)
      this.container.removeEventListener('touchend', this.boundOnTouchEnd)
    } else {
      this.container.removeEventListener('mousedown', this.boundOnMouseDown)
      this.container.removeEventListener('mousemove', this.boundOnMouseMove)
      this.container.removeEventListener('mouseup', this.boundOnMouseUp)
      this.container.removeEventListener('wheel', this.boundOnWheel)  // Remove wheel listener
    }
  }

  private onTouchStart(event: TouchEvent): void {
    this.onMoveStart(event)
    console.log('onTouchStart')
    this.container.addEventListener('touchmove', this.boundOnTouchMove, false)
  }

  private onTouchEnd(event: TouchEvent): void {
    this.onMoveEnd(event)
    this.container.removeEventListener('touchmove', this.boundOnTouchMove)
    if (this.onDragEnd) {
      this.onDragEnd()
    }
  }

  private onTouchMove(event: TouchEvent): void {
    this.onMove(event)
  }

  private onMouseDown(event: MouseEvent): void {
    this.onMoveStart(event)
   
  }

  private onMouseUp(event: MouseEvent): void {
    this.onMoveEnd(event)
  }

  private onMouseMove(event: MouseEvent): void {
    this.onMove(event)
  }

  private onMoveStart(event: TouchEvent | MouseEvent): void {
    event.preventDefault()
    this.container.addEventListener('mousemove', this.boundOnMouseMove, false)


    this.containerWidth = this.container.offsetWidth

    const pointer = this.getPointerEvent(event)
    this.previousLocation.x = pointer.pageX
    this.previousLocation.y = pointer.pageY

    this.dragging = true
       if (this.onDrag) {
      this.onDrag()
    }
  }

  private onMoveEnd(event: TouchEvent | MouseEvent): void {
    event.preventDefault()

    if (this.dragging && this.onDragEnd) {
      this.onDragEnd()
    }
    this.container.removeEventListener('mousemove', this.boundOnMouseMove)

  this.dragging = false
    // requestAnimationFrame(this.boundUpdate)
  }

  private onMove(event: TouchEvent | MouseEvent): void {
    event.preventDefault()
    if (!this.dragging) return

    const pointer = this.getPointerEvent(event)
    this.currentLocation.x = pointer.pageX
    this.currentLocation.y = pointer.pageY

    const delta = this.currentLocation.x - this.previousLocation.x
    this.xpos += delta

    this.setPosition()

    this.acceleration = delta / this.sensitivity

    this.previousLocation.x = this.currentLocation.x
    this.previousLocation.y = this.currentLocation.y
  }

  private getPointerEvent(event: TouchEvent | MouseEvent): { pageX: number; pageY: number } {
    return (event as TouchEvent).touches ? (event as TouchEvent).touches[0] : (event as MouseEvent)
  }

  private onWheel(event: WheelEvent): void {
    event.preventDefault()


    const rawDelta = event.deltaY || event.deltaX
    const delta = Math.sign(rawDelta) * Math.min(Math.abs(rawDelta), 0.005)

    // Use vertical wheel delta for horizontal movement, invert if needed
//    const delta = event.deltaY || event.deltaX

    // Adjust xpos with delta scaled by sensitivity
    this.xpos -= delta * this.sensitivity

    this.container.style.left = `${this.xpos}px`

    //this.setPosition()

    // Smooth inertia after scroll
    this.acceleration = -delta / this.sensitivity

    this.dragging = false

    requestAnimationFrame(this.boundUpdate)
  }

  private setPosition(): void {
    const startX = this.stageWidth / 2
    const endX = this.stageWidth / 2 - this.container.offsetWidth//Width

    this.xpos = Math.max(endX, Math.min(startX, this.xpos))
    this.container.style.left = `${this.xpos}px`

    const draggedDistance = startX - this.xpos
    const totalScrollableDistance = startX - endX
    const percentage = draggedDistance / totalScrollableDistance

    if (this.outputElement) {
      this.outputElement.innerHTML = `${(percentage * 100).toFixed(2)}%`
    }
    if (this.onUpdateScrollOffset) {
      this.onUpdateScrollOffset(percentage)
    }
  }

  public scrollToElement(svgElement: SVGGElement): void {
    const bbox = svgElement.getBBox()
    const elementCenterX = bbox.x + bbox.width / 2

    const stageCenterX = this.stageWidth / 2
    const targetX = stageCenterX - elementCenterX

    this.xpos = targetX
    this.container.style.left = `${this.xpos}px`
    // this.setPosition();
  }

  public scrollToPercentage(percent: number): void {
    this.containerWidth = this.container.offsetWidth
    const startX = this.stageWidth / 2
    const endX = this.stageWidth / 2 - this.containerWidth
    const totalScrollableDistance = startX - endX

    const clamped = Math.max(0, Math.min(1, percent))

    this.xpos = startX - clamped * totalScrollableDistance

    this.setPosition()
  }

 private update(): void {
  this.xpos += this.acceleration
  this.setPosition()
  this.acceleration *= this.deceleration

  const shouldContinue = !this.dragging && Math.abs(this.acceleration) >= 0.01

  if (shouldContinue) {
    requestAnimationFrame(this.boundUpdate)
  }
}

  public isDragging(): boolean {
    return this.dragging
  }

  public getPosition(): number {
    return this.xpos
  }

  public setOffset(offset: number): void {
    this.offset = offset
  }

  public getOffset(): number {
    return this.offset
  }

  public destroy(): void {
    this.removeEventListeners()
  }

  public reset(): void {
    this.xpos = this.stageWidth / 2
    this.acceleration = 0
    this.dragging = false
    this.setPosition()
  }
}
