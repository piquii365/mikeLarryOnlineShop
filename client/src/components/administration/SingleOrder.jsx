import { useCallback, useEffect, useState, Suspense } from "react";
import axios from "../../api/axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  List,
  CardActions,
  Divider,
  Link,
  Button,
} from "@mui/material";
import UpdateSingleOrder from "./UpdateSingleOrder";

const SingleOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, orders) => {
    setSelectedOrder(orders);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const search = useOutletContext();
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get("/Orders/all", {
        withCredentials: true,
      });
      if (response.data.status) {
        setOrders(response.data.Orders);
      }
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/admin", {
          state:
            "Permission to access resources has been denied login to confirm identity",
        });
      }
    }
  }, []);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  const handleDelete = (order) => {
    const id = order._id;
    axios
      .delete(`/orders/delete/${id}`)
      .then((result) => {
        if (result.data.status) {
          location.reload();
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        {orders.length === 0 ? (
          <Box>
            <Typography>You have not received any orders yet</Typography>
          </Box>
        ) : (
          <Box>
            {orders
              ?.filter((order) => {
                return search.toLowerCase() === ""
                  ? order
                  : order.buyer.includes(search);
              })
              .map((order, index) => (
                <Paper
                  sx={{
                    width: "85%",
                    padding: "1em",
                    margin: "2em",
                    backgroundColor: "#002c3e",
                    color: "white",
                  }}
                  key={order._id}
                >
                  <Typography sx={{ fontWeight: "bolder" }}>
                    Order No:{index + 1}
                  </Typography>
                  <Box>
                    <Typography>
                      Customer Email:
                      <a href={`mailto:${order.buyer}`}>{order.buyer}</a>
                    </Typography>
                    <Typography>Customer Address: {order.location}</Typography>
                    <Typography>
                      Customer Phone Number:
                      <a href={`tel:${order.phoneNumber}`}>
                        {order.phoneNumber}
                      </a>
                    </Typography>
                    <Typography>
                      Payment Status: {order.paymentStatus}
                    </Typography>
                    <Typography>
                      Payment Ref: {order.paymentReference}
                    </Typography>
                    <Box>
                      <Typography sx={{ fontWeight: "bolder" }}>
                        Products Ordered
                      </Typography>
                      <Divider color="white" />
                      <Box>
                        <List>
                          {order.items.map((item, index) => (
                            <ListItem key={index} dense>
                              <ListItemText>{item.item}</ListItemText>
                              <ListItemText>{item.quantity}</ListItemText>
                              <ListItemText>{item.color}</ListItemText>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Box>
                    <Box>
                      <Button onClick={() => handleClick(event, order)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(order)}>
                        Delete
                      </Button>
                    </Box>
                  </Box>
                  <UpdateSingleOrder
                    order={selectedOrder}
                    anchorEl={anchorEl}
                    open={open}
                    handleClose={handleClose}
                  />
                </Paper>
              ))}

            <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
              <Typography>Current Orders</Typography>
              {orders
                .filter((order) => {
                  return search.toLowerCase() === ""
                    ? order
                    : order.buyer.includes(search);
                })
                .map((order, index) => (
                  <Card
                    sx={{ padding: "0.5em", marginBottom: "1em" }}
                    key={index}
                  >
                    <Typography>Order No: {index + 1}</Typography>
                    <CardContent>
                      <Typography sx={{ fontWeight: "bolder" }}>
                        Buyer
                      </Typography>
                      <Link href={`mailto:${order.buyer}`}>{order.buyer}</Link>
                      <Typography sx={{ fontWeight: "bolder" }}>
                        Phone Number
                      </Typography>
                      <Link href={`tel:${order.phoneNumber}`}>
                        {order.phoneNumber}
                      </Link>
                      <Typography sx={{ fontWeight: "bolder" }}>
                        Address
                      </Typography>
                      <Typography>{order.location}</Typography>
                      <Typography sx={{ fontWeight: "bolder" }}>
                        Items
                      </Typography>
                      <Divider />
                      <Box>
                        <List>
                          {order.items.map((item, index) => (
                            <ListItem key={index}>
                              <ListItemText>{item.item}</ListItemText>
                              <ListItemText>{item.quantity}</ListItemText>
                              <ListItemText>{item.color}</ListItemText>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => handleClick(event, order)}>
                        Update
                      </Button>
                      <Button onClick={() => handleDelete(order)}>
                        Delete
                      </Button>
                    </CardActions>
                    <UpdateSingleOrder
                      order={selectedOrder}
                      anchorEl={anchorEl}
                      open={open}
                      handleClose={handleClose}
                    />
                  </Card>
                ))}
            </Box>
          </Box>
        )}
      </Suspense>
    </Box>
  );
};

export default SingleOrder;
