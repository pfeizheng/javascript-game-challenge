var nodes;

function findPath(elf) {

    this.nodes = initialize();
    var start = this.nodes[GetStart(elf)];
    var end = getEnd(elf);

    var openHeap = heap();
    openHeap.push(start);

    while(openHeap.size() > 0) {
        var currentNode = openHeap.pop();

        if (currentNode.tileIndex == end.tileIndex) {
            var curr = currentNode;
            var ret = [];
            while(curr.parent) {
                ret.push(curr);
                curr = curr.parent;
            }
            return ret.reverse();
        }

        currentNode.closed = true;

        var neighbors = GetNeighbours(currentNode.tileIndex);

        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighborToNode(elf, neighbors[i]);

            if (neighbor.closed || neighbor.terrain == Water || neighbor.terrain == Mountain) {
                continue;
            }

            var g = currentNode.g + neighbor.cost;

            if (!neighbor.visited || g < neighbor.g) {

                neighbor.parent = currentNode;
                if (!neighbor.h) neighbor.h = getDistance(neighbor, end);
                neighbor.g = g;
                neighbor.f = neighbor.g + neighbor.h;

                if (!neighbor.visited) {
                    neighbor.visited = true;
                    openHeap.push(neighbor);
                } else {
                    openHeap.rescoreElement(neighbor);
                }
            }
        }

    }
    return [];
}

function initialize() {
    const nodes_size = map_width * map_height;
    var nodes = [];

    for (var i = 0; i < nodes_size; i++) {
        var node = new Node(i, GetTileTerrainIndex(i));
        nodes.push(node);
    }

    return nodes;
}

function heap() {
    return new BinaryHeap(function(node) {
        return node.f;
    });
}

function getEnd(elf) {
    var node = nodes[GetEnd()];
    node.g = GetManhattanHeuristicEstimate(GetStart(elf), GetEnd());
    node.f = node.g + node.h;
    return node;
}

function neighborToNode(elf, neighbor) {
    var node = nodes[neighbor.tileIndex];
    if ((node.terrain == Snow && elf == SnowElf)
        || (node.terrain == Forest && elf == ForestElf)) {
        node.cost = neighbor.distance / 2;
    } else if ((node.terrain == Snow && elf == ForestElf)
        || (node.terrain == Forest && elf == SnowElf)) {
        node.cost = neighbor.distance * 2;
    } else if (node.terrain == Grass){
        node.cost = neighbor.distance
    }
    return node;
}

function getDistance(node1, node2) {
    return GetManhattanHeuristicEstimate(node1.tileIndex, node2.tileIndex);
}
