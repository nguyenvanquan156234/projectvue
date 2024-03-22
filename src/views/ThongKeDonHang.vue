<template>
  <div>
  

    <!-- Biểu đồ tổng số sản phẩm bán ra -->
   

    <!-- Biểu đồ số lượng sản phẩm -->
    <div>
      <h2>Biểu đồ số lượng sản phẩm</h2>
      <canvas ref="productQuantityChart"></canvas>
    </div>

    <!-- Biểu đồ tổng doanh thu -->
    <div>
      <h2>Tổng doanh thu</h2>
      <canvas ref="revenueChart"></canvas>
    </div>

    <!-- Biểu đồ doanh thu của mỗi sản phẩm -->
    <div>
      <h2>Biểu đồ doanh thu của mỗi sản phẩm</h2>
      <canvas ref="productRevenueChart"></canvas>
    </div>

    <!-- Hiển thị danh sách thông tin khách hàng -->
    <div>
      <h2>Thông tin khách hàng</h2>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Sản phẩm đã mua</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in customerList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ customer.fullName }}</td>
            <td>{{ customer.phoneNumber }}</td>
            <td>{{ customer.address }}</td>
            <td>
              <ul>
                <li v-for="(product, i) in customer.products" :key="i">
                  {{ product.productName }} - Số lượng: {{ product.productQuantity }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Chart from "chart.js/auto";

export default {
  name: "ThongKeDonHang",
  data() {
    return {
      totalProductsSold: 0,
      totalRevenue: 0,
      customerList: [],
      productQuantityData: {}, // Dữ liệu số lượng sản phẩm
      productRevenueData: {}, // Dữ liệu doanh thu của mỗi sản phẩm
    };
  },
  async mounted() {
    await this.fetchOrderData();
    this.createProductsChart();
    this.createRevenueChart();
    this.createProductQuantityChart();
    this.createProductRevenueChart();
  },
  methods: {
    async fetchOrderData() {
      try {
        const querySnapshot = await getDocs(collection(db, "donhang"));
        let totalProducts = 0;
        let totalIncome = 0;
        let customers = [];
        let productQuantityData = {};
        let productRevenueData = {};

        querySnapshot.forEach((doc) => {
          const order = doc.data();
          totalProducts += order.products.length;
          totalIncome += order.totalPrice;

          // Lấy thông tin khách hàng từ mỗi đơn hàng
          const customerInfo = order.shippingInfo;
          // Thêm danh sách sản phẩm mua vào thông tin khách hàng
          customerInfo.products = order.products;

          customers.push(customerInfo);

          // Tính toán số lượng và doanh thu của từng sản phẩm
          order.products.forEach((product) => {
            if (product.productName in productQuantityData) {
              productQuantityData[product.productName] += product.productQuantity;
              productRevenueData[product.productName] += product.productQuantity * product.productPrice;
            } else {
              productQuantityData[product.productName] = product.productQuantity;
              productRevenueData[product.productName] = product.productQuantity * product.productPrice;
            }
          });
        });

        this.totalProductsSold = totalProducts;
        this.totalRevenue = totalIncome;
        this.customerList = customers;
        this.productQuantityData = productQuantityData;
        this.productRevenueData = productRevenueData;
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    },
    createChart(ref, data, label, backgroundColor, borderColor) {
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      new Chart(ref, {
        type: "bar",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: label,
              data: Object.values(data),
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1,
            },
          ],
        },
        options: chartOptions,
      });
    },
    createProductsChart() {
      this.createChart(
        this.$refs.productsChart,
        { "Sản phẩm bán ra": this.totalProductsSold },
        "Sản phẩm bán ra",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 99, 132, 1)"
      );
    },
    createRevenueChart() {
      this.createChart(
        this.$refs.revenueChart,
        { "Doanh thu": this.totalRevenue },
        "Doanh thu",
        "rgba(54, 162, 235, 0.2)",
        "rgba(54, 162, 235, 1)"
      );
    },
    createProductQuantityChart() {
      this.createChart(
        this.$refs.productQuantityChart,
        this.productQuantityData,
        "Số lượng sản phẩm",
        "rgba(75, 192, 192, 0.2)",
        "rgba(75, 192, 192, 1)"
      );
    },
    createProductRevenueChart() {
      this.createChart(
        this.$refs.productRevenueChart,
        this.productRevenueData,
        "Doanh thu của mỗi sản phẩm",
        "rgba(255, 206, 86, 0.2)",
        "rgba(255, 206, 86, 1)"
      );
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  background: linear-gradient(45deg, #e60b12, #fad0c4);
}

table th,
table td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
  background-color: #3b58eb;
  color: white;
}

table th {
  font-weight: bold;
}

table tr:nth-child(even) {
  background-color: #f9f9f9;
}

table tr:hover {
  background-color: #f2f2f2;
}
</style>
