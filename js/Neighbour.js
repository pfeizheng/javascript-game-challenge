// stores the information for neighbouring tiles returned from GetNeighbours

function Neighbour(index, terrain, distance)
{
	this.tileIndex = index;
	this.terrain = terrain;
	this.distance = distance;
}