export const getSkinImage = (skin) => {
    if(skin === 'RED') {
        return require('../assets/red.png');
    } else if(skin === 'GREEN') {
        return require('../assets/green.png');
    } else if(skin === 'YELLOW') {
        return require('../assets/yellow.png');
    } else if(skin === 'PURPLE') {
        return require('../assets/purple.png');
    }
}

export const getFieldImage = (field) => {
    if(field === 'RED_HEAD') {
        return require('../assets/red_head.png');
    } else if(field === 'RED_BODY') {
        return require('../assets/red_body.png');
    } else if(field === 'GREEN_HEAD') {
        return require('../assets/green_head.png');
    } else if(field === 'GREEN_BODY') {
        return require('../assets/green_body.png');
    } else if(field === 'YELLOW_HEAD') {
        return require('../assets/yellow_head.png');
    } else if(field === 'YELLOW_BODY') {
        return require('../assets/yellow_body.png');
    } else if(field === 'PURPLE_HEAD') {
        return require('../assets/purple_head.png');
    } else if(field === 'PURPLE_BODY') {
        return require('../assets/purple_body.png');
    } else if(field ==='STAR') {
        return require('../assets/star.png');
    } else {
        return require('../assets/ground.jpg');
    }
}
