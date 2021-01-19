let extra_func = require('./extra_func.js');
let blink_check = require('./blink_check.js');

// The function circles the face parts; input: array of face position (x, y, z) 
function faceDotGenerator() {
    // Fixed distances between eyelids { "leftEyeDist", rightEyeDist" }
    let fixedEyelidDist = 0;
    // Fixed silhouette positions { "top", "botom" }
    let fixedSilhouettePos = 0;
    // User face parts
    let faceParts = {};

    return function (...args) {
        // User face parts
        faceParts = {
            // Left eye
            "leftLowerEyePos": {
                "y": extra_func.min(args[0][4][1], args[0][3][1])
            },
            "leftUpperEyePos": {
                "y": extra_func.max(args[1][3][1], args[1][4][1])
            },
            // Right eye
            "rightLowerEyePos": {
                "y": extra_func.min(args[2][3][1], args[2][4][1])
            },
            "rightUpperEyePos": {
                "y": extra_func.max(args[3][3][1], args[3][4][1])
            }
        };

        // Current distance between eyelids
        faceParts.currentEyelidDist = {
            "leftEyelidDist": Math.abs(faceParts.rightUpperEyePos.y - faceParts.rightLowerEyePos.y),
            "rightEyelidDist": Math.abs(faceParts.leftUpperEyePos.y - faceParts.leftLowerEyePos.y)
        };

        // Top and bottom of the face
        faceParts.silhouette = {
            "top": extra_func.maxInArrayOfArrays(args[4], 1),
            "bottom": extra_func.minInArrayOfArrays(args[4], 1)
        }

        // Default distance between eyelids
        if (fixedEyelidDist == 0) {
            fixedEyelidDist = {
                "leftEyeDist": faceParts.currentEyelidDist.leftEyelidDist,
                "rightEyeDist": faceParts.currentEyelidDist.rightEyelidDist
            }
        }

        // Fixed silhouette top and bottom positions
        if (fixedSilhouettePos == 0) {
            fixedSilhouettePos = {
                "top": faceParts.silhouette.top,
                "bottom": faceParts.silhouette.bottom
            }
        }

        blink_check.blinkCheck(fixedEyelidDist, fixedSilhouettePos, faceParts.currentEyelidDist.leftEyelidDist, faceParts.currentEyelidDist.rightEyelidDist, faceParts.silhouette);
    }
}

module.exports = {
    faceDotGenerator: faceDotGenerator()
}