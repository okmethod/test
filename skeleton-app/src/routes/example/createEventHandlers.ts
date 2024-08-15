declare const Matter: typeof import("matter-js");

export interface EventHandlers {
  handleTouchStart: () => void;
  handleTouchEnd: () => void;
  handleTouchMove: (event: TouchEvent) => void;
}

export function createEventHandlers(
  renderContainer: HTMLDivElement,
  engine: Matter.Engine,
  mouseConstraint: Matter.MouseConstraint,
  flags: { isHolding: boolean },
) {
  function handleTouchStart() {
    flags.isHolding = true;
    Matter.World.add(engine.world, mouseConstraint);
  }

  function handleTouchEnd() {
    flags.isHolding = false;
    Matter.World.remove(engine.world, mouseConstraint);
  }

  function handleTouchMove(event: TouchEvent) {
    const touch = event.touches[0];
    const rect = renderContainer.getBoundingClientRect();
    if (
      touch.clientX < rect.left ||
      touch.clientX > rect.right ||
      touch.clientY < rect.top ||
      touch.clientY > rect.bottom
    ) {
      Matter.World.remove(engine.world, mouseConstraint);
    }
  }

  return {
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  };
}
