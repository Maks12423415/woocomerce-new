async function getData() {
  const url = new URL("http://localhost:80/wordpress/wp-json/wc/v3/products");
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Basic ${btoa("Maks:zaq12wsx")}`,
    },
  });
  const json = await data.json();

  for (let i in json) {
    const div = document.createElement("div");
    div.classList.add("divy");

    const p = document.createElement("p");
    p.innerHTML = json[i].name;

    const c = document.createElement("p");
    c.innerHTML = json[i].price + "zł";

    const button1 = document.createElement("button");
    button1.innerHTML = "Dodaj 10zł";
    button1.addEventListener("click", () => {
      dodaj(json[i].id);
      location.reload();
    });

    const button2 = document.createElement("button");
    button2.innerHTML = "Odejmij 10zł";
    button2.addEventListener("click", () => {
      odejmij(json[i].id);
      location.reload();
    });

    async function dodaj(id) {
      const url1 = new URL(
        `http://localhost:80/wordpress/wp-json/wc/v3/products/${id}`
      );

      // Pobierz aktualną cenę produktu z listy produktów na podstawie id
      const currentPrice = json.find((product) => product.id === id).price;

      // Oblicz nową cenę
      const cena = regular_price + 10;

      // Przygotuj dane, które chcesz zaktualizować (w tym przypadku tylko cena)
      const data1 = await fetch(url1, {
        method: "PUT",
        headers: {
          regular_price: cena,
          "Content-Type": "application/json",
          authorization: `Basic ${btoa("Maks:zaq12wsx")}`,
        },
      });
    }

    async function odejmij(id) {
      const url2 = new URL(
        `http://localhost:80/wordpress/wp-json/wc/v3/products/${id}`
      );

      // Pobierz aktualną cenę produktu z listy produktów na podstawie id
      const currentPrice = json.find((product) => product.id === id).price;

      // Oblicz nową cenę
      const cena = regular_price - 10;

      // Przygotuj dane, które chcesz zaktualizować (w tym przypadku tylko cena)
      const data2 = await fetch(url2, {
        method: "PUT",
        headers: {
          regular_price: cena,
          "Content-Type": "application/json",
          authorization: `Basic ${btoa("Maks:zaq12wsx")}`,
        },
      });
    }

    div.appendChild(p);
    div.appendChild(c);
    div.appendChild(button1);
    div.appendChild(button2);
    document.querySelector("#main").appendChild(div);
  }
}
getData();

// async function dodaj(id) {
//   const url1 = new URL(
//     `http://localhost:80/wordpress/wp-json/wc/v3/products/${id}`
//   );

//   const cena = json.find((product) => product.id === id).price + 10;

//   const data1 = await fetch(url1, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Basic ${btoa("Maks:zaq12wsx")}`,
//     },
//     body: JSON.stringify({
//       price: cena,
//     }),
//   });
// }

// async function odejmij(id) {
//   const url2 = new URL(
//     `http://localhost:80/wordpress/wp-json/wc/v3/products/${id}`
//   );

//   const cena = json.find((product) => product.id === id).price - 10;

//   const data2 = await fetch(url2, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Basic ${btoa("Maks:zaq12wsx")}`,
//     },
//     body: JSON.stringify({
//       price: cena,
//     }),
//   });
// }
