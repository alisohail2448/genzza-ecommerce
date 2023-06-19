const express = require("express");
const dbConnect = require("./config/dbConnect.js");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute.js");
const productRouter = require("./routes/productRoute.js");
const blogRouter = require("./routes/blogRoute.js");
const productCategoryRouter = require("./routes/productCategoryRoute.js");
const blogCategoryRouter = require("./routes/blogCategoryRoute.js");
const brandRouter = require("./routes/brandRoute.js");
const colorRouter = require("./routes/colorRoute.js");
const couponRouter = require("./routes/couponRoute.js");
const enqRouter = require("./routes/enqRoute.js");
const bodyParser = require("body-parser");
const uploadRouter = require("./routes/uploadRoute.js");
const { notFound, errorHandler } = require("./middlewares/errorHandler.js");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const cors = require('cors');

dbConnect();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', (req, res) =>{
//     res.send('Hello from server side');
// });

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", productCategoryRouter);
app.use("/api/blogcategory", blogCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
