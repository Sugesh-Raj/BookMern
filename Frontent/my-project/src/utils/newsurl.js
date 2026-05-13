function newsurl(name){
    return new URL(`../assets/${name}.png`, import.meta.url).href
}

export {newsurl}