

export async function getAllNewsData(url, fun) {
  // fun(null);
  fetch(url, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    })
    .then((response) => response.json())
    .then(res => {
        fun(res.page.next_url, res.data);
    })
}