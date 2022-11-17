export default function constructDirectionArrowAnnotations(arr, direction, color) {
    if (typeof window !== 'undefined') { //Next.js can't load generate this server-side.
        const annotations = {}
        const img = new Image();
        const arrowSvg = `<?xml version="1.0" encoding="iso-8859-1"?><svg 
            width="12px"
            height="12px"
            fill="${color ? color : 'black'}" 
            version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><polygon points="512,393.952 310.056,192 425.24,76.84 0,2.856 73.984,428 194.84,307.176 396.808,509.144 "/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
        `
        img.src = `data:image/svg+xml;base64,${globalThis.window.btoa(arrowSvg)}`;
        const rotatedPoints = arr.map((s, i) => {
            return {
                type: 'point',
                pointStyle: img,
                xValue: i,
                yValue: s ? s : 0,
                radius: 8,
                rotation: direction[i] - 135 < 0 ? direction[i] + 360 - 135 : direction[i] - 135,
            }
        })
        for (let point of rotatedPoints) {
            annotations["arrow" + point.xValue] = point;
        }
        return annotations;
    }
}