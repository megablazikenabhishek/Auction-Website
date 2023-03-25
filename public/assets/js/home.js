const render = async () => {
  try {
    const products = await axios.get("/home/getItems");
    let item = "";
    products.data.forEach((element) => {
      item += `
        <div class="card" id="${element._id}">
          <div class="card-header">
            <h3>${element.product_name}</h3>
            <p>${element.details}</p>
            <div>
              <span>new</span>
            </div>
          </div>

          <div class="card-img">
            <img src="${element.photos[0]}" alt="..." />
            <i class="bx bx-heart"></i>
          </div>

          <div class="card-details">
            <div class="price">
              <p>Current Bid</p>
              <strong>₹${element.current_bid.amount}</strong>
            </div>
            <div class="colors" style="display:none;">
              <div class="selected">
                <i class="bx bx-check"></i>
              </div>
              <div>
                <i class="bx bx-check"></i>
              </div>
              <div>
                <i class="bx bx-check"></i>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <button>Participate</button>
          </div>
        </div>`;
    });
    document.querySelector(".card_body").innerHTML = item;
    products.data.forEach((element) => {
      const target = document.getElementById(element._id);
      target.addEventListener(
          "click", () => { location.href = `/home/bid/${target.id}`; });
    });
  } catch (error) {
    console.log(error);
  }
  document.querySelector(".socket").remove();
  // console.log(document.querySelector(".socket"));
};

window.addEventListener("load", () => { render(); });

// https://res.cloudinary.com/dyszi81jo/image/upload/v1677738575/ivdvvksrd3yfvuprqhkj.jpg
// https://auction-website-o61d.onrender.com/home/getItems
