
export interface draggableItem {
    onDragStartHandler(event: DragEvent): void
    onDragEndHandler(event: DragEvent): void
}

export interface draggableArea {
    onDragOverHandler(event: DragEvent): void
    onDragDrop(event: DragEvent): void
    onDragLeave(event: DragEvent): void
}
