export function randomNumBetween(min: number, max: number) {
    // min and max included 
    return min + Math.floor(Math.random() * (1 + max - min))
}