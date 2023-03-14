const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

const render = async () => {
  try {
    const obj = await axios.get("https://dummyjson.com/products");
    console.log(obj);
    let item = "";
    obj.data.products.forEach((element) => {
      item += `<div class="order">
		<div class="head">
			<h3>Recent Orders</h3>
			<i class='bx bx-search' ></i>
			<i class='bx bx-filter' ></i>
		</div>
		<table>
			<thead>
				<tr>
					<th>User</th>
					<th>Date Order</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<img src="./assets/img/people.png">
						<p>John Doe</p>
					</td>
					<td>01-10-2021</td>
					<td><span class="status completed">Completed</span></td>
				</tr>
				<tr>
					<td>
						<img src="img/people.png">
						<p>John Doe</p>
					</td>
					<td>01-10-2021</td>
					<td><span class="status pending">Pending</span></td>
				</tr>
				<tr>
					<td>
						<img src="img/people.png">
						<p>John Doe</p>
					</td>
					<td>01-10-2021</td>
					<td><span class="status process">Process</span></td>
				</tr>
				<tr>
					<td>
						<img src="./assets/img/people.png">
						<p>John Doe</p>
					</td>
					<td>01-10-2021</td>
					<td><span class="status pending">Pending</span></td>
				</tr>
				<tr>
					<td>
						<img src="img/people.png">
						<p>John Doe</p>
					</td>
					<td>01-10-2021</td>
					<td><span class="status completed">Completed</span></td>
				</tr>
			</tbody>
		</table>
	</div>
		  `;
    });
    document.querySelector(".table-data").innerHTML = item;
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", () => {
  render();
});

// https://res.cloudinary.com/dyszi81jo/image/upload/v1677738575/ivdvvksrd3yfvuprqhkj.jpg
// https://auction-website-o61d.onrender.com/home/getItems
