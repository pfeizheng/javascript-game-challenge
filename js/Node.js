function Node(tileIndex, terrain) {
    this.tileIndex = tileIndex;
    this.h = 0;
    this.g = 0;
    this.f = 0;
    this.parent = null;
    this.terrain = terrain;
    this.visited = false;
    this.closed = false;
    this.cost = 0;
}
