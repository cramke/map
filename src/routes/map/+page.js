export async function _doPlan() {
    const url = 'http://127.0.0.2:8080/plan'
    const res = await fetch(url, {
        mode: 'no-cors',
        method: 'POST'
    })
}