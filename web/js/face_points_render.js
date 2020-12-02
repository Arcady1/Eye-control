// The function circles the face parts; input: array of face position (x, y, z) 
function faceDotGenerator(...args) {
    // CSS classes
    let class__ = "iris-pos-dot ";
    // Removing previous points 
    $(".iris-pos-dot").remove();
    // ? Face rendering
    // ? args.forEach((facePart, index) => { // Part of face anf index from "faceDotGenerator"
    // ?     let class_ = "iris-pos-dot";
    // ?     if ((index == 1) || (index == 2) || (index == 4) || (index == 5)) {
    // ?         class_ += " eyes-blue-style";
    // ?     }
    // ?     facePart.forEach(coords => { // Coords XYZ
    // ?         facePointsRendering(coords[0], coords[1], class_);
    // ?     });
    // ? });

    // User face parts
    let faceParts = {
        // Irises
        "irisLeft": {
            "x": args[0][0][0],
            "y": args[0][0][1]
        },
        "irisRight": {
            "x": args[3][0][0],
            "y": args[3][0][1]
        },
        // Left eye
        "leftLowerEyePos": {
            // We don't need X, because we use irisLeft X
            "y": min(args[1][4][1], args[1][3][1]) + (Math.abs(args[1][4][1] - args[1][3][1]) / 2)
        },
        "leftUpperEyePos": {
            "x": args[2][3][0],
            "y": args[2][3][1]
        },
        // Right eye
        "rightLowerEyePos": {
            // We don't need X, because we use irisLeft X
            "y": min(args[4][4][1], args[4][3][1]) + (Math.abs(args[4][4][1] - args[4][3][1]) / 2)
        },
        "rightUpperEyePos": {
            "x": args[5][3][0],
            "y": args[5][3][1]
        }
    }    
    // Irises
    facePointsRendering(faceParts.irisLeft.x, faceParts.irisLeft.y, class__);
    facePointsRendering(faceParts.irisRight.x, faceParts.irisRight.y, class__);
    // Left eye
    facePointsRendering(faceParts.irisLeft.x, faceParts.leftLowerEyePos.y, class__ + "eyes-red-style");
    facePointsRendering(faceParts.irisLeft.x, faceParts.leftUpperEyePos.y, class__ + "eyes-blue-style");
    // Right eye
    facePointsRendering(faceParts.irisRight.x, faceParts.rightLowerEyePos.y, class__ + "eyes-red-style");
    facePointsRendering(faceParts.irisRight.x, faceParts.rightUpperEyePos.y, class__ + "eyes-blue-style");

    // Setting currentDist
    currentDist = {
        "leftEyeYDist": Math.abs(faceParts.leftUpperEyePos.y - faceParts.leftLowerEyePos.y),
        "rightEyeYDist": Math.abs(faceParts.rightUpperEyePos.y - faceParts.rightLowerEyePos.y)
    };

    // ! console.log(currentDist.leftEyeYDist, currentDist.rightEyeYDist);
    // Setting normalDist
    if (setNormalDist == true) {
        normalDist = currentDist;
        setNormalDist = false;
        console.log(normalDist);
    }
    if (normalDist != null) {
        // ! Проверять моргание
        // ! Если lock == false
        // ! При двойном моргании вывести сообщение "unlocked" 
        // ! Сделать скролл вверх или вних
        // ! После возвращения глаз в центр - lock = true
    }
}
// Function is rendering points
function facePointsRendering(x, y, cssClass) {
    $video__wrapper.prepend('<div class="' + cssClass + '" style="left: ' + x + 'px; top: ' + y + 'px"> </div>');
}