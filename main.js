
function main()
{
    window.onload = function() {
        var snowElfCanvas = document.getElementById('snowElf');
        var snowElfCtx = snowElfCanvas.getContext("2d");
        var snowElfPath = findPath(SnowElf);
        snowElfCtx.strokeStyle = "#0000FF";
        snowElfCtx.drawPath(snowElfPath, SnowElf, 0.05);

        var forestElfCanvas = document.getElementById('forestElf');
        var forestElfCtx = forestElfCanvas.getContext("2d");
        var forestElfPath = findPath(ForestElf);
        forestElfCtx.strokeStyle = "#00FF00";
        forestElfCtx.drawPath(forestElfPath, ForestElf, 0.05);
    };
}

CanvasRenderingContext2D.prototype.drawPath = function (result, type, speed) {
    var context = this;
    var prevPos, curPos; // The position of the previous node and the current node
    var index = 0; // Index for the current position
    var amount  = 2; // Set initial amount to any number larger than 1
    var increAmount = speed; // Speed on grass

    context.beginPath();
    // Draw line progressively between the previous node and the current node
    var IntervalId = setInterval(function() {
        amount += increAmount;
        //Reached the current node. Updates the current node to the next node
        if (amount >= 1) {
            index++;
            if (index > result.length - 1) {
                clearInterval(IntervalId);
            } else {
                prevPos = GetTileCenterPixelCoordinates(result[index - 1].tileIndex);
                curPos = GetTileCenterPixelCoordinates(result[index].tileIndex);
                // Change the speed according to the terrain
                if ((result[index].terrain == Snow && type == SnowElf) ||
                    (result[index].terrain == Forest && type == ForestElf)) {
                    increAmount = speed * 2;
                } else if ((result[index].terrain == Forest && type == SnowElf) ||
                    (result[index].terrain == Snow && type == ForestElf)) {
                    increAmount = speed / 2;
                } else if ((result[index].terrain == Grass)) {
                    increAmount = speed;
                }
                amount = 0;
            }
        }
        context.moveTo(prevPos.x, prevPos.y);
        context.lineTo(prevPos.x + (curPos.x - prevPos.x) * amount,
            prevPos.y + (curPos.y - prevPos.y) * amount);
        context.stroke();
    }, 5);
};