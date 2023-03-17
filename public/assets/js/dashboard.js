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
					<th>Update</th>
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
					<td>
					<button class="but" role="button">Resell</button>
					</td>
				</tr>
				<tr>
					<td>
						<img src="./assets/img/people.png">
						<p>John Doe</p>
					</td>
					<td>01-10-2021</td>
					<td><span class="status pending">Pending</span></td>
					<td>
					<button class="but" role="button">Resell</button>
					</td>
				</tr>
				<tr>
					<td>
						<img src="./assets/img/people.png">
						<p>John Doe</p>
					</td>
					<td>01-10-2021</td>
					<td><span class="status process">Process</span></td>
					<td>
					<button class="but" role="button">Resell</button>
					</td>
				</tr>
				<tr>
					<td>
						<img src="./assets/img/people.png">
						<p>John Doe</p>
					</td>
					<td>01-10-2021</td>
					<td><span class="status pending">Pending</span></td>
					<td>
					<button class="but" role="button">Resell</button>
					</td>
				</tr>
				<tr>
					<td>
						<img src="./assets/img/people.png">
						<p>John Doe</p>
					</td>
					<td>01-10-2021</td>
					<td><span class="status completed">Completed</span></td>
					<td>
					<button class="but" role="button">Resell</button>
					</td>
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
  