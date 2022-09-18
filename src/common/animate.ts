import anime from "animejs";

export function shrink(element: HTMLElement, cb?: () => void) {
  anime({
    targets: element,
    width: 80,
    height: 80,
    borderRadius: ["0%", "50%"],
    easing: "easeInOutSine",
    complete: cb,
  });
}

export function transformToDataBlock(element: HTMLElement, blockSize: number, cb?: () => void) {
  anime({
    targets: element,
    width: blockSize,
    height: blockSize,
    backgroundColor: '#000',
    borderRadius: ["0%"],
    complete: cb,
  });
}

export function moveTo(
  element: HTMLElement,
  destination: { x: number; y: number },
  cb?: () => void
) {
  anime({
    targets: element,
    left: destination.x,
    top: destination.y,
    easing: 'easeInOutExpo',
    complete: cb,
  });
}

export function fadeOut(
  element: HTMLElement,
  cb?: () => void
) {
  anime({
    targets: element,
    opacity: 0,
    complete: cb,
  });
}

export function enlargeIn(
  element: HTMLElement,
  cb?: () => void
) {
  anime({
    targets: element,
    width: 400,
    complete: cb,
  });
}

