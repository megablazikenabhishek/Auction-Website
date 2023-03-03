
const services = document.querySelector("#services .items");
const render = async () => {
  try {
    const result = await axios.get('/home/getItems');
    const data = result.data;
    let item = "";
    data.forEach(element => {
        item += `<div class="wsk-cp-product">
        <div class="wsk-cp-img">
          <img src= ${element.photos[0]} alt="Product" class="img-responsive" />
        </div>
        <div class="wsk-cp-text">
          <div class="category">
            <span>Ethnic</span>
          </div>
          <div class="title-product">
            <h3>${element.product_name}</h3>
          </div>
          <div class="description-prod">
            <p>${element.details}</p>
          </div>
          <div class="card-footer">
            <div class="wcf-left"><span class="price">${element.base_price}</span></div>
            <div class="wcf-right"><a href="#" class="buy-btn"><i class="zmdi zmdi-shopping-basket"></i></a></div>
          </div>
        </div>
    </div>`
    });
    services.innerHTML = item;
  } catch (error) {
    console.log(error)
  }
}

window.addEventListener('load',()=>{
    render();
})
//https://res.cloudinary.com/dyszi81jo/image/upload/v1677738575/ivdvvksrd3yfvuprqhkj.jpg