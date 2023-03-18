const html = (name, product_name, price, time_stamp)=>{
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .outer-border {
        width: 734px;
        height: 650px;
        padding: 20px;
        text-align: center;
        border: 10px solid #673ab7;
      }

      .inner-dotted-border {
        width: 678px;
        height: 600px;
        padding: 20px;
        text-align: center;
        border: 5px solid #673ab7;
        border-style: dotted;
      }

      .certification {
        font-size: 50px;
        font-weight: bold;
        color: #663ab7;
      }

      .certify {
        font-size: 25px;
      }

      .name {
        font-size: 30px;
        color: green;
      }

      .fs-30 {
        font-size: 30px;
      }

      .fs-20 {
        font-size: 20px;
      }
    </style>
  </head>
  <body>
    <div class="outer-border">
      <div class="inner-dotted-border">
        <span class="certification">Certificate of Winning</span>
        <br /><br />
        <span class="certify"><i>This is to certify that</i></span>
        <br /><br />
        <span class="name"><b>${name}</b></span
        ><br /><br />
        <span class="certify"
          ><i>has successfully won the bidding for the respective</i></span
        >
        <br /><br />
        <span class="fs-30">${product_name}</span> <br /><br />
        <span class="fs-20">with price money of <b>${price}</b></span>
        <br /><br /><br /><br />
        <span class="certify"><i>dated</i></span
        ><br />
        <span class="fs-30">${time_stamp}</span>
      </div>
    </div>
  </body>
</html>

`
}

module.exports = html;