async function getLinks() {
    const links = document.getElementsByTagName("a");
    let array = [];
    for (let i = 0; i < links.length; i++) {
        if (links[i].href) {
            array.push(links[i].href);
        }
    }

    return array;
}

async function check() {
    let urls = await getLinks();

    const request = await fetch("http://127.0.0.1:3000/check", {
        method: "POST",
        body: JSON.stringify({urls: urls})
    })

    console.log(request.body);
}